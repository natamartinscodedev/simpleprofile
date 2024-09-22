interface TypeInfo {
  nameLink?: string;
  name?: any;
  bio?: any;
  image?: any;
  lists?: any[];
}

export async function updateInfoUser({
  nameLink,
  name,
  bio,
  image,
  lists,
}: TypeInfo) {
  try {
    const res = await fetch("/api/task/task", {
      cache: "no-cache",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameLink,
        name,
        bio,
        image,
        lists,
      }),
    });
    const data = res.json();

    if (res.ok) {
      console.log("Data saved to the backend successfully!");
    } else {
      console.error("Failed to save data to the backend ==>", res.statusText);
    }

    return data;
  } catch (err) {
    console.log("Ops! Erro in method PUT! 😒 ===>", err);
  }
}
