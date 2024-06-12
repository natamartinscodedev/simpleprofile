import { fetchMongodb } from "./fetchMongodb";

export const checkNameAvailability = async ({ nameLink }: any) => {
    console.log("Name ==>", nameLink)

    try {
        const users = await fetchMongodb();
        console.log("Cade ==>", users)

        if (users) {
            const nameExists = users.some((topic: any) => topic.nameLink === nameLink);

            if (nameExists) {
                alert('Esse nome já existe!😒');
            } else {
                return console.log("Nome disponivel!👌")
            }

            return { nameExists }
        } else {
            console.log(`${users} don't exist`)
        }
    } catch (err) {
        console.log('Erro:', err);
    }
};
