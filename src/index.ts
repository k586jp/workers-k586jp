import { Hono, Context as c } from 'hono';

function main() {

    const app = new Hono();
    const page = new Hono();

    page.get('/', indexHtml);

    app.route('/', page);

    return app;

}
export default main();


async function indexHtml(context: c) {
    const url = new URL('/index.html', 'https://example.com');
    const file = await context.env.ASSETS.fetch(url);
    const text = await file.text();
    return context.html(text);
}