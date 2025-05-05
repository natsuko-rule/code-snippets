document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const globalNav = document.getElementById('global-nav');
    const body = document.body;
    const accordionTriggers = document.querySelectorAll('.accordion-menu-trigger');

    // --- ハンバーガーメニュー開閉 ---
    if (hamburgerButton && globalNav) {
        hamburgerButton.addEventListener('click', function() {
            const isActive = this.classList.toggle('is-menu-active');
            globalNav.classList.toggle('is-menu-active');
            body.classList.toggle('is-menu-open'); // オーバーレイとスクロール固定用

            this.setAttribute('aria-expanded', String(isActive));
            globalNav.setAttribute('aria-hidden', String(!isActive));

            // メニューを閉じるときに、開いているアコーディオンも閉じる (任意)
            if (!isActive) {
                closeAllAccordions();
            }
        });

        // (オプション) メニュー外クリックで閉じる
        document.addEventListener('click', function(event) {
            if (
                globalNav.classList.contains('is-menu-active') &&
                !hamburgerButton.contains(event.target) &&
                !globalNav.contains(event.target)
            ) {
                closeHamburgerMenu();
            }
        });

        // (オプション) Escキーで閉じる
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && globalNav.classList.contains('is-menu-active')) {
                closeHamburgerMenu();
            }
        });
    }

    function closeHamburgerMenu() {
        hamburgerButton.classList.remove('is-menu-active');
        globalNav.classList.remove('is-menu-active');
        body.classList.remove('is-menu-open');
        hamburgerButton.setAttribute('aria-expanded', 'false');
        globalNav.setAttribute('aria-hidden', 'true');
        closeAllAccordions(); // メニュー閉じたらアコーディオンも閉じる
    }

    function closeAllAccordions() {
        accordionTriggers.forEach(trigger => {
            const content = document.getElementById(trigger.getAttribute('aria-controls'));
            if (trigger.getAttribute('aria-expanded') === 'true' && content) {
                trigger.setAttribute('aria-expanded', 'false');
                content.hidden = true;
                content.style.maxHeight = null;
            }
        });
    }

    // --- アコーディオン開閉 ---
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            // event.stopPropagation(); // 必要に応じてイベント伝播を停止

            const targetSubmenuId = this.getAttribute('aria-controls');
            const targetSubmenu = document.getElementById(targetSubmenuId);
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            if (!targetSubmenu) return;

            // クリックされたアコーディオンの開閉
            this.setAttribute('aria-expanded', !isExpanded);
            targetSubmenu.hidden = isExpanded;

            if (!isExpanded) {
                // 開く: scrollHeightで高さを取得
                targetSubmenu.style.maxHeight = targetSubmenu.scrollHeight + 'px';
            } else {
                // 閉じる: nullに戻す
                targetSubmenu.style.maxHeight = null;
            }

            // (オプション) 他のアコーディオンを閉じる場合
            /*
            accordionTriggers.forEach(otherTrigger => {
                if (otherTrigger !== this && otherTrigger.getAttribute('aria-expanded') === 'true') {
                    const otherSubmenu = document.getElementById(otherTrigger.getAttribute('aria-controls'));
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    if (otherSubmenu) {
                        otherSubmenu.hidden = true;
                        otherSubmenu.style.maxHeight = null;
                    }
                }
            });
            */
        });
    });

    // (オプション) ナビゲーション内の通常のリンクをクリックしたらメニューを閉じる
    const navLinks = globalNav.querySelectorAll('a');
    navLinks.forEach(link => {
        // アコーディオンのトリガーではない通常のリンクのみを対象とする場合
        if (!link.closest('.menu-item-has-children')) {
            link.addEventListener('click', () => {
                if (globalNav.classList.contains('is-menu-active')) {
                    closeHamburgerMenu();
                }
            });
        }
        // サブメニュー内のリンクをクリックした場合もメニューを閉じる
        if (link.closest('.submenu')) {
            link.addEventListener('click', () => {
                if (globalNav.classList.contains('is-menu-active')) {
                    closeHamburgerMenu();
                }
            });
        }
    });

});