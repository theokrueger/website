/* Script file for the 'I am not a robot' post */

/* Util */
const blurElem = document.getElementById("blur-all");
var blurCount = 0;
async function blur(blurAmt = "15px") {
  if (blurCount <= 0) {
    blurElem.style.backdropFilter = "blur(" + blurAmt + ") grayscale(15%)";
    animateFadeIn(blurElem, "block");
  }
  ++blurCount;
}
async function unblur() {
  --blurCount;
  if (blurCount <= 0) {
    animateFadeOut(blurElem, "none");
  }
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
  animationTimeMs = 200,
  animationSteps = 50,
) {
  const stepTime = animationTimeMs / animationSteps;
  const oldpos = elem.style.position;
  const oldright = elem.style.right;
  const width = elem.style.width;
  elem.style.display = display;
  elem.style.position = "relative";
  for (let i = 0; i < animationSteps; ++i) {
    elem.style.right =
      "calc(-100% + " + ((i * 100) / animationSteps).toString() + "%)";
    await sleep(stepTime);
  }
  elem.style.right = oldright;
  elem.style.position = oldpos;
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
    await animateFadeIn(newsletterElem, "block", "N");

    subscribeNewsletterButton.addEventListener("click", async function () {
      newsletterElem.innerHTML =
        "<p>Thanks for subscribing! Expect 400,000 emails shortly</p>";
      await sleep(3000);
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
    const n = 12;
    let remaining = [];
    for (let i = 0; i < n; ++i) {
      remaining.push(i);
    }

    for (let i = 0; i < n; ++i) {
      const ri = Math.floor(Math.random() * remaining.length);
      const item = remaining[ri];
      remaining.splice(ri, 1);
      const notification = document.getElementById(
        "notification-" + item.toString(),
      );
      const notificationButton = document.getElementById(
        "close-notification-" + item.toString(),
      );
      notificationButton.addEventListener("click", async function () {
        animateFadeOut(notification);
      });
      await animateSlideIn(notification, "block", "W");
      // 7-30s between notifs
      await sleep(Math.random() * 23000 + 7000);
    }
  },
  // Paywall
  async function () {
    const paywallElem = document.getElementById("paywall");

    const closePaywallButton = document.getElementById("close-paywall");
    const continuePaywallButton = document.getElementById("continue-paywall");
    const paywallEmailField = document.getElementById("paywall-email");
    const paywallErrorText = document.getElementById("paywall-error");

    blur();
    await animateFadeIn(paywallElem, "block");

    const closePaywallFunc = async function () {
      animateFadeOut(paywallElem);
      await unblur();
    };

    closePaywallButton.addEventListener("click", closePaywallFunc);

    continuePaywallButton.addEventListener("click", async function () {
      if (paywallEmailField.value === "") {
        paywallErrorText.innerHTML = "Please enter your email!";
        return;
      }
      paywallErrorText.innerHTML = "";

      let t = [
        "Contacting Server",
        "Loading Account",
        "Fingerprinting Browser",
        "Downloading Subscription Status",
        "Loading Breadcrumbs",
        "Searching Financial Records",
        "Generating B 101A Form",
        "Finalizing",
      ];
      for (let i = 0; i < t.length; ++i) {
        continuePaywallButton.innerHTML = t[i];
        await sleep(500);
        for (let j = 0; j < 5; ++j) {
          continuePaywallButton.innerHTML += ".";
          await sleep(300 + 100 * Math.random());
          if (Math.random() > 0.9 - j * 0.1) {
            break;
          }
        }
      }

      continuePaywallButton.innerHTML =
        "Welcome, " + paywallEmailField.value.split("@")[0] + "!";
      await sleep(2000);
      closePaywallFunc();
    });
  },
];

async function annoyUser() {
  await sleep(Math.random() * 7000 + 2000);
  // run a random annoyance every 20-40 seconds
  while (annoyances.length > 0) {
    const i = Math.floor(Math.random() * annoyances.length);
    annoyances[i]();
    annoyances.splice(i, 1);
    await sleep(Math.random() * 20000 + 20000);
  }
  // test anti-adblocker
  //annoyances[0]();
  // test newsletter
  //annoyances[1]();
  // test notifications
  //annoyances[2]();
  // test paywall
  //annoyances[3]();
}

// IDEAS (not yet implemented)
// spin a wheel
// ask for permissons
// captchax
// account
// hide the article
// install our desktop app
// unsupported browser
// contact live chat
// flash deals

annoyUser();
