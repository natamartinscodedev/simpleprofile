import { fetchMongodb } from './fetchMongodb'

export const checkNameAvailability = async ({ nameLink, setLoad }: any) => {
  try {
    const { topics } = await fetchMongodb()
    if (topics) {
      const nameExists = topics.some(
        (topic: any) => topic.nameLink === nameLink
      )
      if (nameExists) {
        setLoad(false)
        // alert("Esse nome já existe!😒");
      } else {
        setLoad(true)
        return
      }
      return nameExists
    } else {
      return
    }
  } catch (err) {
    return
  }
}
