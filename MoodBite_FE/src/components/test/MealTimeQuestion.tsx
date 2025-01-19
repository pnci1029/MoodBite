import {MealTime} from "../../types/test";
import style from "../../style/test.module.scss";

interface Args {
    selectedTime: MealTime | null;
    onTimeSelect: (time: MealTime) => void;
}

export function MealTimeQuestion(
    {selectedTime, onTimeSelect}:Args
) {
    const mealTimes: MealTime[] = ['아침', '점심', '저녁', '야식'];

    return (
        <section className={style.testSection}>
            <h2 className={style.questionTitle}>
                언제 드실 예정인가요?
            </h2>
            <div className={style.mealTimeContainer}>
                {mealTimes.map((time) => (
                    <button
                        key={time}
                        className={`${style.mealTimeButton} ${selectedTime === time ? style.selected : ''}`}
                        onClick={() => onTimeSelect(time)}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </section>
    );
};