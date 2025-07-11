import {LanguageCode} from "@/constants/language";
import {TripType} from "@/constants/tripType";
import React from "react";
import {translationLocales} from "@/constants/locale";

interface TripTypeToggleProps {
    selectedLanguage: LanguageCode; // 예: "ko" | "en" | "ja"
    selectedTripType: TripType; // 예: "roundTrip" | "oneWay"
    setSelectedTripType: (type: TripType) => void; // 예: (type: "roundTrip" | "oneWay") => void
    setReturnDate: (date: string) => void; // 선택적 prop, 필요시 사용
}

const TripTypeToggle: React.FC<TripTypeToggleProps> = ({
                                                           selectedLanguage,
                                                           selectedTripType,
                                                           setSelectedTripType,
                                                           setReturnDate
                                                       }) => {

    const ment = translationLocales[selectedLanguage];

    return (
        <>
            <div className="space-y-3">
                <label
                    className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base font-semibold text-gray-700"
                >
                    {ment.tripType}
                </label>
                <div role="radiogroup" aria-required="false" dir="ltr" className="flex gap-6"
                     tabIndex={0}
                     style={{outline: "none"}}>
                    <div className="flex items-center space-x-2"
                         onClick={() => setSelectedTripType("roundTrip")}
                    >
                        <button
                            type="button"
                            role="radio"
                            aria-checked={selectedTripType === "roundTrip"}
                            data-state="checked"
                            value="roundtrip"
                            onClick={() => setSelectedTripType("roundTrip")}
                            className={`aspect-square h-4 w-4 rounded-full border 
                               ${selectedTripType === "roundTrip" ? "bg-blue-500" : ""}
                                border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`
                            }
                            id="roundtrip"
                            tabIndex={0}
                            data-radix-collection-item=""
                        >
                            {selectedTripType === "roundTrip" && (
                                <span className="flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-circle h-2.5 w-2.5 fill-current text-current"
                                >
                                  <circle cx="12" cy="12" r="10"/>
                                </svg>
                              </span>
                            )}
                        </button>
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            htmlFor="roundtrip"
                        >
                            {ment.roundtrip}
                        </label>
                    </div>
                    <div className="flex items-center space-x-2"
                         onClick={() => {
                             setSelectedTripType("oneway")
                             setReturnDate("");
                         }}
                    >
                        <button
                            type="button"
                            role="radio"
                            aria-checked={selectedTripType === "oneway"}
                            value="oneWay"
                            onClick={() => setSelectedTripType("oneway")}
                            className={`
                                        aspect-square h-4 w-4 rounded-full border
                                        ${selectedTripType === "oneway" ? "bg-blue-500" : ""}
                                        border-primary text-primary ring-offset-background
                                        focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                                        disabled:cursor-not-allowed disabled:opacity-50
                                      `}
                        >
                            {selectedTripType === "oneway" && (
                                <span className="flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-circle h-2.5 w-2.5 fill-current text-current"
                                >
                                  <circle cx="12" cy="12" r="10"/>
                                </svg>
                              </span>
                            )}
                        </button>
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            htmlFor="oneway"
                        >
                            {ment.oneway}
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TripTypeToggle;