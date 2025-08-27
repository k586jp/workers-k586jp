async function fetchJson() {

    const url = 'https://api.k586.jp/article/';
    const response = await fetch(url);
    const json = await response.json();

    return json;

}