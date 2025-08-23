import { Hono, Context as c } from 'hono';

function main() {

    const app = new Hono();
    const page = new Hono();

    page.get('/', indexHtml);
    page.get('/article/', articleHtml);

    app.route('/', page);

    return app;

}
export default main();


async function indexHtml(context: c) {
    const html = htmlText(context, '/index.js');
    return context.html(html);
}

async function articleHtml(context: c) {
    const html = htmlText(context, '/article.js');
    return context.html(html);
}

async function htmlText(context: c, jsFile: string) {
    const main_url = new URL('/main.html', 'https://example.com');
    const main_file = await context.env.ASSETS.fetch(main_url);
    const main_text = await main_file.text();
    const bottom_url = new URL('/bottom.html', 'https://example.com');
    const bottom_file = await context.env.ASSETS.fetch(bottom_url);
    const bottom_text = await bottom_file.text();
    return main_text + '<script src="' + jsFile + '"></script>' + bottom_text;
}