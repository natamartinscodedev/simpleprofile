import { fetchMongodb } from "./fetchMongodb";

export const GetDataUser = async ({ email }: any) => {
    try {
        const { topics } = await fetchMongodb();

        if (topics) {
            topics.some((topic: any) => topic.email === email);
            console.log("Welcome...🚀")

            return {
                plan: topics[0].plans,
            }
        } else {
            console.log("Topics don't exist")
        }
    } catch (err) {
        console.log('Erro:', err);
    }
};
