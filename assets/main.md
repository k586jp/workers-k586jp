### マークダウンが使えます

ああああ、テストテスト

- 1
- 2
- 3

```JavaScript
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
    const response = await context.env.ASSETS.fetch(url);
    const html = await response.text();
    return context.html(html);
}
```

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
