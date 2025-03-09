import { fetchMongodb } from "./fetchMongodb";

export const checkEmailAvailability = async ({ email }: any) => {
  try {
    const { topics } = await fetchMongodb();
    if (topics) {
      const emailExists = topics.some((topic: any) => topic.email === email);

      if (emailExists) {
        alert("Esse E-mail já existe!😒");
      } else {
        return
      }

      return { emailExists };
    } else {
      return
    }
  } catch (err) {
    return
  }
};
