export const fetchNameLinks = (link: any) => {
  let nameLink = link;

  if (typeof nameLink !== "string") {
    throw new Error("Invalid URL");
  }

  const username = nameLink.split("/").filter(Boolean).pop();

  if (nameLink.startsWith("https://www.")) {
    nameLink = nameLink.slice(12);
  } else if (nameLink.startsWith("https://")) {
    nameLink = nameLink.slice(8);
  } else if (nameLink.startsWith("http://www.")) {
    nameLink = nameLink.slice(11);
  } else if (nameLink.startsWith("http://")) {
    nameLink = nameLink.slice(7);
  }

  nameLink.replace("www.", "");
  nameLink = nameLink.split(".")[0];

  const siteNameMap: any = {
    linkedin: "LinkedIn",
    github: "GitHub",
    twitter: "Twitter",
    facebook: "Facebook",
    instagram: "Instagram",
    // add more...
  };

  const date =
    siteNameMap[nameLink] ||
    nameLink.charAt(0).toUpperCase() + nameLink.slice(1);

  return { linkName: username, WebName: date };
};
