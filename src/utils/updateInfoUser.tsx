interface TypeInfo {
  nameLink?: string;
  name?: string;
  bio?: string;
  image?: any;
  lists?: object[];
}

export async function updateInfoUser({
  nameLink,
  name,
  bio,
  image,
  lists,
}: TypeInfo) {
  try {
    console.log("Valores que estão sendo enviados:", {
      nameLink,
      name,
      bio,
      image,
      lists,
    });

    const res = await fetch("/api/updateInfo/put", {
      cache: "no-cache",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameLink: nameLink || null,
        name: name || null,
        bio: bio || null,
        image: image || null,
        lists: lists || [],
      }),
    });
    const data = await res.json();

    if (res.ok) {
      console.log("Data saved to the backend successfully! ==>", data);
    } else {
      console.error(
        "Failed to save data to the backend ==>",
        res.statusText,
        data
      );
    }

    return data;
  } catch (err) {
    console.log("Ops! Erro in method PUT! 😒 ===>", err);
  }
}
