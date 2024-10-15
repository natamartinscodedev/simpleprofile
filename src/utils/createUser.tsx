interface TypeInfo {
  nameLink?: string
  email?: string
  password?: any
  plans?: string
  name?: string
  bio?: string
  image?: any
  lists?: []
}

export async function FetchPost({
  nameLink,
  email,
  password,
  plans,
  name,
  bio,
  image,
  lists
}: TypeInfo) {
  try {
    const res = await fetch('/api/task/task', {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nameLink,
        email,
        password,
        plans,
        name,
        bio,
        image,
        lists
      })
    })
    const data = await res.json()

    if (!res.ok) {
      throw Error('Faled to fetc topics')
    }

    return data
  } catch (err) {
    console.log('Ops! Erro in method POST! 😒')
  }
}
