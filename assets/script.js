/// Global script file for theokrueger.dev
///
/// (c) theokrueger 2024
/// GPL-3.0 Licensed

console.log('javascript enabled for this webpage');

/* Replace the flavour text with a random selection */
const idsToModify = {
    'flavour-text' : [
        'anti-lua activist',
        'button box enthusiast',
        'datamania is real',
        'y2k compliant',
        'commit victimless crimes',
        'on the beatfloor',
        'jumping over lazy dogs',
	'ema(cs)xxing'
    ],
    'about-subtitle' : [
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

