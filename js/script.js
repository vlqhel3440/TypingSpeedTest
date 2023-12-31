const typingText = document.querySelector(".typing-text p");
inpField = document.querySelector(".wrapper .input-field");
mistakeTag = document.querySelector(".mistake span");
timeTag = document.querySelector(".time b");
wpmTag = document.querySelector(".wpm span");
cpmTag = document.querySelector(".cpm span");
tryAgainBtn = document.querySelector("button");

let timer,
maxTime = 300,
timeLeft = maxTime;

let charIndex = mistakes = isTyping = 0;

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[randIndex].split("").forEach(span => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if(charIndex < characters.length - 1 && timeLeft > 0) {
  
  if(!isTyping) {
    timer = setInterval(initTimer, 1000);
    isTyping = true;
  }
  if(typedChar > 240){
    typingText.scrollTop = 20;
  } else if (typedChar > 480){
    typingText.scrollTop= 40;
  }
  
  if(typedChar == null) {
    charIndex--;
    if(characters[charIndex].classList.contains("incorrect")) {
      mistakes--;
    }
    characters[charIndex].classList.remove("correct", "incorrect");
  } else {
    if(characters[charIndex].innerHTML === typedChar) {
      characters[charIndex].classList.add("correct");
    } else {
      mistakes++;
      characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
  }
  characters.forEach(span => span.classList.remove("active"));
  characters[charIndex].classList.add("active");

  let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  wpmTag.innerHTML = wpm;
  mistakeTag.innerHTML = mistakes;
  cpmTag.innerHTML = charIndex - mistakes;
  } else {
    clearInterval(timer);
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerHTML = timeLeft;
  } else {
    inpField.value = "";
    clearInterval(timer);
  }
}
//button
function resetGame() {
  randomParagraph();
  inpField.value = "";
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);