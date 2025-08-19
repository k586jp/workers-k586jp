async function main() {

    const addDiary = document.getElementById('main');
    const df = document.createDocumentFragment();

    const text = await importTextFile('main.md');
    const doc = document.createElement('div');

    marked.use({ renderer: { code: addMermaidClass } });
    marked.setOptions({ breaks: true });
    doc.innerHTML = marked.parse(text);

    df.appendChild(doc);
    addDiary.appendChild(df);

    Prism.highlightAll();
    mermaid.initialize({ securityLevel: 'loose', theme: 'neutral' });
    mermaid.init(undefined, document.getElementsByClassName('language-mermaid'));
}
main().catch(console.error);


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

async function importTextFile(filename) {

    const file = await fetch(filename);
    return await file.text();

}

function addMermaidClass(code) {
    if (code.lang === 'mermaid') {
        return '<pre class="language-mermaid">' + code.text + '</pre>';
    } else {
        return '<pre><code class="language-' + code.lang + ' line-numbers">' + code.text + '</code></pre>';
    }
}