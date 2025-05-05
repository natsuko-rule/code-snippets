document.addEventListener('DOMContentLoaded', function() {
    const openButtons = document.querySelectorAll('.modal-open-button'); // 全ての開くボタンを取得
    const closeElements = document.querySelectorAll('[data-modal-close]'); // 閉じる機能を持つ要素を全て取得
    const body = document.body;
    let previouslyFocusedElement = null; // モーダルを開く前にフォーカスされていた要素

    // モーダルを開く関数
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return; // 対象モーダルがなければ終了

        previouslyFocusedElement = document.activeElement; // 現在フォーカスされている要素を保存

        modal.classList.add('is-visible');
        modal.setAttribute('aria-hidden', 'false');
        body.classList.add('modal-open'); // 背景スクロール禁止

        // モーダル内の最初のフォーカス可能な要素にフォーカスを当てる（オプション）
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }

        // Escキーで閉じるイベントリスナーを追加
        document.addEventListener('keydown', handleEscKey);
    }

    // モーダルを閉じる関数
    function closeModal(modal) {
        if (!modal || !modal.classList.contains('is-visible')) return; // モーダルが存在しないか、表示されていなければ終了

        modal.classList.remove('is-visible');
        modal.setAttribute('aria-hidden', 'true');
        body.classList.remove('modal-open'); // 背景スクロール禁止を解除

        // Escキーのイベントリスナーを削除
        document.removeEventListener('keydown', handleEscKey);

        // モーダルを開く前にフォーカスされていた要素に戻す
        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
            previouslyFocusedElement = null; // リセット
        }
    }

    // Escキーが押された時の処理
    function handleEscKey(event) {
        if (event.key === 'Escape') {
            const visibleModal = document.querySelector('.modal-container.is-visible');
            if (visibleModal) {
                closeModal(visibleModal);
            }
        }
    }

    // --- イベントリスナーの設定 ---

    // 全ての「開く」ボタンにイベントリスナーを設定
    openButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-target');
            openModal(modalId);
        });
    });

    // 全ての「閉じる」要素（ボタン、オーバーレイ）にイベントリスナーを設定
    closeElements.forEach(element => {
        element.addEventListener('click', function() {
            // 最も近い .modal-container を探して閉じる
            const modal = this.closest('.modal-container');
            closeModal(modal);
        });
    });

});