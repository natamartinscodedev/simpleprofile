import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import { v4 as uuidv4 } from 'uuid'

interface typeParamsUploadFileS3 {
    buffer?: any,
    file?: any,
}

export async function uploadFileToS3({ buffer, file }: typeParamsUploadFileS3) {
    const bufferName = buffer;
    // const nameFolder = 'imgs-profiles'

    const uploadS3Midia: any = {
        Bucket: `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}`,
        Key: `${file.name}`,
        data_post: `${Date.now()}`,
        Body: bufferName,
        ContentType: "image/jpg",
    }

    const client = new S3Client({ region: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_REGION })
    const command = new PutObjectCommand(uploadS3Midia);
    await client.send(command);

    return file
}