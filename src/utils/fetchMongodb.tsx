export const fetchMongodb = async () => {
    try {
        const res = await fetch("app/api/session", {
            cache: "no-cache"
        })

        if (!res.ok) {
            throw new Error("Failed to fetch!")
        }

        return res.json()
    } catch (err) {
        console.log(err)
    }
};
