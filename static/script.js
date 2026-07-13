import { sleep, chance_percent, random_number, key_near, Keymap } from "./util.js";
console.log("javascript enabled for this webpage");
/* Replace the flavour text with a random selection */
async function addFlavour() {
    const idsToModify = {
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
                idsToModify[k][Math.floor(Math.random() * idsToModify[k].length)];
        }
    }
}
addFlavour();
/* Scroll percentage in footer */
async function addScrollPercent() {
    const scrollProgressBox = document.querySelector("#nav-scroll-progress");
    if (scrollProgressBox) {
        window.addEventListener("scroll", () => {
            const maxHeightY = document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const frac = (window.scrollY * 100) / maxHeightY;
            let s = "";
            if (frac > 95) {
                s = "Bot";
            }
            else if (frac < 5 || maxHeightY === 0) {
                s = "Top";
            }
            else {
                s = Math.floor(frac).toString() + "%";
            }
            scrollProgressBox.innerHTML = s;
        });
    }
}
addScrollPercent();
/* Fancy typing animation */
async function typeElement(elem, addRandomFlair, allowMistakes) {
    if (!elem) {
        return;
    }
    const typingFlairs = [":)", ":D", ";)", ":]", ":3", ":O"];
    const txt = elem.innerHTML;
    const len = elem.innerHTML.length;
    const typingSpeed = 50; // ms delay between chars
    let make_mistake = false;
    let mistake_start = 0;
    let mistake_end = 0;
    const mistake_buffer = [];
    if (allowMistakes && len > 4 && chance_percent(2)) {
        make_mistake = true;
        mistake_start = Math.floor(random_number(0, len - 1));
        mistake_end = Math.min(Math.floor(random_number(1, 4)) + mistake_start, len - 1);
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
    if (addRandomFlair && chance_percent(6)) {
        // type flair
        await sleep(random_number(1000, 5000));
        const flair = " " + typingFlairs[Math.floor(Math.random() * typingFlairs.length)];
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
