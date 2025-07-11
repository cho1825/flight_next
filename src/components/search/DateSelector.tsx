import {LanguageCode} from "@/constants/language";
import {TripType} from "@/constants/tripType";
import {translationLocales} from "@/constants/locale";
import {useRef} from "react";

interface DateSelectorProps {
    selectedLanguage: LanguageCode;
    selectedTripType: TripType;
    departDate: string;
    setDepartDate: (date: string) => void;
    returnDate: string;
    setReturnDate: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
                                                       selectedLanguage,
                                                       selectedTripType,
                                                       departDate,
                                                       setDepartDate,
                                                       returnDate,
                                                       setReturnDate
                                                   }) => {

    const ment = translationLocales[selectedLanguage];
    const today = new Date().toISOString().split("T")[0];

    const departInputRef = useRef<HTMLInputElement>(null);
    const returnInputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 cursor-pointer"
                     onClick={() => {
                         departInputRef.current?.showPicker()
                     }}
                >
                    <label
                        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base font-semibold text-gray-700 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-calendar h-4 w-4">
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                            <path d="M3 10h18"></path>
                        </svg>
                        {ment.departureDate}
                    </label>
                    <input type="date"
                           ref={departInputRef}
                           className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 w-full h-12 justify-start text-left font-normal bg-transparent"
                           min={today} value={departDate}
                           onChange={(e) => setDepartDate(e.target.value)}
                    >
                    </input>
                </div>
                {selectedTripType !== "oneway" && (
                    <div className="space-y-2 cursor-pointer"
                         onClick={() => {
                             returnInputRef.current?.showPicker()
                         }}
                    >
                        <label
                            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base font-semibold text-gray-700 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                 className="lucide lucide-calendar h-4 w-4">
                                <path d="M8 2v4"></path>
                                <path d="M16 2v4"></path>
                                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                <path d="M3 10h18"></path>
                            </svg>
                            {ment.returnDate}
                        </label>
                        <input type="date"
                               ref={returnInputRef}
                               className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 w-full h-12 justify-start text-left font-normal bg-transparent"
                               min={today} value={returnDate}
                               onChange={(e) => setReturnDate(e.target.value)}
                        >
                        </input>
                    </div>
                )}

            </div>
        </>
    )
}

export default DateSelector;