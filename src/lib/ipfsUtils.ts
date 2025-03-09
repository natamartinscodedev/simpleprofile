// lib/ipfsUtils.js
import ipfs from './ipfs'

export async function uploadToIPFS(fileContent: any) {
  try {
    const result = await ipfs.add(fileContent)
    // O hash retornado está em result.path
    return result.path
  } catch (error) {
    console.error('Erro ao fazer upload para o IPFS:', error)
    throw error
  }
}
