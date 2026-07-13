import { sleep } from "./util.js";

console.log("javascript enabled for this webpage");

/* Replace the flavour text with a random selection */
async function addFlavour() {
  const idsToModify: {[id: string] : string[]} = {
    "generic-flavor": [
      "anti-lua activist",
      "button box enthusiast",
      "y2k compliant",
      "on the beatfloor",
      "jumping over lazy dogs",
      "subtitles are hard",
      "javascript is optional",
      "site untested on blink",
    ],
    "portfolio-flavor": [
      "RTFM",
      "man 7 theokrueger",
      "tldr: programming",
      "know thy enemy",
      "human-generated slop",
    ],
  };

  for (const [k] of Object.entries(idsToModify)) {
    const elem = document.getElementById(k);
    if (elem) {
      elem.innerHTML =
        idsToModify[k]![Math.floor(Math.random() * idsToModify[k]!.length)]!;
    }
  }
}
addFlavour();

/* Scroll percentage in footer */
async function addScrollPercent() {
  const scrollProgressBox = document.querySelector("#nav-scroll-progress");

  if (scrollProgressBox) {
    window.addEventListener("scroll", () => {
      const maxHeightY =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const frac = (window.scrollY * 100) / maxHeightY;
      let s = "";
      if (frac > 95) {
        s = "Bot";
      } else if (frac < 5 || maxHeightY === 0) {
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
async function typeElement(elem: Element | null, addRandomFlair: boolean) {
  if (!elem) {
    return
  }

  const typingFlairs = [":)", ":D", ";)", ":]", ":3", ":O"];
  const txt = elem.innerHTML;
  const len = elem.innerHTML.length;
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
const shouldAddFlair = !window.location.pathname.includes("/posts/");
typeElement(document.getElementById("title-text"), shouldAddFlair);

