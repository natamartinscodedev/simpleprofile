import { fetchMongodb } from "./fetchMongodb";

export const checkNameAvailability = async ({ nameLink, setLoad }: any) => {
    try {
        const { topics } = await fetchMongodb();
        if (topics) {
            const nameExists = topics.some((topic: any) => topic.nameLink === nameLink);
            if (nameExists) {
                setLoad(false)
                alert('Esse nome já existe!😒');
            } else {
                setLoad(true)
                return console.log("Nome disponivel!👌")
            }
            return nameExists
        } else {
            console.log("Topics don't exist")
        }
    } catch (err) {
        console.log('Erro:', err);
    }
};
