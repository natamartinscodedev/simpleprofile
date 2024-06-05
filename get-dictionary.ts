import "server-only";
import type { Locale } from "./i18n";

const dictionaries = {
    'en-US': () => import("./src/i18n/en-US.json").then((module) => module.default),
    'pt-BR': () => import("./src/i18n/pt-BR.json").then((module) => module.default),

};

export const getDictionary = async (locale: Locale) =>
    dictionaries[locale]?.() ?? dictionaries["pt-BR"]();
