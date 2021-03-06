(function(){
		var divideCall = function(fn, number){
			var total = 0;
			return function(){
				total++;
				if(total == number){
					fn();
				}
			};
		};
		var getHashParams = function(){
			var result = {};
			var hash = window.location.hash;
			if(!hash){
			   return result;
			}
			var match = hash.match(/[^=#&]+(?:=[^&]+)?/g);
			if(!match){
				return result;
			}
			match.map(function(pair){
				var pairMatch = pair.match(/^([^=]+)(?:=(.*))?$/);
				var key = pairMatch[1];
				var value = pairMatch[2];
				if(value){
				   value = decodeURIComponent(value);
				}
				value = value || true;
				result[key] = value;
			});
			return result;
		};
		var getSpecs = function(){
			var result = {
				words:["Doei"]
			};
			var params = getHashParams();
			var sequence = params.sequence;
			if(!sequence){
			   return result;
			}
			result.words = sequence.split("/");
			result.repeat = params.repeat;
			return result;
		};
		var container = document.getElementById("text");
		
		var alphabet = "abcdefghijklmnopqrstuvwxyz"
		var letterSwitcher = function(){
			return requireElement(document.getElementById("letterSwitcher").innerHTML, function(switcherElement, letterElement, spaceElement){
				var self,
					dying,
					goNuts,
					currentLetter,
					empty = true;
				var fill = function(){
					if(empty){
						spaceElement();
						empty = false;
					}
				};
				var killLetter = function(letter){
					var currentClass = letter.getAttribute("class");
					if(currentClass !== "letter letter-dying"){
					   	letter.setAttribute("class","letter letter-dying");
						letter.addEventListener("animationend",function(){
							switcherElement.removeChild(letter);
						});
					 }
					
				};
				var successLetter = function(l, onDone){
					fill();
					currentLetter && killLetter(currentLetter);
					currentLetter = letterElement(function(el){
						el.innerHTML = l;
						el.setAttribute("class","letter letter-success");
						el.addEventListener("animationend",function(){
							onDone();
						});
					});
				};
				var failLetter = function(l){
					fill();
					
					letterElement(function(el){
						el.innerHTML = l;
						el.setAttribute("class","letter letter-failure");
						el.addEventListener("animationend",function(){
							switcherElement.removeChild(el);
						});
					});
				};
				var moveToLetter = function(l, onDone){
					setTimeout(function(){
						currentLetter && killLetter(currentLetter);
						goNuts(function(){
							successLetter(l, onDone);
						});
					}, 20 + Math.floor(Math.random() * 20));

				};
				var goToRandomLetter = function(times, onDone){
					if(times > 0){
						setTimeout(function(){
							failLetter(alphabet[Math.floor(Math.random() * alphabet.length)]);
							goToRandomLetter(times - 1, onDone);
						}, 40 + Math.floor(Math.random() * 30));
					}else{
						onDone();
					}
				};
				goNuts = function(onDone){
					goToRandomLetter(10 + Math.floor(Math.random() * 20), onDone);
				};
				var die = function(onRemove){
					if(dying){return;}
					dying = true;
					currentLetter && killLetter(currentLetter);
					goNuts(function(){
						if(dying){
							container.removeChild(switcherElement);
							onRemove(self);
						}
					});
				};
				var preserve = function(){
					if(dying){console.log("preserving one that was dying");}
					dying = false;
				};
				container.appendChild(switcherElement);
				self = {
					setToLetter:function(l){
						successLetter(l, function(){});
					},
					moveToLetter:moveToLetter,
					die:die,
					preserve:preserve
				};
				return self;
			});
		};
		var display = (function(){
			var letterSwitchers = [];
			var removeSwitcher = function(s){
				letterSwitchers.splice(letterSwitchers.indexOf(s), 1);
			};
			var ensureNumberOfSwitchers = function(l){
				var i, letterSwitchersToKill = [];
				for(var i=0;i<l&&i<letterSwitchers.length;i++){
					letterSwitchers[i].preserve();
				}
				for(i=l;i<letterSwitchers.length;i++){
					letterSwitchersToKill.push(letterSwitchers[i]);
				}
				for(i=letterSwitchers.length;i<l;i++){
					letterSwitchers.push(letterSwitcher());
				}
				letterSwitchersToKill.map(function(s){s.die(removeSwitcher);});
			};
			var setToWord = function(word){
				ensureNumberOfSwitchers(word.length);
				for(var i=0;i<word.length;i++){
					letterSwitchers[i].setToLetter(word[i]);
				}
			};
			var moveToWord = function(word, onDone){
				onDone = divideCall(onDone, word.length);
				ensureNumberOfSwitchers(word.length);
				for(var i=0;i<word.length;i++){
					letterSwitchers[i].moveToLetter(word[i], onDone);
				}
			};
			return {
				setToWord:setToWord,
				moveToWord:moveToWord
			};
		})();

		var displaySequence = function(specs){
			var words = specs.words;
			var currentWordIndex = 0;
			display.setToWord(words[0]);
			var moveToNextWord = function(){
				setTimeout(function(){
					currentWordIndex++;
					if(currentWordIndex < words.length){
						display.moveToWord(words[currentWordIndex], moveToNextWord);
					}else if(specs.repeat){
						currentWordIndex = 0;
						display.moveToWord(words[currentWordIndex], moveToNextWord);
					}else{
						display.moveToWord("", function(){});
					}
				}, 500);
			};
			moveToNextWord();
		};
		
		displaySequence(getSpecs());
		
		
		
		
	})();