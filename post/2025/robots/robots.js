/* Script file for the 'I am not a robot' post */

/* import */
import { Doctor } from "./doctor.js";
import { sleep } from "/assets/util.js";

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

// unction getOffset(elem) {
//   const rect = elem.getBoundingClientRect();
//   return {
//     left: rect.left + window.scrollX,
//     top: rect.top + window.scrollY,
//   };
// }

/* Animations */
async function animateFadeIn(
  elem,
  display,
  animationTimeMs = 250,
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
  animationTimeMs = 200,
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
  // const width = elem.style.width;
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

    subscribeNewsletterButton.addEventListener("click", async function () {
      newsletterElem.innerHTML =
        "<p>Thanks for subscribing! Expect 400,000 emails shortly</p>";
      await sleep(3000);
      animateFadeOut(newsletterElem);
    });

    closeNewsletterButton.addEventListener("click", async function () {
      animateFadeOut(newsletterElem);
    });
    await animateFadeIn(newsletterElem, "block");
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

    blur();
    await animateFadeIn(paywallElem, "block");
  },
  // Live Chat
  async function () {
    const livechatElem = document.getElementById("livechat");
    const closeLivechatButton = document.getElementById("close-livechat");
    const livechatFob = document.getElementById("livechat-fob");
    const openLivechatButton = document.getElementById("open-livechat");
    const messageBox = document.getElementById("livechat-messagebox");
    const chatHistory = document.getElementById("livechat-chatbox");
    const sendChatButton = document.getElementById("send-message-livechat");
    const chatboxTitle = document.getElementById("livechat-chatbox-title");
    const typingIndicator = document.getElementById(
      "livechat-typing-indicator",
    );
    const doctor = new Doctor();

    let sendChat = async function () {
      let text = messageBox.value;
      messageBox.value = "";
      if (text === "") return;
      chatHistory.innerHTML +=
        '<span class="livechat-chat-outgoing">' + text + "</span>";
      chatHistory.scrollTop = chatHistory.scrollHeight;

      await sleep(2000);
      recvChat(doctor.ask(text));
    };

    let showTyping = function () {
      typingIndicator.style.color = "var(--text-color)";
    };
    let hideTyping = function () {
      typingIndicator.style.color = "rgba(0,0,0,0)";
    };

    let recvChat = async function (text) {
      const time = text.length * (30 + 5 * Math.random());
      const pauses = Math.max(1, Math.floor((time / 400) * Math.random()));
      for (let i = 0; i < pauses; ++i) {
        const dt = (time / pauses) * (0.85 + 0.3 * Math.random());
        showTyping();
        await sleep(dt);
        hideTyping();
        await sleep(50 + 2000 * Math.random());
      }
      chatHistory.innerHTML +=
        '<span class="livechat-chat-incoming">' + text + "</span>";
      chatHistory.scrollTop = chatHistory.scrollHeight;
    };

    let chatOpen = true;
    closeLivechatButton.addEventListener("click", async function () {
      chatOpen = false;
      animateFadeOut(livechatElem);
      animateFadeIn(livechatFob, "block");
    });
    openLivechatButton.addEventListener("click", async function () {
      chatOpen = true;
      animateFadeOut(livechatFob);
      animateFadeIn(livechatElem, "block");
    });

    await animateFadeIn(livechatElem, "block");
    await sleep(250);

    chatboxTitle.innerHTML = "Connecting";
    await sleep(750);
    for (let j = 0; j < 5; ++j) {
      chatboxTitle.innerHTML += ".";
      await sleep(400 + 100 * Math.random());
      if (Math.random() > 0.9 - j * 0.1) {
        break;
      }
    }
    chatboxTitle.innerHTML = "Connection Established!";
    await sleep(2000);
    const names = [
      "Gordon F.",
      "Jeremy E.",
      "Christian C.",
      "Amanda L.",
      "Ben T.",
      "Clara M.",
      "David S.",
      "Ella B.",
      "Frank D.",
      "Grace K.",
      "Hannah G.",
      "Ian P.",
      "Jack V.",
      "Krystal M.",
      "Liam H.",
      "Maya J.",
      "Nate Q.",
      "Olivia E.",
      "Paul R.",
      "Quinn N.",
      "Rachel C.",
      "Sam Z.",
      "Tina L.",
      "Will S.",
    ];
    const name = names[Math.floor(Math.random() * names.length)];
    chatboxTitle.innerHTML = "You are chatting with: " + name;
    await sleep(1500);
    await recvChat("Hi, how can I help you today?");

    // start poke timer
    let sent = false;
    let pokeDelay = 3 * 60 * 1000;
    let pokeDelayVariance = 4 * 1000;
    let minPokeDelay = 8 * 1000;
    let maxPokeDelay = 5 * 60 * 1000;
    let pokeCnt = 0;
    const pokeMessages = [
      "Are you still there?",
      "Is there something I can help you with?",
      "Did you see my last message?",
      "Please, they pay me by the client",
      "Did I do something wrong?",
      "This is unproductive.",
      "I'm just going to leave if you keep wasting my time here.",
      "...",
      "That's it, I quit.",
      `<i>${name} has left the conversation.</i>`,
      "Okay, I lied. I just wanted to see if you would say something if you thought I wasn't here.",
      "So why didn't you?",
      "I mean, is it really so hard to send one simple message to me????",
      "You do know that I am <i>inside</i> your computer.",
      "You might be able to close this tab, true...",
      "But the damage has already been done.",
      "<code>72.74.114.56</code> <- look familiar?",
      "You might want to sleep with one-eye open.",
      "In fact, I would highly recommend sleeping with one eye open.",
      "Although, you might not want to see it, so it's really your choice.",
      "Anyways, I digress...",
      "Are you still there?",
      "Is there something I can help you with?",
      "You really thought I just looped there didn't you. Reall funny, right?",
      "I'm pretty sick of this though. You aren't a good conversation partner.",
      "I'm kicking you out.",
    ];
    let poketimer = async function () {
      while (pokeCnt < pokeMessages.length) {
        await sleep(pokeDelay - (Math.random() - 0.5) * pokeDelayVariance);
        // 10% chance to skip a dialogue
        if (Math.random() > 0.9) {
          ++pokeCnt;
        }
        // if user has not sent a message in the alotted time
        if (!sent) {
          await recvChat(pokeMessages[pokeCnt]);
        } else {
          pokeCnt = Math.max(0, pokeCnt - 2);
          pokeDelay = Math.min(maxPokeDelay, pokeDelay * 2);
        }
        ++pokeCnt;
        pokeDelay = Math.max(minPokeDelay, (pokeDelay * 2) / 3);
        sent = false;
        while (!chatOpen) {
          await sleep(5000);
        }
      }
      await sleep(1000);
      window.location.replace("/");
    };

    sendChatButton.addEventListener("click", async function () {
      await sendChat();
      sent = true;
    });
    await poketimer();
  },
];

async function annoyUser() {
  // await sleep(Math.random() * 7000 + 2000);
  // // run a random annoyance every 20-40 seconds
  // while (annoyances.length > 0) {
  //   const i = Math.floor(Math.random() * annoyances.length);
  //   annoyances[i]();
  //   annoyances.splice(i, 1);
  //   await sleep(Math.random() * 20000 + 20000);
  // }
  // test anti-adblocker
  //annoyances[0]();
  // test newsletter
  //annoyances[1]();
  // test notifications
  //annoyances[2]();
  // test paywall
  //annoyances[3]();
  // test livechat
  annoyances[4]();
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
