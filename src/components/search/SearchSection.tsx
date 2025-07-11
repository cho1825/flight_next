import {LanguageCode} from "@/constants/language";
import {useState} from "react";
import {TripType} from "@/constants/tripType";
import {translationLocales} from "@/constants/locale";
import TripTypeToggle from "@/components/search/TripTypeToggle";
import LocationSelector from "@/components/search/LocationSelector";
import DateSelector from "@/components/search/DateSelector";
import PassengersSelector from "@/components/search/PassengersSelector";
import SearchButton from "@/components/search/SearchButton";


interface SearchSectionProps {
    selectedLanguage: LanguageCode;
}

const SearchSection: React.FC<SearchSectionProps> = ({selectedLanguage}) => {

    //왕복 편도 상태 관리
    const [selectedTripType, setSelectedTripType] = useState<TripType>("roundTrip");

    //여행지, 날짜, 승객 수 상태 관리
    const [fromCity, setFromCity] = useState<string>("");
    const [toCity, setToCity] = useState<string>("");
    const [departDate, setDepartDate] = useState<string>("");
    const [returnDate, setReturnDate] = useState<string>("");
    const [passengerCnt, setPassengerCnt] = useState<number>(1);

    const ment = translationLocales[selectedLanguage];

    return (
        <>
            <div className="rounded-lg bg-card text-card-foreground max-w-4xl mx-auto shadow-2xl border-0 bg-white">
                <div className="flex flex-col space-y-1.5 p-6 text-center pb-6">
                    <div className="tracking-tight text-2xl font-bold text-gray-800">{ment.searchMent1}</div>
                    <div className="text-sm text-gray-600">{ment.searchMent2}</div>
                </div>
                <div className="p-6 pt-0 space-y-6">
                    <TripTypeToggle
                        selectedTripType={selectedTripType}
                        setSelectedTripType={setSelectedTripType}
                        selectedLanguage={selectedLanguage}
                        setReturnDate={setReturnDate}
                    />
                    <LocationSelector
                        selectedLanguage={selectedLanguage}
                        fromCity={fromCity}
                        setFromCity={setFromCity}
                        toCity={toCity}
                        setToCity={setToCity}
                    />
                    <DateSelector
                        selectedLanguage={selectedLanguage}
                        selectedTripType={selectedTripType}
                        departDate={departDate}
                        setDepartDate={setDepartDate}
                        returnDate={returnDate}
                        setReturnDate={setReturnDate}
                    />
                    <PassengersSelector
                        selectedLanguage={selectedLanguage}
                        passengerCnt={passengerCnt}
                        setPassengerCnt={setPassengerCnt}
                    />
                    <SearchButton
                        selectedLanguage={selectedLanguage}
                        selectedTripType={selectedTripType}
                        fromCity={fromCity}
                        toCity={toCity}
                        departDate={departDate}
                        returnDate={returnDate}
                        passengerCnt={passengerCnt}
                    />
                </div>
            </div>
        </>
    )

}

export default SearchSection;