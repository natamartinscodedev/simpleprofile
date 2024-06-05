export const i18n = {
    locales: ["en-US", "pt-BR"],
    defaultLocale: "pt-BR",
    

} as const;

export type Locale = (typeof i18n)["locales"][number];
