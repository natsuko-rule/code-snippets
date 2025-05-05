document.addEventListener('DOMContentLoaded', function () {
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    const accordionContainer = document.querySelector('.accordion-container'); // オプション用

    // オプション: 一つ開いたら他を閉じるか (true: 閉じる, false: 閉じない)
    const closeOthers = true;

    accordionTriggers.forEach(trigger => {
        // 初期状態で関連コンテンツにmax-heightを設定 (CSSで固定値を使わない場合)
        const content = document.getElementById(trigger.getAttribute('aria-controls'));
        if (content && trigger.getAttribute('aria-expanded') === 'false') {
             // 初期状態ではmaxHeightをセットしないか、0pxにする
             // content.style.maxHeight = '0px'; // CSS側でmax-height: 0をしているので不要かも
        } else if (content) {
             // 初期状態で開いている場合（稀ですが）
             // content.style.maxHeight = content.scrollHeight + 'px';
        }


        trigger.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const currentContent = document.getElementById(this.getAttribute('aria-controls'));

            if (!currentContent) return;

            // オプション: 他のアコーディオンを閉じる処理
            if (closeOthers && !isExpanded) { // これから開く場合にのみ他を閉じる
                accordionContainer.querySelectorAll('.accordion-item').forEach(item => {
                    const otherTrigger = item.querySelector('.accordion-trigger');
                    const otherContent = item.querySelector('.accordion-content');
                    if (otherTrigger !== this && otherTrigger.getAttribute('aria-expanded') === 'true') {
                        otherTrigger.setAttribute('aria-expanded', 'false');
                        otherContent.style.maxHeight = null; // nullに戻してCSSのmax-height: 0を適用
                        otherContent.hidden = true; // hidden属性も設定
                    }
                });
            }

            // クリックされたアコーディオンの開閉
            this.setAttribute('aria-expanded', !isExpanded);
            currentContent.hidden = isExpanded; // isExpandedがtrueならhidden=true（閉じる）

            // max-height をJSで制御してアニメーションさせる場合
            if (!isExpanded) {
                // 開く: scrollHeightで実際の高さを取得して設定
                currentContent.style.maxHeight = currentContent.scrollHeight + 'px';
            } else {
                // 閉じる: null に戻してCSSのmax-height: 0を適用
                currentContent.style.maxHeight = null;
            }
        });
    });
});