import { NextResponse } from "next/server";

//  fetch api upload aws s3
export const handleSubmitFileToS3 = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch('/api/aws/s3/upload', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
        }

        return NextResponse.json({ img: true }, { status: 200 });
    } catch (error) {
        console.error('Erro no upload:', error);
    }
};