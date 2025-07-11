import React from "react";
import PopularPlaceCards from "@/components/cards/PopularPlaceCards";
import PopularSearchCards from "@/components/cards/PopularSearchCards";
import TipsCard from "@/components/cards/TipsCard";

interface CardSectionProps {

}


const CardSection: React.FC<CardSectionProps> = () => {
    return (
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PopularPlaceCards/>
            <PopularSearchCards/>
            <TipsCard/>
        </div>
    )
}

export default CardSection;