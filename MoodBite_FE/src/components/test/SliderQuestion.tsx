import {TestStep} from "../../types/test";
import style from "../../style/test.module.scss";
import React from "react";

interface Args {
    title: string;
    value: number;
    onChange: (value: number) => void;
    testStep: TestStep;
    labels: { min: string; mid: string; max: string };
}

export function SliderQuestion(
    {title, value, onChange, testStep, labels}: Args
) {
    const [isDragging, setIsDragging] = React.useState(false);

    return (
        <section className={style.testSection}>
            <h2 className={style.questionTitle}>{title}</h2>
            <div className={style.sliderContainer}>
                <div className={style.sliderWrapper}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className={style.slider}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onTouchStart={() => setIsDragging(true)}
                        onTouchEnd={() => setIsDragging(false)}
                    />
                    <div className={style.sliderLabels}>
                        <span className={style.minLabel}>{labels.min}</span>
                        <span className={style.midLabel}>{labels.mid}</span>
                        <span className={style.maxLabel}>{labels.max}</span>
                    </div>
                </div>

                <div className={`${style.scoreDisplay} ${isDragging ? style.active : ''}`}>
                    {value}
                </div>

                <div className={style.scoreIndicator}>
                    <span className={style.indicatorText}>
                        {value < 30 ? "낮음" : value < 70 ? "보통" : "높음"}
                    </span>
                </div>
            </div>
        </section>
    );
};