console.log('javascript enabled for this webpage');
/* set flavour text on load*/
var subtitles = [
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
        'the dragon of mahjong',
        'kaballa dolla heister',
];
document.getElementById("main-subtitle").innerHTML = subtitles[Math.floor(Math.random() * subtitles.length)];
