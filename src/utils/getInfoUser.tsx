// import { GetStaticProps } from 'next'
import { fetchMongodb } from './fetchMongodb'

interface TypeParams {
  email?: any
  nameLink?: any
}

export async function GetDataUser({ email, nameLink }: TypeParams) {
  try {
    const { topics } = await fetchMongodb()

    if (!topics) {
      return new Error("Not found!")
    }

    if (topics) {
      const res = topics.filter(
        (user: any) => user.email === email || user.nameLink === nameLink
      )
      const User = res[0]

      return { User }
    } else {
      return
    }
  } catch (err) {
    return
  }
}
