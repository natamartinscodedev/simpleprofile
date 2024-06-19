import { fetchMongodb } from "./fetchMongodb";

export const checkNameAvailability = async ({ nameLink }: any) => {

    try {
        const { topics } = await fetchMongodb();

        if (topics) {
            const nameExists = topics.some((topic: any) => topic.nameLink === nameLink);

            if (nameExists) {
                alert('Esse nome já existe!😒');
            } else {
                return console.log("Nome disponivel!👌")
            }

            return { nameExists }
        } else {
            console.log("Topics don't exist")
        }
    } catch (err) {
        console.log('Erro:', err);
    }
};
