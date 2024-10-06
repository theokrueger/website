/// Global script file for theokrueger.dev
///
/// (c) theokrueger 2024
/// GPL-3.0 Licensed

console.log('javascript enabled for this webpage');
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

/* Replace the flavour text with a random selection */
const idsToModify = {
    'generic-flavour' : [
        'anti-lua activist',
        'button box enthusiast',
        'datamania is real',
        'y2k compliant',
        'commit victimless crimes',
        'on the beatfloor',
        'jumping over lazy dogs',
	'ema(cs)xxing',
	'subtitles are hard',
	'read the EULA!!1!',
    ],
    'about-flavour' : [
        'RTFM',
        'man theokrueger.dev',
        'tldr: website',
        'posix compliant',
    ],
};

for (const [k, _] of Object.entries(idsToModify)) {
        const elem = document.getElementById(k);
        if (elem) {
                elem.innerHTML = idsToModify[k][Math.floor(Math.random() * idsToModify[k].length)];
        }
}

/* Scroll percentage (in footer) */
const scrollProgressBox = document.querySelector("#scroll-progress");
const maxHeightY = document.documentElement.scrollHeight - document.documentElement.clientHeight;

if (scrollProgressBox) {
    window.addEventListener("scroll", (event) => {
	let frac = this.scrollY * 100 / maxHeightY;
	let s = "";
	if (frac > 95) {
	    s = "Bot";
	} else if (frac < 5) {
	    s = "Top"
	} else {
	    s = Math.floor(frac).toString() + "%";
	}
	scrollProgressBox.innerHTML = s;
    });
}

/* Fancy typing animation */
const typingFlairs = [':)', ':D', ';)', ':]', ':3', ':O'];
async function typeElement(elem, addRandomFlair) {
    const txt = elem.innerHTML;
    let len = elem.innerHTML.length;
    const typingSpeed = 777 / len; // ms delay between chars
    elem.innerHTML = "";
    for (let i=0; i < len; i++) {
	await sleep(typingSpeed);
	elem.innerHTML += txt.charAt(i);
    }

    // 10% mhankce for random flair
    if (addRandomFlair && Math.random() < 0.1) {
	// type flair
	await sleep(Math.random() * 5000 + 1000);
	const flair = " " + typingFlairs[Math.floor(Math.random() * typingFlairs.length)];
	for (let i=0; i < flair.length; i++) {
	    await sleep(typingSpeed * 5);
	    elem.innerHTML += flair.charAt(i);
	}

	// remove flair
	await sleep(Math.random() * 5000 + 1000);
	for (let i=flair.length; i >= 0; i--) {
	    await sleep(typingSpeed * 3);
	    elem.innerHTML = elem.innerHTML.substring(0, len + i);
	}
    }
}

/* type some elements */
typeElement(document.getElementById("title-text"), true);
