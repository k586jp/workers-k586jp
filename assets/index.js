async function fetchJson() {

    const file = await fetch('main.md');
    return await file.text();

}