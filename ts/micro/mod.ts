import { pathname_match, random_index } from "../util.js";

console.log("javascript enabled for this webpage");

type BadgeEntry80x80 = {
  img: string;
  title: string;
  desc: string;
};

function replace80x80Badge(badges: [BadgeEntry80x80]) {
  function badgeHTML(badge: BadgeEntry80x80) {
    return `<img src="/micro/badges/80x80/${badge.img}" /><text><h4>${badge.title}</h4><p>${badge.desc}</p></text>`;
  }

  const e = document.getElementById("acl-extra-badge");
  if (!e) {
    return;
  }
  const i = random_index(badges);

  e.innerHTML = badgeHTML(badges[i]!);
}

// micro homepage
if (pathname_match("/micro")) {
  console.log("running JS for micro index");

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
}
