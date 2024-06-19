// import { getDictionary } from '../../get-dictionary';
// import { Locale } from "../../i18n";
import Home from './Home';

export default async function Index() {
  // const dictionary = await getDictionary(locale);

  return (
    <>
      {/* <Home lang={dictionary} locale={locale} /> */}
      <Home />
    </>
  )
}