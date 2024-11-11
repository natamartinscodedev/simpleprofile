import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/firebase/firebase'

// export default  async function uploadMidiaStorage(file: any) {
//   if (!file) return;
//   const fileType: any = file.type;
//
//   try {
//     const storageRef = ref(storage, `midia/${file.name}`);
//     await uploadBytes(storageRef, file);
//     const downloadURL: string = await getDownloadURL(storageRef)
//
//     return {
//       downloadURL,
//       fileType
//     }
//   }catch (error) {
//     console.log(error)
//   }
// }

export default async function uploadMidiaStorage(file: any) {
  if (!file) return

  const fileType: string = file.type

  if (fileType.startsWith('video/')) {
    const video = document.createElement('video')
    video.src = URL.createObjectURL(file)

    const durationPromise = new Promise((resolve, reject) => {
      video.onloadedmetadata = () => {
        if (video.duration > 60) { // 60 segundos = 1 minuto
          alert('O vídeo deve ter no máximo 1 minuto.')
          URL.revokeObjectURL(video.src)
          reject(new Error('Duração do vídeo é maior que 1 minuto.'))
        } else {
          resolve(true)
        }
      }
      video.onerror = () => {
        reject(new Error('Erro ao carregar o vídeo.'))
      }
    })

    try {
      await durationPromise
    } catch (error) {
      console.log(error)
      return
    }
  }

  try {
    const storageRef = ref(storage, `midia/${file.name}`)
    await uploadBytes(storageRef, file)
    const downloadURL: string = await getDownloadURL(storageRef)

    return {
      downloadURL,
      fileType
    }
  } catch (error) {
    console.log(error)
  }
}
