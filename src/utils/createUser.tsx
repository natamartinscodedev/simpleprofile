interface TypeInfo {
  nameLink: string;
  email: string;
  plans: string;
  name: string;
  bio: string;
  image: any;
}

export async function FetchPost({
  nameLink,
  email,
  plans,
  name,
  bio,
  image,
}: TypeInfo) {
  try {
    const res = await fetch("/api/task/task", {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameLink,
        email,
        plans,
        name,
        bio,
        image,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw Error("Faled to fetc topics");
    }

    return data;
  } catch (err) {
    console.log("Ops! Erro in method POST! 😒");
  }
}
