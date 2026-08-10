export {
  sleep,
  chance_percent,
  random_number,
  key_near,
  Keymap,
  clamp,
  random_index,
  random_elem,
  pathname_match,
};

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const chance_percent = (percent: number) => Math.random() < percent / 100;

const random_number = (start: number, end: number) =>
  Math.random() * (end - start) + start;

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const random_index = <T>(arr: T[]): number =>
  Math.floor(Math.random() * arr.length);

const random_elem = <T>(arr: T[]): T => arr[random_index(arr)]!;

const pathname_match = (s: string): boolean => {
  const pn = window.location.pathname;
  return (
    pn === s || pn === `${s}.html` || pn === `${s}/` || pn === `${s}/index.html`
  );
};

enum Keymap {
  Qwerty = 1,
  ColemakDh,
}

const keymaps: { [id: number]: string[] } = {
  [Keymap.Qwerty]: ["qwertyuiop", "asdfghjkl;", "zxcvbnm,./"],
  [Keymap.ColemakDh]: ["qwfpbjluy;", "arstgmneio", "xcdvzkh,./"],
};

// get a key spatially local to a given character, including itself.
// this is not performant at all, do not use excessively :)
const key_near = function (key: string, keymap: Keymap): string {
  const keyLower = key.toLowerCase();
  const isUppercase = key !== keyLower;

  // locate key coords
  let i = 0;
  let j = 0;
  const km = keymaps[keymap]!;

  find_idx: for (; i < km.length; i++) {
    for (j = 0; j < km[i]!.length; j++) {
      const cur = km[i]!.charAt(j);
      if (cur === keyLower) {
        break find_idx;
      }
    }
  }

  // return original if key out of bounds
  if (i >= km.length || j >= km[i]!.length) {
    console.log("braek");
    return key;
  }

  // find neighbour
  const di = Math.floor(random_number(-1, 2));
  i = clamp(i + di, 0, km.length - 1);
  const dj = Math.floor(random_number(-1, 2));
  j = clamp(j + dj, 0, km[i]!.length - 1);

  return isUppercase ? km[i]![j]!.toUpperCase() : km[i]![j]!.toLowerCase();
};
