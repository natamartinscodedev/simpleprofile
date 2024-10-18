interface TypeInfo {
  nameLink?: string
  name?: string
  bio?: string
  image?: any
  plans?: string
  lists?: object[]
}

export async function UpdateInfoUser({
  nameLink,
  name,
  bio,
  image,
  lists,
  plans
}: TypeInfo) {
  console.log('List ==>', lists)
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
        plans
      })
    })

    const data = await res.json()

    if (res.ok) {
      console.log('Data saved to the backend successfully! ==>', data)
    } else {
      console.error(
        'Failed to save data to the backend ==>',
        res.statusText,
        data
      )
    }

    return data
  } catch (err) {
    console.log('Ops! Erro in method PUT! 😒 ===>', err)
  }
}
