import { sleep } from "./util.js";
/// Global script file for theokrueger.dev
///
/// (c) theokrueger 2024
/// GPL-3.0 Licensed

console.log("javascript enabled for this webpage");

/* Replace the flavour text with a random selection */
async function addFlavour() {
  const idsToModify = {
    "generic-flavour": [
      "anti-lua activist",
      "button box enthusiast",
      "datamania is real",
      "y2k compliant",
      "commit victimless crimes",
      "on the beatfloor",
      "jumping over lazy dogs",
      "ema(cs)xxing",
      "subtitles are hard",
      "read the EULA!!1!",
      "addicted to efficiency",
      "javascript is optional",
      "is a structural hazard",
      "site untested on blink",
      "best experienced on palemoon",
      "what is a design language",
    ],
    "about-flavour": [
      "RTFM",
      "man 7 theokrueger.dev",
      "tldr: website",
      "(not) posix compliant",
      "no gangstalking allowed",
      "know thy enemy",
    ],
  };

  for (const [k] of Object.entries(idsToModify)) {
    const elem = document.getElementById(k);
    if (elem) {
      elem.innerHTML =
        idsToModify[k][Math.floor(Math.random() * idsToModify[k].length)];
    }
  }
}
addFlavour();

/* Scroll percentage in footer */
async function addScrollPercent() {
  const scrollProgressBox = document.querySelector("#scroll-progress");
  const maxHeightY =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  if (scrollProgressBox) {
    window.addEventListener("scroll", () => {
      let frac = (window.scrollY * 100) / maxHeightY;
      let s = "";
      if (frac > 95) {
        s = "Bot";
      } else if (frac < 5) {
        s = "Top";
      } else {
        s = Math.floor(frac).toString() + "%";
      }
      scrollProgressBox.innerHTML = s;
    });
  }
}
addScrollPercent();

/* Fancy typing animation */
async function typeElement(elem, addRandomFlair) {
  const typingFlairs = [":)", ":D", ";)", ":]", ":3", ":O"];
  const txt = elem.innerHTML;
  let len = elem.innerHTML.length;
  const typingSpeed = 777 / len; // ms delay between chars
  const variance = 100; // variance between typing letters
  elem.innerHTML = "";
  for (let i = 0; i < len; i++) {
    await sleep(typingSpeed + (variance * Math.random() - variance / 2));
    elem.innerHTML += txt.charAt(i);
  }

  // 6% chance for random flair
  if (addRandomFlair && Math.random() < 0.06) {
    // type flair
    await sleep(Math.random() * 5000 + 1000);
    const flair =
      " " + typingFlairs[Math.floor(Math.random() * typingFlairs.length)];
    for (let i = 0; i < flair.length; i++) {
      await sleep(typingSpeed * 8);
      elem.innerHTML += flair.charAt(i);
    }

    // remove flair
    await sleep(Math.random() * 3000 + 1000);
    for (let i = flair.length; i >= 0; i--) {
      await sleep(typingSpeed);
      elem.innerHTML = elem.innerHTML.substring(0, len + i);
    }
  }
}

/* type some elements */
{
  const shouldAddFlair = !window.location.pathname.includes("/posts/");
  typeElement(document.getElementById("title-text"), shouldAddFlair);
}
