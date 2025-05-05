document.addEventListener('DOMContentLoaded', () => {
    // スムーススクロールさせたいリンクを全て取得 (hrefが#で始まるもの)
    // もしくは特定のクラス名を付与する: document.querySelectorAll('.smooth-scroll-link');
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
    // 固定ヘッダーの高さを取得（存在しない場合は0）
    // header要素のクラス名に合わせて調整してください
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 0;
  
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
        // デフォルトのページ内ジャンプ動作を停止
        e.preventDefault();
  
        const href = link.getAttribute('href');
        let targetElement;
  
        // hrefが "#" または "#top" の場合はページのトップへ
        if (href === '#' || href === '#top') {
          targetElement = document.documentElement; // または document.body
        } else {
            // hrefから "#" を除いたIDを持つ要素を取得
            const targetId = href.substring(1);
            targetElement = document.getElementById(targetId);
        }
  
        // ターゲット要素が見つかった場合のみスクロール
        if (targetElement) {
            // ターゲット要素の上端の座標を取得
            const elementPosition = targetElement.getBoundingClientRect().top;
    
            // 現在のスクロール量 + ターゲット要素の相対位置 - ヘッダーの高さを計算
            const offsetPosition = window.pageYOffset + elementPosition - headerHeight;

            // スムーズスクロールを実行
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            } else {
            console.warn(`ターゲット要素が見つかりません: ${href}`);
            // 見つからない場合の代替動作（例：通常のジャンプを許可）
            // window.location.hash = href;
            }
        });
    });
});