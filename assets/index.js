async function fetchJson() {

    const list_url = 'https://api.k586.jp/article/?title=1';
    const list_response = await fetch(list_url);
    const list_json = await list_response.json();

    const list_length = list_json.length;
    const list_array = [];
    for (let i = 0; i < list_length; i++) {

        const article = list_json[i];
        list_array.push('<a href="/article/' + article.id + '">[' + article.created_at + ']  ' + article.title + '</a>');

    }
    const list = list_array.join('<br>\n');

    const prof_url = 'https://api.k586.jp/article/id.php';
    const prof_headers = {
        'Content-Type': 'application/json; charset=UTF-8'
    };
    const prof_body = {
        id: 'profile'
    };
    const prof_request = {
        method: 'POST',
        headers: prof_headers,
        body: JSON.stringify(prof_body)
    };
    const prof_response = await fetch(prof_url, prof_request);
    const prof_json = await prof_response.json();

    return [ { created_at: '1970-01-01 00:00:00', title: '新着日記', text: list }, prof_json ];

}