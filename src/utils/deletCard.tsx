export async function deleteCard(id: any) {
  try {
    const res = await fetch(`/api/task/task?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to delete card");
    }

    return data;
  } catch (err) {
    return
  }
}
