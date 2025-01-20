import {useState} from "react";
import {MealTime} from "../../../types/test";

export function useTestScores() {
    const [tiredScore, setTiredScore] = useState(50);
    const [angerScore, setAngerScore] = useState(50);
    const [stressScore, setStressScore] = useState(50);
    const [appetiteScore, setAppetiteScore] = useState(50);
    const [selectedMealTime, setSelectedMealTime] = useState<MealTime | null>(null);

    return {
        scores: {
            tired: tiredScore,
            anger: angerScore,
            stress: stressScore,
            appetite: appetiteScore
        },
        setters: {
            setTiredScore,
            setAngerScore,
            setStressScore,
            setAppetiteScore
        },
        mealTime: {
            selectedMealTime,
            setSelectedMealTime
        }
    };
};