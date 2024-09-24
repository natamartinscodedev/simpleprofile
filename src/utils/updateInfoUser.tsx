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

    const res = await fetch("/api/task/task", {
      cache: "no-cache",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameLink: nameLink || "",
        name: name || "",
        bio: bio || "",
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
