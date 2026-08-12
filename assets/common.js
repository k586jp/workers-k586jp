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

    const mermaidArray = document.getElementsByClassName('language-mermaid');
    if (mermaidArray.length > 0) {
        await loadScript('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js');
        window.mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme: 'dark' });
        await window.mermaid.run({ nodes: document.getElementsByClassName('language-mermaid') });
    }

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

function loadScript(src) {
    return new Promise(function (resolve, reject) {
        const scriptArray = document.getElementsByTagName('script');
        const createScriptElement = document.createElement('script');
        createScriptElement.src = src;
        createScriptElement.nonce = scriptArray[0].getAttribute('nonce');
        createScriptElement.onload = resolve;
        createScriptElement.onerror = reject;
        document.head.appendChild(createScriptElement);
    });
}
