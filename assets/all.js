console.log('javascript enabled for this webpage');

const idsToModify = {
        "main-subtitle" : [
                'not actually a developer',
                '$5 and your message here',
                'anti-lua activist',
                'button box enthusiast',
                '.wav purist',
                'datamania is real',
                'ranked infinite dan',
                'nmx d dot office',
                'y2k compliant',
                'commit victimless crimes',
                'on the beatfloor',
                'a true gakster',
                'washing machine pro',
                'jumping over lazy dogs',
                'kaballa dolla heister',
                '早上好中国。现在我没有冰淇淋！',
        ],
        "about-subtitle" : [
                'RTFM',
                'man theokrueger.dev',
                'tldr: website',
                'posix compliant',
        ],
};

for (const [k, v] of Object.entries(idsToModify)) {
        const elem = document.getElementById(k);
        if (elem) {
                elem.innerHTML = idsToModify[k][Math.floor(Math.random() * idsToModify[k].length)];
        }
}
