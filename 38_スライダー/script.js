document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.getElementById('mySlider'); // スライダーのIDを指定
    if (!sliderContainer) return; // スライダー要素がなければ処理を終了

    const sliderList = sliderContainer.querySelector('.slider-list');
    const sliderItems = sliderContainer.querySelectorAll('.slider-item');
    const prevButton = sliderContainer.querySelector('.slider-button.prev');
    const nextButton = sliderContainer.querySelector('.slider-button.next');
    const paginationContainer = sliderContainer.querySelector('.slider-pagination');

    let currentIndex = 0; // 現在表示しているスライドのインデックス (0から始まる)
    const itemCount = sliderItems.length; // スライドの総数
    let itemWidth = sliderItems[0].clientWidth; // 1つのスライドの幅（初期値）
    let paginationDots = []; // ページネーションのドット要素を格納する配列

    // --- 初期設定 ---

    // スライドリストの幅を計算して設定（重要）
    function updateSliderWidth() {
        itemWidth = sliderItems[0].clientWidth; // ウィンドウリサイズ時に再取得
        sliderList.style.width = `${itemWidth * itemCount}px`;
        // 現在のスライド位置も再計算して適用
        sliderList.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    // ナビゲーションボタンの状態を更新
    function updateButtons() {
        if (!prevButton || !nextButton) return;
        // 最初なら「前へ」を無効化
        prevButton.classList.toggle('disabled', currentIndex === 0);
        // 最後なら「次へ」を無効化
        nextButton.classList.toggle('disabled', currentIndex === itemCount - 1);
    }

    // ページネーションを生成・更新
    function setupPagination() {
        if (!paginationContainer || itemCount <= 1) { // スライドが1つ以下ならページネーション不要
             if (paginationContainer) paginationContainer.style.display = 'none';
             return;
        }
        paginationContainer.innerHTML = ''; // 中身をクリア
        paginationDots = []; // 配列もクリア

        for (let i = 0; i < itemCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('pagination-dot');
            dot.setAttribute('aria-label', `スライド ${i + 1} へ移動`);
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            paginationContainer.appendChild(dot);
            paginationDots.push(dot); // 配列に追加
        }
        updatePagination(); // 初期のアクティブ状態を設定
    }

    // アクティブなページネーションドットを更新
    function updatePagination() {
        if (!paginationContainer || paginationDots.length === 0) return;
        paginationDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // 指定したインデックスのスライドへ移動
    function goToSlide(index) {
        if (index < 0 || index >= itemCount) return; // 範囲外なら何もしない

        currentIndex = index;
        const offset = -currentIndex * itemWidth;
        sliderList.style.transform = `translateX(${offset}px)`;

        updateButtons();
        updatePagination();
    }

    // --- イベントリスナー ---

    // 「次へ」ボタン
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentIndex < itemCount - 1) {
                goToSlide(currentIndex + 1);
            }
        });
    }

    // 「前へ」ボタン
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        });
    }

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', () => {
        // リサイズ完了後に幅を再計算（debounce的な簡易処理）
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateSliderWidth();
        }, 250); // 250ミリ秒待って実行
    });
    let resizeTimer;


    // --- 初期化実行 ---
    if (itemCount > 0) {
        updateSliderWidth(); // スライド幅計算
        setupPagination(); // ページネーション生成
        updateButtons(); // ボタン状態更新
        sliderList.style.transition = 'transform 0.4s ease-in-out'; // JSでの計算後にtransitionを設定
    } else {
        // スライドがない場合の処理（ボタンなどを隠す）
        if(prevButton) prevButton.style.display = 'none';
        if(nextButton) nextButton.style.display = 'none';
        if(paginationContainer) paginationContainer.style.display = 'none';
    }
});