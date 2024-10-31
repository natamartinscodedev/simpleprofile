import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/firebase/firebase'

export default  async function uploadMidiaStorage(file: any) {
  if (!file) return;
  const fileType: any = file.type;

  try {
    const storageRef = ref(storage, `midia/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL: string = await getDownloadURL(storageRef)

    return {
      downloadURL,
      fileType
    }
  }catch (error) {
    console.log(error)
  }
}
