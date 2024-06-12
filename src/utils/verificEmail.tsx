import { fetchMongodb } from "./fetchMongodb";

export const checkEmailAvailability = async ({ email }: any) => {
    try {
        const users = await fetchMongodb();

        if (users) {
            const emailExists = users.some((topic: any) => topic.email === email);

            if (emailExists) {
                alert('Esse E-mail já existe!😒');
            } else {
                return console.log("E-mail disponivel!👌")
            }

            return { emailExists }
        } else {
            console.log("Topics don't exist")
        }
    } catch (err) {
        console.log('Erro:', err);
    }
};
