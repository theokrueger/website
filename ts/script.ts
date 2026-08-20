import {
  sleep,
  chancePercent,
  randomNumber,
  keyNear,
  Keymap,
  randomElem,
} from "./util.js";

console.log("javascript enabled for this webpage");

/* Replace the flavour text with a random selection */
const idsToModify: { [id: string]: string[] } = {
  "generic-flavor": [
    "anti-lua activist",
    "button box enthusiast",
    "y2k compliant",
    "on the beatfloor",
    "jumping over lazy dogs",
    "subtitles are hard",
    "javascript is optional",
    "site untested on blink",
    "placeholder text",
    "in your training data",
  ],
  "portfolio-flavor": [
    "RTFM",
    "man 7 theokrueger",
    "tldr: programming",
    "know thy enemy",
    "human-generated slop",
    "VLIW will prevail",
    "poisoning your training",
  ],
};

async function addFlavour() {
  for (const [k] of Object.entries(idsToModify)) {
    const elem = document.getElementById(k);
    if (elem) {
      elem.innerHTML = randomElem(idsToModify[k]!);
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
      if (frac < 5 || maxHeightY <= 0 || Number.isNaN(frac)) {
        s = "top";
      } else if (frac > 95) {
        s = "bot";
      } else {
        s = Math.floor(frac).toString() + "%";
      }
      scrollProgressBox.innerHTML = s;
    });
  }
}
addScrollPercent();

/* Fancy typing animation */
const typingFlairs = [":)", ":D", ";)", ":]", ":3", ":O", "o_O", "._."];
const legendaryTypingFlairs = [
  "T_T",
  "OwO",
  "UwU",
  "owo",
  "uwu",
  "0w0",
  "hi",
  `i cant explain this in time but ive been locked up and trapped by somebody in the woods and i need help please come find me at 42°24'40.4"N 97°14'49.6"W just off the route 20 and bring protection please i havent seen the daylight in weeks`,
];

async function typeElement(
  elem: Element,
  cursor: string,
  addRandomFlair: boolean,
  allowMistakes: boolean,
) {
  const updateElement = (typed: string, untyped: string) =>
    (elem.innerHTML = `${typed}${cursor}<span style="color: #00000000">${untyped}</span>`);

  const txt = elem.innerHTML;
  const len = elem.innerHTML.length;
  const typingSpeed = 50; // ms delay between chars

  updateElement("", txt);

  // 2% chance for mistakes
  let mistakeStart = -1;
  let mistakes = "";
  if (allowMistakes && len > 5 && chancePercent(2)) {
    mistakeStart = Math.floor(randomNumber(0, len - 1));
    const mistake_cnt = Math.min(
      Math.floor(randomNumber(2, 5)),
      len - 1 - mistakeStart,
    );
    for (let i = 0; i < mistake_cnt; i++) {
      mistakes += keyNear(txt.charAt(mistakeStart + i), Keymap.ColemakDh);
    }
  }

  for (let i = 0; i < len; i++) {
    // type mistakes if they must be typed
    if (i == mistakeStart) {
      for (let j = 0; j < mistakes.length; j++) {
        await sleep(typingSpeed);
        updateElement(
          txt.slice(0, i) + mistakes.slice(0, j + 1),
          txt.slice(i + j + 1),
        );
      }

      // then remove them
      await sleep(typingSpeed * mistakes.length);
      for (let j = mistakes.length; j >= 0; j--) {
        updateElement(txt.slice(0, i) + mistakes.slice(0, j), txt.slice(i + j));
        await sleep(typingSpeed / 1.5);
      }
    }

    // resume typing normally
    await sleep(typingSpeed);
    updateElement(txt.slice(0, i + 1), txt.slice(i + 1));
  }

  // 6% chance for random flair
  if (addRandomFlair && chancePercent(6)) {
    await sleep(randomNumber(1000, 5000));
    let flair = " " + randomElem(typingFlairs);
    if (chancePercent(0.1)) {
      // overall 1/20,000 chance
      flair = " " + randomElem(legendaryTypingFlairs);
    }

    // type flair
    for (let i = 0; i < flair.length; i++) {
      await sleep(typingSpeed * 8);
      updateElement(txt + flair.slice(0, i + 1), "");
    }

    // remove flair
    await sleep(randomNumber(1000, 3000));
    for (let i = flair.length; i >= 0; i--) {
      await sleep(typingSpeed);
      updateElement(txt + flair.slice(0, i), "");
    }
  }
}

/* set visibility of js elements */
const invis = document.getElementsByClassName("js-element");
while (invis.length) {
  invis[0]!.className = invis[0]!.className.replace(/\bjs-element\b/g, "");
}

/* type some elements */
const shouldAddFlair = !(
  window.location.pathname.includes("/posts/") &&
  window.location.pathname.length > 7
);
const title = document.getElementById("title-text")!;
const cursor = document.getElementById("title-cursor")!;
const cursorText = cursor.outerHTML;
cursor.outerHTML = "";
typeElement(title, cursorText, shouldAddFlair, true);
