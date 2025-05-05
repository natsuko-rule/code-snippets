document.addEventListener('DOMContentLoaded', function () {
    const tabsContainer = document.querySelector('.tabs-container'); // 複数のタブUIに対応する場合はクラスなどで絞り込む
    if (!tabsContainer) return; // コンテナがなければ終了

    const tabButtons = tabsContainer.querySelectorAll('.tab-button');
    const tabPanels = tabsContainer.querySelectorAll('.tab-panel');

    // 初期状態でアクティブなタブ以外のパネルを非表示にする（念のため）
    tabPanels.forEach(panel => {
        if (!panel.hasAttribute('hidden')) {
            const correspondingButton = tabsContainer.querySelector(`[aria-controls="${panel.id}"]`);
            if (!correspondingButton || correspondingButton.getAttribute('aria-selected') !== 'true') {
                panel.hidden = true;
            }
        }
    });

    // 各タブボタンにクリックイベントを追加
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // すでにアクティブなタブをクリックした場合は何もしない (任意)
            if (this.getAttribute('aria-selected') === 'true') {
                return;
            }

            // 1. すべてのタブボタンを非アクティブにする
            tabButtons.forEach(btn => {
                btn.setAttribute('aria-selected', 'false');
                btn.tabIndex = -1; // 非アクティブなタブはTabキーフォーカスから除外
            });

            // 2. すべてのタブパネルを非表示にする
            tabPanels.forEach(panel => {
                panel.hidden = true;
            });

            // 3. クリックされたタブボタンをアクティブにする
            this.setAttribute('aria-selected', 'true');
            this.tabIndex = 0; // アクティブなタブはTabキーフォーカス可能に

            // 4. 対応するタブパネルを表示する
            const targetPanelId = this.getAttribute('aria-controls');
            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) {
                targetPanel.hidden = false;
                // (オプション) 必要ならパネル表示時の処理を追加
            }

            // (オプション) フォーカスをタブボタン自体に戻す
            // this.focus();
        });
    });

    // (オプション) キーボード操作対応（左右矢印キーでのタブ移動）
    // より複雑になるため、ここでは省略しますが、必要に応じて実装します。
    // 参考: https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/tab_role
});