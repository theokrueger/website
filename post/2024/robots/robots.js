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

function getOffset(elem) {
  const rect = elem.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

/* Animations */
const animationSteps = 25;
const animationTimeMs = 75;

async function animateFadeIn(
  elem,
  display,
  animationTimeMs = 100,
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
  animationTimeMs = 100,
  animationSteps = 25,
) {
  const stepTime = animationTimeMs / animationSteps;
  elem.style.opacity = "100%";
  for (let i = animationSteps; i >= 0; --i) {
    elem.style.opacity = ((i * 100) / animationSteps).toString() + "%";
    await sleep(stepTime);
  }
  elem.style.opacity = "0%";
  elem.style.display = "none";
}

async function animateSlideIn(
  elem,
  display,
  direction,
  animationTimeMs = 100,
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
      animateFadeOut(antiAdblockElem);
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
    await animateSlideIn(newsletterElem, "block", "N");

    subscribeNewsletterButton.addEventListener("click", async function () {
      newsletterElem.innerHTML =
        "<p>Thanks for subscribing! Expect 400,000 emails shortly</p>";
      await sleep(2000);
      animateFadeOut(newsletterElem);
    });

    closeNewsletterButton.addEventListener("click", async function () {
      animateFadeOut(newsletterElem);
    });
  },
  // Notifications
  async function () {
    const newsletterElem = document.getElementById("notifications");
    newsletterElem.style.display = "block";

    for (let i = 0; i < 6; ++i) {
      const notification = document.getElementById(
        "notification-" + i.toString(),
      );
      const notificationButton = document.getElementById(
        "close-notification-" + i.toString(),
      );
      notificationButton.addEventListener("click", async function () {
        animateFadeOut(notification);
      });
      await animateSlideIn(notification, "block", "W");
      await sleep(Math.random() * 30000 + 5000);
    }
  },
];

async function annoyUser() {
  // await sleep(Math.random() * 60000 + 20000);
  // // run a random annoyance every 20-60 seconds
  // while (annoyances.length > 0) {
  //   const i = Math.floor(Math.random() * annoyances.length);
  //   annoyances[i]();
  //   annoyances.splice(i, 1);
  //   await sleep(Math.random() * 45000 + 15000);
  // }
  // test anti-adblocker
  //annoyances[0]();
  // test newsletter
  // annoyances[1]();
  // test notifications
  annoyances[2]();
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
