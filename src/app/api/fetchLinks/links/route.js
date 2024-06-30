export async function POST(req, res) {
    try {
        const data = await req.json();
        const name = data.pop()
        console.log("Name ==>", name)

        // return res.status(200).json({ name, image });
        return Response.json({ title: 'ola' }, { url: 'img' }, { status: 200 });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching metadata' });
    }
}
