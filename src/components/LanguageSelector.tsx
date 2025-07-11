import React, {useRef} from "react";
import {LanguageCode, languages} from "@/constants/language";

interface LanguageSelectorProps {
    selectedLanguage: LanguageCode;
    setSelectedLanguage: (lang: LanguageCode) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({selectedLanguage, setSelectedLanguage}) => {

    const dropdownRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative" ref={dropdownRef}>
            <button type="button" role="combobox" aria-controls="radix-«R9rb»" aria-expanded="false"
                    aria-autocomplete="none" dir="ltr" data-state="closed"
                    className="flex h-10 items-center justify-between rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;&gt;span]:line-clamp-1 w-32 bg-white/90 backdrop-blur-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        const dropdown = document.getElementById("language-dropdown");


                        if (dropdown) {
                            dropdown.classList.toggle("hidden");
                        }
                    }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-globe h-4 w-4 mr-2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                </svg>
                <span style={{pointerEvents: "none"}}>
                    {languages.find((l) => l.code === selectedLanguage)?.name}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-chevron-down h-4 w-4 opacity-50" aria-hidden="true">
                    <path d="m6 9 6 6 6-6"></path>
                </svg>
            </button>
            <div
                id="language-dropdown"
                className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-1 hidden z-50"
            >
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        className={`block w-full text-left px-4 py-2 hover:bg-blue-50 cursor-pointer 
                        whitespace-nowrap ${selectedLanguage === lang.code ? "bg-blue-50 text-blue-600" : "text-gray-700"}`
                        }
                        onClick={() => {
                            setSelectedLanguage(lang.code as LanguageCode);
                            const dropdown = document.getElementById("language-dropdown");
                            if (dropdown) dropdown.classList.add("hidden");
                        }}
                    >
                        {lang.name}
                    </button>
                ))}
            </div>

        </div>

    )
}

export default LanguageSelector;