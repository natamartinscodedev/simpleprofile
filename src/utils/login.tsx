import { sendSignInLinkToEmail } from "firebase/auth";
// import { auth } from "@/firebase/firebase";
import { GetDataUser } from "./getInfoUser";

const Url = process.env.NEXT_PUBLIC_VERCEL_ENV;

export async function loginMagicLink(email: any) {
  const { User }: any = await GetDataUser(email);
  const nameUrl = User.nameLink;

  const actionCodeSettings = {
    url: `${Url}/User/${encodeURIComponent(nameUrl)}`,
    handleCodeInApp: true,
  };

  try {
    // await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
  } catch (error) {
    console.error("Erro ao enviar link de login mágico:", error);
  }
}

export default loginMagicLink;
