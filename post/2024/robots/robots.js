/* Script file for the 'I am not a robot' post */

/* Util */
const blurElem = document.getElementById("blur-all");
async function blur(blurAmt = "15px") {
  blurElem.style.backdropFilter = "blur(" + blurAmt + ") grayscale(15%)";
  animateFadeIn(blurElem, "block");
}
async function unblur() {
  animateFadeOut(blurElem, "none");
}

/* Animations */
const animationSteps = 25;
const animationTimeMs = 75;

async function animateFadeIn(
  elem,
  display,
  animationTimeMs = 75,
  animationSteps = 25,
) {
  const stepTime = animationTimeMs / animationSteps;
  elem.style.opacity = "0%";
  elem.style.display = display;
  for (let i = 0; i < animationSteps; ++i) {
    elem.style.opacity = ((i * 100) / animationSteps).toString() + "%";
    await sleep(stepTime);
  }
  elem.style.opacity = "100%";
}

async function animateFadeOut(
  elem,
  display,
  animationTimeMs = 75,
  animationSteps = 25,
) {
  const stepTime = animationTimeMs / animationSteps;
  elem.style.opacity = "0%";
  elem.style.display = display;
  for (let i = 0; i < animationSteps; ++i) {
    elem.style.opacity = ((i * 100) / animationSteps).toString() + "%";
    await sleep(stepTime);
  }
  elem.style.opacity = "100%";
}

async function animateSlideIn(
  elem,
  display,
  animationTimeMs = 75,
  animationSteps = 25,
) {
  const stepTime = animationTimeMs / animationSteps;
  elem.style.opacity = "0%";
  elem.style.display = display;
  for (let i = 0; i < animationSteps; ++i) {
    elem.style.opacity = ((i * 100) / animationSteps).toString() + "%";
    await sleep(stepTime);
  }
  elem.style.opacity = "100%";
}

/* User pestering */

var annoyances = [
  // Anti Adblocker
  async function () {
    const antiAdblockElem = document.getElementById("anti-adblock");
    const closeAntiAdblockButton =
      document.getElementById("close-anti-adblock");

    blur();
    await animateFadeIn(antiAdblockElem, "block");

    closeAntiAdblockButton.addEventListener("click", async function () {
      animateFadeOut(antiAdblockElem, "none");
      await unblur();
    });
  },
  // Newsletter
  async function () {
    const newsletterElem = document.getElementById("newsletter");
    const closeNewsletterButton = document.getElementById("close-newsletter");
    const subscribeNewsletterButton = document.getElementById(
      "subscribe-newsletter",
    );
    await animateSlideIn(newsletterElem, "block");

    subscribeNewsletterButton.addEventListener("click", async function () {
      newsletterElem.innerHTML =
        "<p>Thanks for subscribing! Expect 400,000 emails shortly</p>";
      await sleep(2000);
      animateFadeOut(newsletterElem, "none");
    });

    closeNewsletterButton.addEventListener("click", async function () {
      animateFadeOut(newsletterElem, "none");
    });
  },
];

async function annoyUser() {
  // await sleep(3500);
  // // run a random annoyance every 5-20 seconds
  // while (annoyances.length > 0) {
  //   const i = Math.floor(Math.random() * annoyances.length);
  //   await annoyances[i]();
  //   await sleep(Math.random() * 15000 + 5000);
  //   annoyances.splice(i, 1);
  // }
  // test anti-adblocker
  await annoyances[0]();
  // test newsletter
  await annoyances[1]();
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
