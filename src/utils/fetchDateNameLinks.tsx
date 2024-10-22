import { fetchNameLinks } from "./fetchNameLinks";

export async function fetchDateNameLink(link: any) {
  const { linkName, WebName } = fetchNameLinks(link);
  let dateLink = null;

  // console.log("Cheguei aqui ==>", WebName);

  if (WebName === "GitHub") {
    const res = await fetch(`https://api.github.com/users/${linkName}`);
    const data = await res.json();
    dateLink = data;
  }

  return { dateLink, WebName };
}
