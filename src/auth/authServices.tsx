// import { isSignInWithEmailLink, signInWithEmailLink, signOut } from "firebase/auth";
// // import { auth } from '@/firebase/firebase'
// import { useEffect, useState } from "react";
//
// export function Login() {
//     const [user, setUser]: any = useState()
//     // const [loadin, setLoadin] = useState(false)
//
//     const LoginFirebase = () => {
//         try {
//             if (isSignInWithEmailLink(auth, window.location.href)) {
//                 const email: any = window.localStorage.getItem('emailForSignIn');
//
//                 if (email) {
//                     // setLoadin(true)
//                     signInWithEmailLink(auth, email, window.location.href)
//                         .then((res: any) => {
//                             setUser(res.user)
//                         })
//                         .catch((err) => {
//                             console.log("Erro ==>", err)
//                         });
//                     setLoadin(false)
//
//                 }
//                 console.log("Deu boa aqui!!!")
//             } else {
//                 console.log("Deu ruim!!!")
//             }
//         } catch (err) {
//             return console.log("Err ==>", err)
//         }
//     }
//
//     useEffect(() => {
//         LoginFirebase()
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])
//
//     return { user, loadin }
//
// }
//
// export async function LogOut() {
//     return signOut(auth)
// }
