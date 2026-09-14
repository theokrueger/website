export {
  sleep,
  chancePercent,
  randomNumber,
  keyNear,
  Keymap,
  clamp,
  randomIndex,
  randomElem,
  pathnameMatch,
  Holidays,
  getHoliday,
};

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const chancePercent = (percent: number) => Math.random() < percent / 100;

const randomNumber = (start: number, end: number) =>
  Math.random() * (end - start) + start;

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const randomIndex = <T>(arr: T[]): number =>
  Math.floor(Math.random() * arr.length);

const randomElem = <T>(arr: T[]): T => arr[randomIndex(arr)]!;

const pathnameMatch = (s: string): boolean => {
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
const keyNear = function (key: string, keymap: Keymap): string {
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
    return key;
  }

  // find neighbour
  const di = Math.floor(randomNumber(-1, 2));
  i = clamp(i + di, 0, km.length - 1);
  const dj = Math.floor(randomNumber(-1, 2));
  j = clamp(j + dj, 0, km[i]!.length - 1);

  return isUppercase ? km[i]![j]!.toUpperCase() : km[i]![j]!.toLowerCase();
};

enum Holidays {
  None, // celebrate every day!
  Christmas,
  ChristmasEve,
  Halloween,
  HalloweenEve,
  NewYears,
  NewYearsEve,
  Valentines,
  BabaIsYouRelease,
  TeamFortress2Release,
  MicroRelease,
}

// return today's holiday
const getHoliday = function (): Holidays {
  const d = new Date();
  switch (`${d.getMonth()+1}/${d.getDate()}`) {
    case "12/24":
      return Holidays.ChristmasEve;
    case "12/25":
      return Holidays.Christmas;
    case "10/31":
      return Holidays.Halloween;
    case "10/30":
      return Holidays.HalloweenEve;
    case "12/31":
      return Holidays.NewYearsEve;
    case "1/1":
      return Holidays.NewYears;
    case "2/14":
      return Holidays.Valentines;
    case "3/13":
      return Holidays.BabaIsYouRelease;
    case "10/10":
      return Holidays.TeamFortress2Release;
    case "8/9":
      return Holidays.MicroRelease;

    default:
      return Holidays.None;
  }
};
