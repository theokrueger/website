import { pathnameMatch, randomElem, chancePercent } from "../util.js";

console.log("javascript enabled for this webpage");

// micro homepage
if (pathnameMatch("/micro")) {
  console.log("running JS for micro index");

  type BadgeEntry80x80 = {
    img: string;
    title: string;
    desc: string;
  };

  function replace80x80Badge(badges: [BadgeEntry80x80]) {
    function badgeHTML(badge: BadgeEntry80x80) {
      return `<img src="/micro/badges/80x80/${badge.img}" /><text><h4>${badge.title}</h4><p>${badge.desc}</p></text>`;
    }

    document.getElementById("acl-extra-badge")!.innerHTML = badgeHTML(
      randomElem(badges),
    );
  }

  // badge replacement
  const badgeURL = "/micro/badges/badges.json";
  fetch(badgeURL)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Failed fetching badges " + resp.status);
      }
      return resp.json();
    })
    .then((json) => {
      replace80x80Badge(json["80x80"]);
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
