document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('img.lazyload');

    if ("IntersectionObserver" in window) { // IntersectionObserverが利用可能かチェック
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                // isIntersecting で要素がビューポート内に入ったか判定
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    // data-src 属性から実際の画像URLを取得して src 属性に設定
                    lazyImage.src = lazyImage.dataset.src;

                    // (オプション) srcset も使用している場合
                    // if (lazyImage.dataset.srcset) {
                    //     lazyImage.srcset = lazyImage.dataset.srcset;
                    // }

                    lazyImage.classList.remove('lazyload'); // lazyloadクラスを削除(任意)
                    lazyImage.classList.add('loaded');    // 読み込み完了クラスを追加(任意)

                    // 一度読み込んだら、その画像の監視は停止する
                    observer.unobserve(lazyImage);
                }
            });
        }, {
            // (オプション) どのくらい表示領域に入ったら読み込むかを指定
            // rootMargin: "0px 0px -50px 0px" // 例: 画面下部より50px手前で読み込み開始
            // threshold: 0.01 // 例: 1%でも表示されたら
        });

        // 各遅延読み込み画像を監視対象に追加
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });

    } else {
        // IntersectionObserver がサポートされていない場合のフォールバック処理 (任意)
        // 例: すべての画像を即時読み込み
        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            // if (lazyImage.dataset.srcset) { lazyImage.srcset = lazyImage.dataset.srcset; }
            lazyImage.classList.remove('lazyload');
            lazyImage.classList.add('loaded');
        });
        console.warn("IntersectionObserver is not supported. Falling back to immediate loading.");
    }
});