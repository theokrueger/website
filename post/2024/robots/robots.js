/* Script file for the 'I am not a robot' post */

/* Util */
const blurElem = document.getElementById("blur-all");
async function blur() {
  animateFadeIn(blurElem, "block");
}
async function unblur() {
  animateFadeOut(blurElem, "none");
}

/* Animations */
const animationSteps = 30;
const animationTimeMs = 100;

async function animateFadeIn(elem, display) {
  const stepTime = animationTimeMs / animationSteps;
  elem.style.opacity = "0%";
  elem.style.display = display;
  for (let i = 0; i < animationSteps; ++i) {
    elem.style.opacity = ((i * 100) / animationSteps).toString() + "%";
    await sleep(stepTime);
  }
  elem.style.opacity = "100%";
}

async function animateFadeOut(elem, display) {
  const stepTime = animationTimeMs / animationSteps;
  elem.style.opacity = "100%";
  for (let i = animationSteps; i > 0; --i) {
    elem.style.opacity = ((i * 100) / animationSteps).toString() + "%";
    await sleep(stepTime);
  }
  elem.style.opacity = "0%";
  elem.style.display = display;
}

/* User pestering */
// Anti Adblocker
const antiAdblockElem = document.getElementById("anti-adblock");
const closeAntiAdblockButton = document.getElementById("close-anti-adblock");
async function annoyUser() {
  await sleep(3500);

  blur();
  await animateFadeIn(antiAdblockElem, "block");

  closeAntiAdblockButton.addEventListener("click", closeAntiAdblock);
}

// End (for now)
async function closeAntiAdblock() {
  await animateFadeOut(antiAdblockElem, "none");
  unblur();
}

// IDEAS (not yet implemented)
// spin a wheel
// notifications
// ask for permissons
// captcha
// account
// hide the article
// paywall
// install our desktop app
// unsupported browser
// contact live chat
// flash deals

annoyUser();
