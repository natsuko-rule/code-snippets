document.addEventListener('DOMContentLoaded', function() {
    const tocContainer = document.getElementById('toc-list-container');
    // 目次を生成する見出し要素を取得 (例: article内のh2とh3)
    const headings = document.querySelectorAll('#main-content h2, #main-content h3');
    let currentList = document.createElement('ol'); // 最初はol要素
    tocContainer.appendChild(currentList);
    let currentLevel = 2; // 開始レベル (h2)
    let counter = 0; // ID生成用カウンター

    headings.forEach(heading => {
        // 目次のタイトル自体は除外
        if (heading.closest('.toc')) {
            return;
    }

        const level = parseInt(heading.tagName.substring(1)); // h2 -> 2, h3 -> 3

        // IDがなければ自動で付与
        if (!heading.id) {
        heading.id = 'toc-heading-' + counter++;
        }

        // リスト項目の作成
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        listItem.appendChild(link);
    
        // 階層レベルの調整
        if (level > currentLevel) {
        // レベルが深くなった場合: 新しいネストリストを作成
        const newList = document.createElement('ol'); // または 'ul'
        // 直前のリスト項目の子として新しいリストを追加
        if(currentList.lastChild) {
            currentList.lastChild.appendChild(newList);
            currentList = newList; // 現在のリストを新しいリストに更新
        } else {
            // もし直前のリスト項目がなければ（通常はありえないが念のため）
            currentList.appendChild(newList);
            currentList = newList;
        }
        } else if (level < currentLevel) {
        // レベルが浅くなった場合: 親リストに戻る
        for (let i = 0; i < currentLevel - level; i++) {
          // 親の ol/ul 要素に移動する
            if(currentList.parentElement && currentList.parentElement.closest('ol, ul')) {
                currentList = currentList.parentElement.closest('ol, ul');
            }
        }
    }
        // 同じレベルの場合はそのまま追加
    
        currentList.appendChild(listItem);
        currentLevel = level; // 現在のレベルを更新
    });

    // 目次が空の場合は非表示にする（任意）
    if (!tocContainer.hasChildNodes() || !tocContainer.querySelector('li')) {
        const tocNav = tocContainer.closest('.toc');
        if (tocNav) {
            tocNav.style.display = 'none';
        }
    }
});