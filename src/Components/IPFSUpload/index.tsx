// 'use client'

// import { useState } from 'react'
// import { uploadToIPFS } from '@/lib/ipfsUtils'

// const IPFSUpload = ({ onUpload }: any) => {
//   const [file, setFile] = useState(null)
//   const [loading, setLoading] = useState(false)

//   const handleFileChange = (e: any) => {
//     setFile(e.target.files[0])
//   }

//   const handleUpload = async () => {
//     if (!file) return
//     setLoading(true)
//     try {
//       console.log('')
//       // const reader = new FileReader()
//       // reader.readAsArrayBuffer(file)
//       // reader.onloadend = async () => {
//       //   const buffer = Buffer.from(reader.result)
//       //   const hash = await uploadToIPFS(buffer)
//       //   onUpload(hash) // Envia o hash para o componente pai
//       //   setLoading(false)
//     } catch (error) {
//       console.error('Upload falhou:', error)
//       setLoading(false)
//     }
//   }

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? 'Enviando...' : 'Enviar para IPFS'}
//       </button>
//     </div>
//   )
// }

// export default IPFSUpload
