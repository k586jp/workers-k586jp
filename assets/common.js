/**
 * MAIN
 * @returns {Promise<void>}
 */
async function main() {

    const timeFormat = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }
    const timeArray = document.getElementsByTagName('time');
    const length = timeArray.length;
    for (let i = 0; i < length; i++) {
        const utc = new Date(timeArray[i].getAttribute('datetime'));
        timeArray[i].textContent = utc.toLocaleString(undefined, timeFormat);
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
        eventTarget.addEventListener(eventName, function (event) { resolve(event); }, { once: true });
    });

}
