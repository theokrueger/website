export { sleep, chance_percent, random_number, key_near, Keymap, clamp };
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const chance_percent = (percent) => Math.random() < percent / 100;
const random_number = (start, end) => Math.random() * (end - start) + start;
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
var Keymap;
(function (Keymap) {
    Keymap[Keymap["Qwerty"] = 1] = "Qwerty";
    Keymap[Keymap["ColemakDh"] = 2] = "ColemakDh";
})(Keymap || (Keymap = {}));
const keymaps = {
    [Keymap.Qwerty]: [
        "qwertyuiop",
        "asdfghjkl;",
        "zxcvbnm,./",
    ],
    [Keymap.ColemakDh]: [
        "qwfpbjluy;",
        "arstgmneio",
        "xcdvzkh,./",
    ]
};
// get a key spatially local to a given character, including itself.
// this is not performant at all, do not use excessively :)
const key_near = function (key, keymap) {
    const keyLower = key.toLowerCase();
    const isUppercase = key !== keyLower;
    // locate key coords
    let i = 0;
    let j = 0;
    const km = keymaps[keymap];
    find_idx: for (; i < km.length; i++) {
        for (; j < km[i].length; j++) {
            const cur = km[i][j];
            if (cur === keyLower) {
                break find_idx;
            }
        }
    }
    // return original if key out of bounds
    if (i >= km.length || j > km[i].length) {
        return key;
    }
    // find neighbour
    const di = Math.floor(random_number(-1, 2));
    i = clamp(i + di, 0, km.length - 1);
    const dj = Math.floor(random_number(-1, 2));
    j = clamp(j + dj, 0, km[i].length - 1);
    return isUppercase ? km[i][j].toUpperCase() : km[i][j].toLowerCase();
};
