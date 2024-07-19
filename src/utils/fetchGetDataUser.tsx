import { fetchMongodb } from "./fetchMongodb";

export async function GetDataUser(email: any) {
    try {
        const { topics } = await fetchMongodb();
        const res = topics.filter((user: any) => user.email === email)
        const User = res[0]

        if (User) {
            return { User }
        } else {
            console.log("Topics don't exist")
        }
    } catch (err) {
        console.log('Erro:', err);
    }
};
