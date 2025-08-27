import { Hono, Context as c } from 'hono';

function main() {

    const app = new Hono();
    const page = new Hono();

    page.get('/', indexHtml);
    page.get('/article/', articleListHtml);
    page.get('/article/:id', articleHtml);

    app.route('/', page);

    return app;

}
export default main();

// ################################################################

async function indexHtml(context: c) {
    const html = htmlText(context, '/index.js');
    return context.html(html);
}

async function articleListHtml(context: c) {
    const html = htmlText(context, '/article.js');
    return context.html(html);
}

async function articleHtml(context: c) {
    const html = htmlText(context, '/id.js');
    return context.html(html);
}

// ================================================================

async function htmlText(context: c, jsFile: string) {
    const array: Promise<string>[] = [];
    array.push(fetchURL(context, '/main.html'));
    array.push(fetchURL(context, '/bottom.html'));
    const result = await Promise.all(array);
    return result[0] + '<script src="' + jsFile + '"></script>' + result[1];
}

async function fetchURL(context: c, page: string) {
    const url = new URL(page, 'https://example.com');
    const file = await context.env.ASSETS.fetch(url);
    return await file.text();
}