// import S3 from 'aws-sdk/clients/s3'

// const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME // Nome da caixa mágica
// const region = process.env.NEXT_PUBLIC_AWS_REGION // Lugar onde ela está
// const accessKeyId = process.env.NEXT_PUBLIC_ACCESS_KEY // Sua chave mágica
// const secretAccessKey = process.env.NEXT_PUBLIC_SECRET_KEY // Sua chave secreta

// const s3 = new S3({
//   region,
//   accessKeyId,
//   secretAccessKey
// })

// export default function getFileStream(fileKey: any) {
//   const downloadParams: any = {
//     Bucket: bucketName,
//     Key: fileKey // O nome do brinquedo que você quer pegar
//   }

//   return s3.getObject(downloadParams).createReadStream()
// }
