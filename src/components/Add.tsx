"use client"; // 👈 이거 꼭 맨 위에 넣어줘야 함!

import LanguageSelector from "@/components/LanguageSelector";
import TopVisualSection from "@/components/TopVisualSection";
import SearchSection from "@/components/search/SearchSection";
import CardSection from "@/components/cards/CardSection";
import {useState} from "react";
import {LanguageCode} from "@/constants/language";

export const Add = () => {

    function getInitialLanguage() {
        const lang = navigator.language || navigator.languages[0];
        if (lang.startsWith("ko")) return "ko";
        if (lang.startsWith("ja")) return "ja";
        if (lang.startsWith("zh")) return "zh";
        return "en";
    }

    const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(getInitialLanguage());


    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="absolute top-4 right-4 z-50">
                <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                />
            </div>
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <TopVisualSection
                    selectedLanguage={selectedLanguage}
                />
            </div>
            <div className="container mx-auto px-4 -mt-8 relative z-30">
                <SearchSection
                    selectedLanguage={selectedLanguage}
                />
            </div>
            <div className="container mx-auto px-4 py-16">
                <CardSection/>
            </div>
        </div>
    )
}