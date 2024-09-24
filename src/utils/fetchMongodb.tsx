export const fetchMongodb = async () => {
  try {
    const res = await fetch("/api/task/task", {
      cache: "no-cache",
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch!");
    }

    return await res.json();
  } catch (err: any) {
    console.error(err);
    return { error: err.message };
  }
};
