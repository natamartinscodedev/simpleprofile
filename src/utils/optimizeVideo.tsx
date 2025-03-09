export function handleOptiminizationVideo(event: any) {
  const file = event.target.files[0]

  if (file) {
    const video = document.createElement('video')
    video.src = URL.createObjectURL(file)

    video.onloadedmetadata = () => {
      if (video.duration > 65) {
        alert('O vídeo deve ter no máximo 1 minuto.')
        event.target.value = '' // Limpa o input
        URL.revokeObjectURL(video.src) // Libera a memória
      } else {
        // Continue com o processamento do vídeo
        return
      }
    }
  }
}
