import {Hono, Context as c, Next} from 'hono';
import { secureHeaders, NONCE } from 'hono/secure-headers';
import { PageLayout, EditPageLayout } from './html';
import type { Service } from '@cloudflare/workers-types'
import type { K586Articles, Article } from '../../workers-db/src/index';

type Bindings = {
    K586_ARTICLES: Service<K586Articles>,
    Variables: {
        nonce: string;
    }
};

function main() {

    const app = new Hono();
    const page = new Hono<{ Bindings: Bindings }>();

    page.use('*', useSecureHeaders);

    page.get('/', indexHtml);
    page.get('/article/', articleListHtml);
    page.get('/article/:id', articleHtml);
    page.get('/article/:id/edit', articleEditHtml);
    page.post('/article/:id/edit', articleUpdPost);

    app.route('/', page);

    return app;

}
export default main();

// ################################################################

async function indexHtml(context: c) {
    const json: Article[] = await context.env.K586_ARTICLES.getArticlesTitle();
    return context.html(PageLayout(json, context.get('nonce')));
}

async function articleListHtml(context: c) {
    let page: number;
    if (context.req.query('p')) {
        page = Number(context.req.query('p')) || 0;
    } else {
        page = 0;
    }
    const json: Article[] = await context.env.K586_ARTICLES.getArticles(page);
    return context.html(PageLayout(json, context.get('nonce')));
}

async function articleHtml(context: c) {
    const id = context.req.param('id');
    const json: Article[] = await context.env.K586_ARTICLES.getArticles(id);
    return context.html(PageLayout(json, context.get('nonce')));
}

async function articleEditHtml(context: c) {
    const id = context.req.param('id');
    const json: Article = await context.env.K586_ARTICLES.getArticleEditMode(id);
    return context.html(EditPageLayout(json, context.get('nonce')));
}

// ================================================================

async function articleUpdPost(context: c) {
    const id = context.req.param('id');
    const body = await context.req.parseBody();
    let article: Article = {
        id: id,
        is_public: true,
        title: String(body.title || ''),
        content_md: String(body.content_md || ''),
        user_id: 'k586'
    };
    await context.env.K586_ARTICLES.updateArticle(article);
    return context.redirect('/article/' + id);
}

// ================================================================

function useSecureHeaders(context: c, next: Next) {
    return secureHeaders({
        strictTransportSecurity: 'max-age=31536000; includeSubDomains; preload',
        xFrameOptions: 'DENY',
        xContentTypeOptions: 'nosniff',
        referrerPolicy: 'strict-origin-when-cross-origin',
        permissionsPolicy: {
            camera: [],
            microphone: [],
            geolocation: []
        },
        contentSecurityPolicy: {
            scriptSrc: [
                NONCE,
                "'self'",
                "'strict-dynamic'", // nonce を持ったスクリプトが生成した子スクリプトも許可
                'https://*.cloudflare.com',
                'https://*.cloudflareinsights.com',
                'https://cdn.jsdelivr.net'
            ],
            styleSrc: [
                "'self'",
                'https://*.cloudflare.com'
            ],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"],
            frameAncestors: ["'none'"],
            upgradeInsecureRequests: []
        }
    })(context, next);
}
