import { getDictionary } from '../../../get-dictionary';
import { Locale } from "../../../i18n-config";
import Home from './pages/Home';

export default async function Index({ params: { locale } }: { params: { locale: Locale } }) {

  const dictionary = await getDictionary(locale);
  const t = dictionary["Homepage"]

  return (
    <>
      <Home t={t} />
    </>
  )
}