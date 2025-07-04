interface TypeInfo {
  nameLink?: string
  name?: string
  bio?: string
  image?: any
  plans?: string
  password?: any
  lists?: object[]
}

export async function UpdateInfoUser({
  nameLink,
  name,
  bio,
  image,
  lists,
  plans,
  password
}: TypeInfo) {
  try {
    const res = await fetch('/api/task/task', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nameLink,
        name,
        bio,
        image,
        lists,
        plans,
        password
      })
    })

    const data = await res.json()

    if (res.ok) {
      return
    } else {
      console.error(
        'Failed to save data to the backend ==>',
        res.statusText,
        data
      )
    }

    return data
  } catch (err) {
    return
  }
}
