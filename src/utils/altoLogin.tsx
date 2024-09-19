// import { signInWithEmailLink } from "firebase/auth"
// import { GetDataUser } from "./getInfoUser"
// import { VerificarChaveValida } from "./saveKeyLocalStorage"
// import { auth } from "@/firebase/firebase"

// export async function AltologinUser(router: any) {
//     // const Url = process.env.NEXT_PUBLIC_VERCEL_ENV
//     const confirmOoobCode = localStorage.getItem('oobCode')
//     const confirmApiKey = localStorage.getItem('apiKey')
//     console.log('Check timeout and key', confirmApiKey, confirmOoobCode)

//     if (VerificarChaveValida(confirmApiKey)) {
//         const email = window.localStorage.getItem('emailForSignIn')
//         const { User }: any = await GetDataUser(email)
//         // const actionCodeSettings = `${Url}/User/${User.nameLink}?apiKey=${confirmApiKey}&oobCode=${confirmOoobCode}&mode=signIn&lang=en`
//         if (!email || !User) {
//             alert('E-mail para login não encontrado, Faça login novamente!')
//             return router.push('/Login')
//         }

//         try {
//             if (confirmApiKey && confirmOoobCode) {
//                 await signInWithEmailLink(auth, email, window.location.href)
//                 return router.replace(`/User/${User.nameLink}`)
//             }

//         } catch (error) {
//             console.error('Erro ao completar o login com link mágico:', error)

//             window.localStorage.removeItem('oobCode')
//             window.localStorage.removeItem('emailForSignIn')
//             window.localStorage.removeItem('apiKey')
//             window.localStorage.removeItem('expiryTime')
//         }
//     }
// }