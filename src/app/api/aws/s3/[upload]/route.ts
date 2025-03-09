import { NextResponse } from "next/server"
import { uploadFileToS3 } from "@/utils/uploadFileToS3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// get midia from AWS S3
// export async function GET(req: Request) {
//   const url = ''
//   return NextResponse.redirect(url);
// }

// send midia from AWS S3
export async function POST(req: any) {
  try {
    if (req.method === 'POST') {
      const formData = await req.formData();
      const file: any = formData.get('file') as Blob;;

      if (!file) {
        return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await uploadFileToS3({ buffer, file })
    }
  } catch (error) {
    return
  }

  return NextResponse.json({ message: 'uploaded successfully', status: 200 })
}

// change midia from AWS S3
// export async function PUT() {
//   try {

//     return NextResponse.json({ status: 200 })
//   } catch (error) {
//     return
//   }
// }

// // delete midia from AWS S3
// export async function DELETE() {
//   try {

//     return NextResponse.json({ status: 200 })
//   } catch (error) {
//     return
//   }
// }