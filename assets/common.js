/**
 * MAIN
 * @returns {Promise<void>}
 */
async function main() {

    const ev = await addEventListenerPromise(document, 'DOMContentLoaded');
    const timeArray = ev.getElementsByTagName('time');
    const length = timeArray.length;
    for (let i = 0; i < length; i++) {
        const utc = new Date(timeArray[i].getAttribute('datetime'));
        console.log(utc.toLocaleString());
    }

    Prism.highlightAll();
    mermaid.initialize({ securityLevel: 'loose', theme: 'dark' });
    mermaid.init(undefined, document.getElementsByClassName('language-mermaid'));

}
main().catch(console.error);

/* ################################################################ */

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
