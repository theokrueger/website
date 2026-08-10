import { pathname_match, random_index } from "../util.js";

console.log("javascript enabled for this webpage");

type BadgeEntry = {
  img: string;
  title: string;
  desc: string;
};

function replaceBadge(badges: [BadgeEntry]) {
  function badgeHTML(badge: BadgeEntry) {
    return `<img src="/micro/acl/badges/${badge.img}" /><text><h4>${badge.title}</h4><p>${badge.desc}</p></text>`;
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
  const badgeURL = "/micro/acl/badges/badges.json";
  fetch(badgeURL)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Failed fetching badges " + resp.status);
      }
      return resp.json();
    })
    .then((json) => {
      replaceBadge(json);
    });
}
