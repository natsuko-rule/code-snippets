// 要素を取得
const pageTopButton = document.getElementById('pageTopButton');

// スクロール量に応じてボタンを表示/非表示する関数
function togglePageTopButton() {
  // スクロール量が画面の高さの半分を超えたら表示
  // window.innerHeight はビューポートの高さ
  // window.scrollY は垂直方向のスクロール量
    if (window.scrollY > window.innerHeight / 2) {
        pageTopButton.classList.add('is-visible'); // 表示用クラスを追加
    } else {
        pageTopButton.classList.remove('is-visible'); // 表示用クラスを削除
    }
}

// スムーズにページトップへスクロールする関数
function scrollToTop() {
    window.scrollTo({
        top: 0,             // ページの一番上へ
        behavior: 'smooth' // スムーズスクロールを実行
    });
}

// スクロールイベントを監視
window.addEventListener('scroll', togglePageTopButton);

// ボタンのクリックイベントを監視
pageTopButton.addEventListener('click', function(event) {
    event.preventDefault(); // aタグのデフォルトの挙動（#へのジャンプ）をキャンセル
    scrollToTop();
});

// 初期表示チェック（リロード時に既にスクロールされている場合のため）
togglePageTopButton();