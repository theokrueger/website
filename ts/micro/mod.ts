import {
  pathnameMatch,
  randomElem,
  chancePercent,
  sleep,
  Holidays,
  getHoliday,
} from "../util.js";

console.log("javascript enabled for this webpage");

// micro homepage only
if (pathnameMatch("/micro")) {
  console.log("running JS for micro index");

  type BadgeEntry = {
    img: string;
    title: string;
    desc: string;
  };

  const badgeElem = document.getElementById("acl-extra-badge")!;
  badgeElem.querySelector("#acl-extra-badge-img")!.outerHTML =
    `<img id="acl-extra-badge-img" class="zoomable-150" width="80px" height="80px" />`;
  const badgeImgElem = <HTMLImageElement>(
    badgeElem.querySelector("#acl-extra-badge-img")!
  );
  const badgeTextElem = badgeElem.querySelector("#acl-extra-badge-text")!;

  function replace80x80Badge(badges: [BadgeEntry]) {
    const badge = randomElem(badges);
    badgeImgElem.src = `/micro/badges/80x80/${badge.img}`;
    badgeTextElem.outerHTML = `<text><h4>${badge.title}</h4><p>${badge.desc}</p></text>`;
  }

  // badge replacement
  const badgeURL = "/micro/badges/badges.min.json";
  fetch(badgeURL, { cache: "force-cache" })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Failed fetching badges " + resp.status);
      }
      return resp.json();
    })
    .then((json) => {
      replace80x80Badge(json);
    });

  // flavor text
  if (chancePercent(1)) {
    const flavors: string[] = [
      "<em>Right behind you.</em>",
      "Where you should be.",
      ":D",
      "Install Firefox Now!",
      "Do yourself the favour.\nSwitch to Linux.",
      "Try OpenBSD!",
      "TODO: fixme.",
      "macro mini me.",
      "Turn scrape to scrap.",
      "REQ x>255px.",
      "Responsibly responsive.",
      "[secret text]",
    ];
    document.getElementById("acl-nav-message")!.innerHTML = randomElem(flavors);
  }

  // award badge
  const spikey = document.getElementById("award-spikey-text")!;
  const holiday = getHoliday();
  let noResizeSpikeyText = false;

  if (holiday !== Holidays.None) {
    spikey.innerHTML = randomElem(
      (() => {
        switch (holiday!) {
          case Holidays.Christmas:
            return ["merry\nchristmas!"];
          case Holidays.ChristmasEve:
            return [
              "coal\nfor\nyou",
              "you're on\nthe naughty\nlist",
              "don't\nforget\nmy\ncookies!",
            ];
          case Holidays.Halloween:
            if (chancePercent(50)) {
              return ["happy\nhalloween!"];
            } // share rest w/ eve
          case Holidays.HalloweenEve:
            return ["spooooky", "haunting\nyou", "boo!", "RAAARGH"];
          case Holidays.NewYears:
            return [
              "happy\nnew\nyear!",
              `it's\nalready\n${new Date().getFullYear()}!`,
              `${new Date().getFullYear()}\nedition!`,
              `fresh for\n${new Date().getFullYear()}!`,
            ];
          case Holidays.NewYearsEve:
            return [
              "see you\nnext year!",
              "last day\nof ${new Date().getFullYear()}!",
            ];
          case Holidays.Valentines:
            return [
              "she goes to\nanother\nschool",
              "happy\nvalentines!",
              "send me\nchocolate",
              "<3",
            ];
          case Holidays.BabaIsYouRelease:
            return [
              "oruga\nis you",
              "baba",
              "ba\nba",
              "st\nop",
              "you\nis\nwin",
            ];
          case Holidays.TeamFortress2Release:
            return [
              "play\ntf2!",
              "oruga\nfortress\ntwo",
              "9 years in\ndevelopment",
              "civilian\nmain",
              "too many\nhours",
            ];
          case Holidays.MicroRelease:
            return [
              `${new Date().getFullYear() - 2026}\nyears\nold!`,
              "since\n2026.08.09",
              "est.\n2026",
              "anniversary!",
            ];

          default:
            return ["error!"];
        }
      })(),
    );
  } else if (chancePercent(1)) {
    spikey.innerHTML = randomElem([
      "voted coolest site of always award",
      "graphic design is my passion",
      "arsieaqnwsienwqeisn",
      ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
        .map((c) => `<t style='color:${c};'>${c.charAt(0)}</t>`)
        .join(""),
    ]);
    spikey.style.fontSize = "20px";
    noResizeSpikeyText = true;
  } else {
    spikey.innerHTML = randomElem([
      // some of these are stolen from
      // https://minecraft.wiki/w/Splash
      // because i am not creative
      "free",
      "free!",
      ":)",
      ":D",
      "winner",
      "you're\nwinner",
      "coolest",
      "the\nbest",
      "the\nbestest",
      "website",
      "award!!",
      "wow!",
      "<3",
      "website",
      "bwaaaa",
      "<1MB!",
      "responsive\ndesign!",
      "one of\nany",
      "ethically\nsourced!",
      "shiny",
      "ababa",
      "buggin",
      "virus\nfree",
      "RFC1149\ncompliant",
      "y2k\ncompliant",
      "#1",
      "h",
      "halal",
      "waow",
      "swag",
      "umazing!",
      "*",
      "test",
      "noscript\ncompatible",
      "404!",
      "200\nOK",
      "limited\nedition",
      "it's a\nwebsite!",
      "uses\nZola!",
      "yaaaaay!",
      "90%\nfunctional!",
      "generally\nacceptable!",
      "no\nmsg!",
      "over\n256\ncolors!",
      "[dated\nreference]",
      "..!",
      "terrifying!",
      "zzzzzz",
      "free\nram",
      "TODO",
      "ඞ",
      "uoh", // 😭
      "urgh", // this is specifically the pufferfish one
      "clear\nyour\nnvram",
      "buy\nused!",
      "it\nworks!",
      "!!!",
      "freshly\nsqueezed!",
      "(not)\noriginal!",
      "the quick\nbrown fox\njumps over\nthe lazy\ndog",
      "px\npilled",
      "upgrade to\n1024x768",
      "same\ngreat\ntaste!",
      "bookmark\nit!",
      "the\noriginal\nand best!",
      "runs on\nlinux!",
      "certified!",
      "forklift\ncertified!",
      "licensed!",
      "GPLv3!",
    ]);
  }

  if (!noResizeSpikeyText) {
    const splitTxt = spikey.innerHTML.split("\n");
    const spikeyFontSize =
      120 /
      Math.max(...splitTxt.map((l) => l.length), splitTxt.length * 2, 2.5);
    spikey.style.fontSize = `${spikeyFontSize}px`;
    spikey.style.lineHeight = `${(spikeyFontSize * 4) / 5}px`;
  }
}

