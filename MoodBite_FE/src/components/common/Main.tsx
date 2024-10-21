import style from "../../style/testExecuted.module.scss";

export function Main() {
    return(
        <>
            <div className={style.container}>
                <header className={style.header}>
                    <div className={style.logo}>로고</div>
                    <div className={style.menu}>
                        <span>아 점심 뭐먹지..?</span>
                        <button className={style.hamburgerMenu}>햄버거메뉴</button>
                    </div>
                </header>

                <nav className={style.nav}>
                    <ul className={style.category}>
                        <li>근처 식당 찾아보기</li>
                        <li>한식</li>
                        <li>중식</li>
                        <li>...</li>
                    </ul>
                </nav>

                <main className={style.mainContent}>
                    <div className={style.mapSection}>
                        <div className={style.map}>지도</div>
                    </div>
                    <div className={style.recommendSection}>
                        <div className={style.recommendTitle}>내 취향 점심 추천받기</div>
                        <div className={style.image}>이미지</div>
                    </div>
                </main>

                <aside className={style.components}>
                    <div className={style.component1}>컴포넌트 1</div>
                    <div className={style.component2}>컴포넌트 2</div>
                </aside>
            </div>
        </>
    )
}