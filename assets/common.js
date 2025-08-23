/**
 * MAIN
 * @returns {Promise<void>}
 */
async function main() {

    const mainContents = document.getElementById('main');
    const df = await makeDocumentFragment();
    mainContents.textContent = '';
    mainContents.appendChild(df);

    Prism.highlightAll();
    mermaid.initialize({ securityLevel: 'loose', theme: 'dark' });
    mermaid.init(undefined, document.getElementsByClassName('language-mermaid'));

}
main().catch(console.error);

/* ################################################################ */

/**
 * メインコンテンツの DocumentFragment を生成
 * @returns {Promise<DocumentFragment>}
 */
async function makeDocumentFragment() {

    const df = document.createDocumentFragment();
    const doc = document.createElement('div');

    marked.use({ renderer: { code: appendClass } });
    marked.setOptions({ breaks: true });
    doc.innerHTML = marked.parse(await fetchJson());

    df.appendChild(doc);
    return df;

}

/**
 * イベントリスナーを Promise 化
 * @param eventTarget イベントのターゲット
 * @param eventName イベントの種類
 * @returns {Promise<unknown>} イベント
 */
function addEventListenerPromise(eventTarget, eventName) {

    return new Promise(function (resolve) {
        eventTarget.addEventListener(eventName, function (event) { resolve(event); }, false);
    });

}

/**
 * コードエリアへ Class を追加
 * @param code コードの種類
 * @returns {string} 変換後の HTML
 */
function appendClass(code) {

    if (code.lang === 'mermaid' || code.lang === 'Mermaid') {
        return '<pre class="language-mermaid">' + code.text + '</pre>';
    } else {
        return '<pre><code class="language-' + code.lang + ' line-numbers">' + code.text + '</code></pre>';
    }

}