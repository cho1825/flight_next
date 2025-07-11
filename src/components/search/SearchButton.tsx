import {LanguageCode} from "@/constants/language";
import {TripType} from "@/constants/tripType";
import {translationLocales} from "@/constants/locale";
import {toast} from "sonner";

interface SearchButtonProps {
    selectedLanguage: LanguageCode;
    selectedTripType: TripType;
    fromCity: string;
    toCity: string;
    departDate: string;
    returnDate: string;
    passengerCnt: number;
}

const SearchButton: React.FC<SearchButtonProps> = ({selectedLanguage, selectedTripType, fromCity,toCity,departDate,returnDate,passengerCnt}) => {

    const ment = translationLocales[selectedLanguage];

    const marker = "642526";

    const formatDate = (dateStr: string): string => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}${month}`;
    }

    const searchFlights = () => {


        if (fromCity === "" || toCity === "" || departDate === "") {
            toast.error(ment.searchError);
            return;
        }
        if (selectedTripType === "roundTrip" && returnDate === "") {
            toast.error(ment.searchErrorRoundTrip); // 왕복일 경우 리턴 날짜가 필요
            return;
        }


        const origin = fromCity.toUpperCase();
        const destination = toCity.toUpperCase();
        const depart = formatDate(departDate);

        let url = "";

        if (!returnDate || returnDate.trim() === "") {
            // 편도
            // https://www.aviasales.com/search/SEL2307PUS1?marker=642526&origin=SEL&destination=PUS&depart_date=2025-07-23&adults=1%60
            url = `https://www.aviasales.com/search/${origin}${depart}${destination}1?marker=${marker}&adults=${passengerCnt}`;
        } else {
            // 왕복
            const ret = formatDate(returnDate);
            url = `https://www.aviasales.com/search/${origin}${depart}${destination}${ret}?marker=${marker}&adults=${passengerCnt}\``;
        }

        // 새 창으로 URL 오픈
        window.open(url, "_blank");
    }


    return (
        <>
            <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={searchFlights}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-plane mr-2 h-5 w-5">
                    <path
                        d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
                </svg>
                {ment.searchButton}
            </button>
        </>

    )
}

export default SearchButton;