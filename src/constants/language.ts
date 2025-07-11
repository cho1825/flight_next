export const SUPPORTED_LANGUAGES = ["ko", "ja", "en","zh"] as const;
export type LanguageCode = typeof SUPPORTED_LANGUAGES[number];

export const languages: { code: LanguageCode; name: string }[] = [
    { code: "en", name: "English" },
    { code: "ko", name: "한국어" },
    { code: "ja", name: "日本語" },
    { code: "zh", name: "中文" }
]