// all micro documents

// zoom shinies :)
[150, 120, 200].forEach((s) => {
  const es = document.getElementsByClassName(`zoomable-${s}`);
  for (let i = 0; i < es.length; i++) {
    const e = <HTMLElement>es[i]!;
    e.onmouseover = async () => {
      await sleep(250);
      e.style.transition =
        "scale 0.2s ease, transform 0.05s linear, filter 0.05s linear";
    };
    e.onmouseout = async () => {
      e.style.transition = "";
      e.style.transform = "";
      e.style.filter = "";
      await sleep(250);
    };
    e.onmousemove = (ev: MouseEvent) => {
      const r = e.getBoundingClientRect();
      const rx = (ev.clientX - r.left) / r.width - 0.5,
        ry = (ev.clientY - r.top) / r.height - 0.5;
      e.style.transform = `rotate3d(${-1 * ry}, ${rx}, 0, 30deg)`;
      e.style.filter = `drop-shadow(${-0.25 * rx * r.width}px ${-0.25 * ry * r.height}px ${Math.min(r.width, r.height) / 40}px #0009)`;
    };
  }
});


/* set visibility of js elements */
const invis = document.getElementsByClassName("show-on-js");
while (invis.length) {
  invis[0]!.className = invis[0]!.className.replace(/\bshow\-on\-js\b/g, "");
}
