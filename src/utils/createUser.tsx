interface TypeInfo {
    nameLink: string,
    email: string,
    plans: string
}

export async function FetchPost({ nameLink, email, plans }: TypeInfo) {
    try {
        const res = await fetch("/api/task/task", {
            method: "POST",
            body: JSON.stringify({
                nameLink,
                email,
                plans
            })
        })
        const data = await res.json()

        if (!res.ok) {
            throw Error("Faled to fetc topics")
        }

        return data
    } catch (err) {
        console.log("Ops! Erro in method POST! 😒")
    }
}
