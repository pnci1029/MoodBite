import style from "../../style/testExecuted.module.scss";
import React, { useState } from 'react';
import { Menu, X, MapPin, Heart, User } from 'lucide-react';

export function Main() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={style.container}>
            {/* 상단 헤더 */}
            <header className={style.header}>
                <div className={style.headerContent}>
                    <h1 className={style.logo}>오늘의 한끼</h1>
                    <button
                        className={style.menuButton}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* 메인 콘텐츠 */}
            <main className={style.mainContent}>
                {/* 기분 선택 섹션 */}
                <section className={style.moodSection}>
                    <h2 className={style.sectionTitle}>지금 당신의 기분은?</h2>
                    <div className={style.moodGrid}>
                        <button className={style.moodButton}>😊 행복해요</button>
                        <button className={style.moodButton}>😔 우울해요</button>
                        <button className={style.moodButton}>😫 피곤해요</button>
                        <button className={style.moodButton}>😡 화나요</button>
                        <button className={style.moodButton}>🤔 고민중이에요</button>
                        <button className={style.moodButton}>🥳 신나요</button>
                    </div>
                </section>

                {/* 추천 음식 섹션 */}
                <section className={style.foodSection}>
                    <h2 className={style.sectionTitle}>이런 음식은 어떠세요?</h2>
                    <div className={style.foodCards}>
                        <div className={style.foodCard}>
                            <div className={style.foodImage}></div>
                            <div className={style.foodInfo}>
                                <h3>따뜻한 국밥</h3>
                                <p>피곤한 당신을 위한 든든한 한 끼</p>
                            </div>
                        </div>
                        {/* 추가 음식 카드들... */}
                    </div>
                </section>
            </main>

            {/* 하단 네비게이션 */}
            <nav className={style.bottomNav}>
                <button className={style.navButton}>
                    <MapPin size={24} />
                    <span>주변맛집</span>
                </button>
                <button className={style.navButton}>
                    <Heart size={24} />
                    <span>찜목록</span>
                </button>
                <button className={style.navButton}>
                    <User size={24} />
                    <span>마이</span>
                </button>
            </nav>

            {/* 사이드 메뉴 */}
            {isMenuOpen && (
                <div className={style.sideMenu}>
                    <div className={style.menuHeader}>
                        <h2>메뉴</h2>
                        <button
                            className={style.closeButton}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <ul className={style.menuList}>
                        <li>공지사항</li>
                        <li>설정</li>
                        <li>고객센터</li>
                        <li>앱 정보</li>
                    </ul>
                </div>
            )}
        </div>
    );
}