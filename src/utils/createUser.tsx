interface TypeInfo {
    nameLink: string,
    email: string,
    plans: string
}

export async function Post({ nameLink, email, plans }: TypeInfo) {
    try {
        const res = await fetch("/api/session", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nameLink,
                email,
                plans,
            })
        })

        if (!res.ok) {
            throw Error("Faled to fetc topics")
        }

        return res.json()
    } catch (err) {
        console.log("Ops! Erro in method POST! 😒")
    }
}
