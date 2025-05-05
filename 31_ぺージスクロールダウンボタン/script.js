document.addEventListener('DOMContentLoaded', function() {
    // スクロールダウン矢印のリンクを取得
    const scrollDownLink = document.querySelector('.scroll-down-arrow');

    if (scrollDownLink) {
        scrollDownLink.addEventListener('click', function(event) {
        event.preventDefault(); // デフォルトのアンカー動作をキャンセル

        const targetId = this.getAttribute('href'); // href属性値 (#next-section) を取得
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // スムーズスクロールを実行
            targetElement.scrollIntoView({
                behavior: 'smooth', // スムーズスクロール
                block: 'start'      // ターゲット要素の上端をビューポートの上端に合わせる
            });
        }
    });

    // --- オプション: ある程度スクロールしたら矢印を非表示にする ---
    function hideArrowOnScroll() {
        // 例: 100px以上スクロールしたら非表示クラスを追加
        if (window.scrollY > 100) {
            scrollDownLink.style.opacity = '0';
            scrollDownLink.style.visibility = 'hidden';
            scrollDownLink.style.pointerEvents = 'none'; // クリックも無効化
            // CSSクラスで管理する方がより良い
            // scrollDownLink.classList.add('is-hidden');
            } else {
            scrollDownLink.style.opacity = '1';
            scrollDownLink.style.visibility = 'visible';
            scrollDownLink.style.pointerEvents = 'auto';
            // scrollDownLink.classList.remove('is-hidden');
        }
    }

    // スクロールイベントでチェック
    window.addEventListener('scroll', hideArrowOnScroll);
    // 初期状態チェック
    hideArrowOnScroll();

    // 非表示用のCSSクラスを追加する場合 (推奨)
    /*
    CSSに以下を追加:
    .scroll-down-arrow.is-hidden {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        }
      */
    }
});