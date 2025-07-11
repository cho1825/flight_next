import {LanguageCode} from "@/constants/language";
import React from "react";
import {translationLocales} from "@/constants/locale";

interface PassengersSelectorProps {
    selectedLanguage: LanguageCode;
    passengerCnt: number;
    setPassengerCnt: (value: number) => void;
}

const PassengersSelector: React.FC<PassengersSelectorProps> = ({selectedLanguage, passengerCnt, setPassengerCnt}) => {

    const ment = translationLocales[selectedLanguage];
    return (

        <>
            <div className="space-y-2">
                <label
                    className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base font-semibold text-gray-700 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         className="lucide lucide-users h-4 w-4">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    {ment.passengers}
                </label>


                <select
                    value={passengerCnt}
                    onChange={(e) => setPassengerCnt(Number(e.target.value))}
                    className="w-full border rounded-md px-3 py-2 text-sm h-12"
                >
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}{ment.passengerCount}</option>
                    ))}
                </select>

                {/*<button type="button" role="combobox" aria-controls="radix-«R54prb»" aria-expanded="false"*/}
                {/*        aria-autocomplete="none" dir="ltr" data-state="closed"*/}
                {/*        className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;&gt;span]:line-clamp-1 h-12">*/}
                {/*    <span style={{pointerEvents: "none"}}>1명</span>*/}
                {/*    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
                {/*         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"*/}
                {/*         className="lucide lucide-chevron-down h-4 w-4 opacity-50" aria-hidden="true">*/}
                {/*        <path d="m6 9 6 6 6-6"></path>*/}
                {/*    </svg>*/}
                {/*</button>*/}

            </div>
        </>
    )
}

export default PassengersSelector;