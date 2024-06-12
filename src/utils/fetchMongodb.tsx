export const fetchMongodb = async () => {
    try {
        const res = await fetch("/api/session", {
            cache: "no-cache"
        })

        if (!res.ok) {
            throw new Error("Failed to fetch!")
        }

        return res.json()
    } catch (err: any) {
        console.error(err) // Log the error for debugging
        return { error: err.message }; // Return the error message
    }
};
