document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const globalNav = document.querySelector('.global-nav');
    const body = document.body;

    if (hamburgerButton && globalNav) {
        // ハンバーガーボタンのクリックイベント
        hamburgerButton.addEventListener('click', function() {
            toggleMenu();
        });

        // (オプション) ナビゲーションの外側をクリックしたら閉じる
        document.addEventListener('click', function(event) {
            // メニューが開いていて、クリックがボタンとナビゲーションの外側だった場合
            if (
                globalNav.classList.contains('is-active') &&
                !hamburgerButton.contains(event.target) &&
                !globalNav.contains(event.target)
            ) {
                toggleMenu(); // メニューを閉じる
            }
        });

        // (オプション) ナビゲーション内のリンクをクリックしたら閉じる
        const navLinks = globalNav.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (globalNav.classList.contains('is-active')) {
                    toggleMenu(); // メニューを閉じる
                }
            });
        });

        // (オプション) Escキーでメニューを閉じる
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && globalNav.classList.contains('is-active')) {
                toggleMenu(); // メニューを閉じる
            }
        });
    }

    // メニューの開閉処理をまとめた関数
    function toggleMenu() {
        const isActive = hamburgerButton.classList.toggle('is-active'); // is-activeクラスをトグルし、結果をisActiveに格納
        globalNav.classList.toggle('is-active');
        body.classList.toggle('is-menu-open'); // bodyにクラスをトグル（オーバーレイとスクロール固定用）

        // ARIA属性を更新
        hamburgerButton.setAttribute('aria-expanded', String(isActive)); // isActiveはbooleanなのでString()で文字列に変換
        globalNav.setAttribute('aria-hidden', String(!isActive));
    }
});