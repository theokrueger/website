import { pathnameMatch, randomElem, chancePercent, sleep } from "../util.js";

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
  fetch(badgeURL)
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
  if (chancePercent(5)) {
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
      "Sit loud.",
    ];
    document.getElementById("acl-nav-message")!.innerHTML = randomElem(flavors);
  }
}

// all micro documents

// zoom shinies :)
[150, 120, 200].forEach((s) => {
  const es = document.getElementsByClassName(`zoomable-${s}`);
  for (var i = 0; i < es.length; i++) {
    const e = <HTMLElement>es[i]!;
    e.onmouseover = async () => {
      await sleep(250);
      e.style.transition =
        "scale 0.2s ease, transform 0.05s linear, filter 0.05s linear";
    };
    e.onmouseout = async () => {
      e.style.transition = "";
      e.style.transform = "";
      await sleep(250);
    };
    e.onmousemove = (ev: MouseEvent) => {
      const r = e.getBoundingClientRect();
      const rx = (ev.clientX - r.left) / r.width - 0.5,
        ry = (ev.clientY - r.top) / r.height - 0.5;
      e.style.transform = `rotate3d(${-1 * ry}, ${rx}, 0, 30deg)`;
      e.style.filter = `drop-shadow(${-10 * ry}%, ${10 * rx}%, 100%, black)`;
    };
  }
});
