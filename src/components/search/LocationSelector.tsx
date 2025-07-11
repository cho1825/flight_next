import React, {useEffect, useRef, useState} from "react";
import {LanguageCode} from "@/constants/language";
import {translationLocales} from "@/constants/locale";

interface Suggestion {
    name: string;
    code: string;
    country_code: string;
}

interface LocationSelector {
    selectedLanguage: LanguageCode;
    fromCity: string;
    setFromCity: (city: string) => void;
    toCity: string;
    setToCity: (city: string) => void;

}

const LocationSelector: React.FC<LocationSelector> = ({
                                                          selectedLanguage
                                                          , fromCity
                                                          , setFromCity
                                                          , toCity
                                                          , setToCity
                                                      }) => {

    const [airportList, setAirportList] = useState<Suggestion[]>([]);

    const ment = translationLocales[selectedLanguage];

    const containerRef = useRef<HTMLDivElement>(null);

    const [fromSearchTerm, setFromSearchTerm] = useState<string>("");
    const [toSearchTerm, setToSearchTerm] = useState<string>("");

    const [fromSuggestions, setFromSuggestions] = useState<Suggestion[]>([]);
    const [toSuggestions, setToSuggestions] = useState<Suggestion[]>([]);


    const [fromWriting, setFromWriting] = useState<boolean>(false);
    const [toWriting, setToWriting] = useState<boolean>(false);


    // const fetchSuggestions = async (
    //     term: string,
    //     setSuggestions: React.Dispatch<React.SetStateAction<Suggestion[]>>
    // ) => {
    //     if (!term.trim()) {
    //         setSuggestions([]);
    //         return;
    //     }
    //     try {
    //         const response = await axios.get("https://autocomplete.travelpayouts.com/places2", {
    //             params: {
    //                 term,
    //                 locale: selectedLanguage,
    //                 types: "airport",
    //             },
    //         });
    //         const filtered = response.data.filter((item: any) => item.type === "city" || item.type === "airport");
    //         console.log(filtered)
    //         setSuggestions(filtered);
    //     } catch (e) {
    //         console.error("Autocomplete error:", e);
    //         setSuggestions([]);
    //     }
    // };


    useEffect(() => {
        const fetchAirportList = async () => {
            if (airportList.length > 0) return;

            try {
                const response = await fetch('/assets/airports-en.json');
                const resData = await response.json();
                const filtered = resData.filter((item: any) =>
                    item.flightable === true && (item.iata_type === "city" || item.iata_type === "airport")
                );
                setAirportList(filtered);
            } catch (e) {
                console.error("공항 목록 불러오기 실패:", e);
            }
        };

        fetchAirportList();

    }, [selectedLanguage]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setFromSuggestions([]); // 밖을 클릭하면 추천창 닫기!
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!fromWriting) return;

        const debounce = setTimeout(() => {
            console.log(fromSearchTerm);
            const filterd = airportList.filter((item) =>
                item.name.toLowerCase().includes(fromSearchTerm.toLowerCase())
            );
            setFromSuggestions(filterd.slice(0, 30)); // 최대 10개만 보여주기
        }, 150);
        return () => clearTimeout(debounce);
    }, [fromSearchTerm, airportList]);


    useEffect(() => {

        if (!toWriting) return;

        const debounce = setTimeout(() => {
            const filterd = airportList.filter((item) =>
                item.name.toLowerCase().includes(toSearchTerm.toLowerCase())
            );
            setToSuggestions(filterd.slice(0, 30)); // 최대 10개만 보여주기

        }, 150);

        return () => clearTimeout(debounce);
    }, [toSearchTerm, airportList]);

    return (
        <>
            <div className="grid md:grid-cols-2 gap-4"
                 ref={containerRef}
            >
                <div className="space-y-2">
                    <label
                        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base font-semibold text-gray-700 flex items-center gap-2"
                        htmlFor="departure"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-map-pin h-4 w-4">
                            <path
                                d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {ment.departure}
                    </label>
                    <div className={"relative"}>
                        <input
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 text-base"
                            autoComplete="off"
                            id="departure" placeholder={ment.departureMent} value={fromSearchTerm}
                            onChange={(e) => {
                                setFromSearchTerm(e.target.value)
                                setFromWriting(true);
                            }}
                        />
                        <i className="fas fa-plane-departure absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                        {fromSuggestions.length > 0 && (
                            <ul className="absolute bg-white border border-gray-200 w-full mt-1 rounded shadow z-10">
                                {fromSuggestions.map((s) => (
                                    <li key={s.code}
                                        onClick={() => {
                                            setFromCity(s.code);
                                            setFromSearchTerm(`${s.name}, ${s.country_code}`);
                                            setFromSuggestions([]);
                                            setFromWriting(false);
                                        }}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {s.name}, {s.country_code}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="space-y-2 relative">
                    <label
                        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base font-semibold text-gray-700 flex items-center gap-2"
                        htmlFor="arrival"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-map-pin h-4 w-4">
                            <path
                                d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {ment.arrival}
                    </label>
                    <div className="relative">
                        <input
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 text-base pr-12"
                            autoComplete="off"
                            id="arrival" placeholder={ment.arrivalMent} value={toSearchTerm}
                            onChange={(e) => {
                                setToSearchTerm(e.target.value);
                                setToWriting(true);
                            }}
                        />
                        <i className="fas fa-plane-departure absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                        {toSuggestions.length > 0 && (
                            <ul className="absolute bg-white border border-gray-200 w-full mt-1 rounded shadow z-10">
                                {toSuggestions.map((s) => (
                                    <li
                                        key={s.code}
                                        onClick={() => {
                                            setToCity(s.code);
                                            setToSearchTerm(`${s.name}, ${s.country_code}`);
                                            setToSuggestions([]);
                                            setToWriting(false);
                                        }}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {s.name}, {s.country_code}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground rounded-md absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                            type="button"
                            onClick={() => {
                                const tempCityCode = fromCity;
                                setFromCity(toCity);
                                setToCity(tempCityCode);

                                const tempSearchTerm = fromSearchTerm;
                                setFromSearchTerm(toSearchTerm);
                                setToSearchTerm(tempSearchTerm);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="lucide lucide-arrow-right-left h-4 w-4">
                                <path d="m16 3 4 4-4 4"></path>
                                <path d="M20 7H4"></path>
                                <path d="m8 21-4-4 4-4"></path>
                                <path d="M4 17h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LocationSelector;