import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import style from "../../style/test.module.scss";

interface TestProps {
    onBack: () => void;
    onNext: (score: number) => void;
}

export function Test({ onBack, onNext }: TestProps) {
    const [score, setScore] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScore(Number(e.target.value));
    };

    return (
        <div className={style.container}>
            {/* 상단 헤더 */}
            <header className={style.header}>
                <div className={style.headerContent}>
                    <button
                        className={style.backButton}
                        onClick={onBack}
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className={style.pageTitle}>오늘 뭐먹을까?</h1>
                </div>
            </header>

            {/* 메인 콘텐츠 */}
            <main className={style.mainContent}>
                <section className={style.testSection}>
                    <h2 className={style.questionTitle}>
                        얼마나 피곤하신가요?
                    </h2>

                    <div className={style.sliderContainer}>
                        <div className={style.sliderWrapper}>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={score}
                                onChange={handleSliderChange}
                                className={style.slider}
                                onMouseDown={() => setIsDragging(true)}
                                onMouseUp={() => setIsDragging(false)}
                                onTouchStart={() => setIsDragging(true)}
                                onTouchEnd={() => setIsDragging(false)}
                            />
                            <div className={style.sliderLabels}>
                                <span>0</span>
                                <span>50</span>
                                <span>100</span>
                            </div>
                        </div>

                        <div className={`${style.scoreDisplay} ${isDragging ? style.active : ''}`}>
                            {score}
                        </div>

                        <div className={style.scoreDescription}>
                            {score <= 30 && "상쾌하시네요!"}
                            {score > 30 && score <= 70 && "적당히 피곤하시군요"}
                            {score > 70 && "무슨일이 있나요..?"}
                        </div>
                    </div>

                    <button
                        className={style.nextButton}
                        onClick={() => onNext(score)}
                    >
                        다음
                    </button>
                </section>
            </main>
        </div>
    );
}