import {
  sleep,
  chance_percent,
  random_number,
  key_near,
  Keymap,
  random_elem,
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
  ],
  "portfolio-flavor": [
    "RTFM",
    "man 7 theokrueger",
    "tldr: programming",
    "know thy enemy",
    "human-generated slop",
  ],
};

async function addFlavour() {
  for (const [k] of Object.entries(idsToModify)) {
    const elem = document.getElementById(k);
    if (elem) {
      elem.innerHTML = random_elem(idsToModify[k]!);
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
      if (frac < 1 || maxHeightY <= 0 || Number.isNaN(frac)) {
        s = "bot";
      } else if (frac > 99) {
        s = "top";
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
  elem: Element | null,
  addRandomFlair: boolean,
  allowMistakes: boolean,
) {
  if (!elem) {
    return;
  }

  const txt = elem.innerHTML;
  const len = elem.innerHTML.length;
  const typingSpeed = 50; // ms delay between chars

  let make_mistake = false;
  let mistake_start = 0;
  let mistake_end = 0;
  const mistake_buffer: string[] = [];
  if (allowMistakes && len > 4 && chance_percent(2)) {
    make_mistake = true;
    mistake_start = Math.floor(random_number(0, len - 1));
    mistake_end = Math.min(
      Math.floor(random_number(1, 4)) + mistake_start,
      len - 1,
    );
    console.log(mistake_start, mistake_end);
  }

  elem.innerHTML = "";
  for (let i = 0; i < len; i++) {
    await sleep(typingSpeed);

    // type mistakes if they must be typed
    if (make_mistake && i >= mistake_start && i < mistake_end) {
      const chr = txt.charAt(i);
      mistake_buffer.push(chr);
      elem.innerHTML += key_near(chr, Keymap.ColemakDh);
      continue;
    }
    // remove typed mistakes
    else if (mistake_buffer.length > 0) {
      await sleep(typingSpeed * 2);
      for (let j = 0; j < mistake_buffer.length; j++) {
        elem.innerHTML = elem.innerHTML.slice(0, -1);
        await sleep(typingSpeed / 1.5);
        console.log(elem.innerHTML, mistake_buffer);
      }
      await sleep(typingSpeed * 3);
      while (mistake_buffer.length > 0) {
        const chr = mistake_buffer.shift();
        elem.innerHTML += chr;
        await sleep(typingSpeed);
      }
    }
    // resume typing normally
    elem.innerHTML += txt.charAt(i);
  }

  // 6% chance for random flair
  if (addRandomFlair && chance_percent(5)) {
    // type flair
    await sleep(random_number(1000, 5000));
    let flair = " " + random_elem(typingFlairs);
    if (chance_percent(0.1)) {
      // overall 1/20,000 chance
      flair = " " + random_elem(legendaryTypingFlairs);
    }
    for (let i = 0; i < flair.length; i++) {
      await sleep(typingSpeed * 8);
      elem.innerHTML += flair.charAt(i);
    }

    // remove flair
    await sleep(random_number(1000, 3000));
    for (let i = flair.length; i >= 0; i--) {
      await sleep(typingSpeed);
      elem.innerHTML = elem.innerHTML.substring(0, len + i);
    }
  }
}

/* type some elements */
const shouldAddFlair = !window.location.pathname.includes("/posts/");
typeElement(document.getElementById("title-text"), shouldAddFlair, true);
