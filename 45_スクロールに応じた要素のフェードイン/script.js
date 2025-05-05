document.addEventListener('DOMContentLoaded', () => {
    // アニメーションさせたい要素をすべて取得
    const targets = document.querySelectorAll('.scroll-animation-target');

    // Intersection Observer のオプション設定
    const options = {
        root: null,
        rootMargin: '0px 0px -20% 0px', // ビューポートの下端から20%内側でトリガー
        threshold: 0
    };

    // Intersection Observer のコールバック関数
    const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // is-visibleクラスを付与
            entry.target.classList.add('is-visible');
            // animation-hiddenクラスを削除
            entry.target.classList.remove('animation-hidden');
            // 監視を停止
            observer.unobserve(entry.target);
            }
        });
    };

    // Intersection Observer のインスタンスを作成
    const observer = new IntersectionObserver(callback, options);

    // 各ターゲット要素を監視対象に追加
    targets.forEach(target => {
        // animation-hidden クラスを持つ要素のみ監視
        if (target.classList.contains('animation-hidden')) {
            observer.observe(target);
        }
    });
});