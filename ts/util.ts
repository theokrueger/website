export { sleep, chance_percent, random_number, key_near, Keymap, clamp };

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

const chance_percent = (percent: number) => Math.random() < percent / 100;

const random_number = (start: number, end:number) => Math.random() * (end - start) + start;

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val,min),max);

enum Keymap {
  Qwerty = 1,
  ColemakDh
}

const keymaps: {[id: number] : string[]} = {
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
}

// get a key spatially local to a given character, including itself.
// this is not performant at all, do not use excessively :)
const key_near = function (key: string, keymap: Keymap): string {
  const keyLower = key.toLowerCase();
  const isUppercase = key !== keyLower;

  // locate key coords
  let i = 0;
  let j = 0;
  const km = keymaps[keymap]!;

  find_idx: 
  for (; i<km.length; i++) {
    for (; j<km[i]!.length; j++) {
      const cur = km[i]![j];
      if (cur === keyLower) {
	break find_idx;
      }
    }
  }

  // return original if key out of bounds
  if (i >= km.length || j > km[i]!.length) {
    return key;
  }

  // find neighbour
  const di = Math.floor(random_number(-1,2));
  i = clamp(i+di, 0, km.length-1);
  const dj = Math.floor(random_number(-1,2));
  j = clamp(j+dj, 0, km[i]!.length-1);

  return isUppercase ? km[i]![j]!.toUpperCase() : km[i]![j]!.toLowerCase();
}
