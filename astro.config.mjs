// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkMath from "remark-math";
import rehypeMathJax from "rehype-mathjax";
import d2 from 'astro-d2';
import customToc from 'astro-custom-toc';


// https://astro.build/config
export default defineConfig({
    site: 'https://unkel.io',
    output: 'static',
    image: {
        responsiveStyles: true,
        layout: 'full-width',
    },
    experimental: {
        svgo: true
    },
    build: {
        inlineStylesheets: 'always'
    },
    integrations: [customToc({maxDepth: 2,
    template:(html) => {
    return `
        <aside class="toc">
            <div class="toc-top">
                <b>Table of Contents</b>
            </div>
            <nav>
                ${html}
            </nav>
            <dix class="toc-bottom"><a href="#">Go to top</a></div>
        </aside>`.trim();
} }), mdx(), sitemap(), d2({
        layout: "dagre",
        theme: {
            default: '300',
            dark: false
        },
        pad: 0,
        fonts: {
            regular: "public/fonts/BerkeleyMono-Thin.ttf",
            italic: "public/fonts/BerkeleyMono-Thin.ttf",
            bold: "public/fonts/BerkeleyMono-Thin.ttf",
            semibold: "public/fonts/BerkeleyMono-Thin.ttf"
        },
    })],
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeMathJax],
    }
});
