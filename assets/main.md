## 便利リンク

### 外部記事

- Zenn
  https://zenn.dev/k586

### SNS

- Twitter (X)
  https://twitter.com/k586
- Bluesky
  https://bsky.app/profile/k586.jp
- くるっぷ (未使用)
  https://crepu.net/user/k586
- マストドンJP (未使用)
  https://mstdn.jp/@586
- Pawoo (未使用)
  https://pawoo.net/@586

### 連絡先

- mail(a)k586.jp


## マークダウンのテスト

ああああ、テストテスト

- 1
- 2
- 3

```TypeScript
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
    const url = new URL('/main.html', 'https://example.com');
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
