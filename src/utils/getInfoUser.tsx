import { fetchMongodb } from "./fetchMongodb";

export async function GetDataUser(email?: any, nameLink?: any) {
    try {
        const { topics } = await fetchMongodb();
        if (topics) {
            const res = topics.filter((user: any) => user.email === email || user.nameLink === nameLink)
            const User = res[0]

            return { User }
        } else {
            console.log("Topics don't exist")
        }
    } catch (err) {
        console.log('Erro:', err);
    }
};
