// 'use client';

// import { useState } from 'react';

// export default function UploadForm() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (e: any) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmitFileToS3 = async (e: any) => {
//     e.preventDefault();
//     if (!file) {
//       setMessage('Por favor, selecione um arquivo.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await fetch('/api/aws/s3/upload', {
//         method: 'POST',
//         body: formData,
//         // 
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage(`Upload bem-sucedido: ${data.fileName}`);
//         alert('Upload successful!')
//       } else {
//         setMessage(`Erro no upload: ${data.error}`);
//       }
//     } catch (error) {
//       console.error('Erro no upload:', error);
//       setMessage('Erro no servidor.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmitFileToS3}>
//       <input type="file" onChange={handleFileChange} />
//       <button type="submit">Enviar</button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// }
