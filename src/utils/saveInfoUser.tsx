interface TypeInfo {
    name: string,
    bio: string,
    image: string,
    lists: any
}

export const SaveInfoUser = ({ name, bio, image, lists }: TypeInfo) => {
    async function saveInfo() {
        try {
            const date = await fetch("/api/session", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    bio,
                    image,
                    lists
                })
            })

            if (date.ok) {
                console.log('Data saved to the backend successfully!');
            } else {
                console.error('Failed to save data to the backend ==>', date.statusText);
            }

        } catch (err) {
            console.log("Ops! Erro in method POST! 😒 ===>", err)
        }
    }
}
