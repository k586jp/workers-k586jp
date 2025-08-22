/**
 * MAIN
 * @returns {Promise<void>}
 */
async function main() {

    const addMain = document.getElementById('main');
    const df = await makeDocumentFragment();
    addMain.appendChild(df);

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
    const text = await importTextFile('main.md');
    const doc = document.createElement('div');

    marked.use({ renderer: { code: addMermaidClass } });
    marked.setOptions({ breaks: true });
    doc.innerHTML = marked.parse(text);

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
 * テキストファイルをインポート
 * @param filename ファイル名
 * @returns {Promise<string>} テキスト
 */
async function importTextFile(filename) {

    const file = await fetch(filename);
    return await file.text();

}

/**
 * コードエリアに Class を指定
 * @param code コードの種類
 * @returns {string} 変換後の HTML
 */
function addMermaidClass(code) {

    if (code.lang === 'mermaid' || code.lang === 'Mermaid') {
        return '<pre class="language-mermaid">' + code.text + '</pre>';
    } else {
        return '<pre><code class="language-' + code.lang + ' line-numbers">' + code.text + '</code></pre>';
    }

}