import { visit } from 'unist-util-visit';

export function rehypeBaseUrl(options = {}) {
  const base = options.base || '/';
  return (tree) => {
    visit(tree, (node) => {
      // Handle parsed HTML elements
      if (node.type === 'element') {
        if (node.tagName === 'a' && node.properties?.href) {
          const href = node.properties.href;
          if (href.startsWith('/') && !href.startsWith(base)) {
            node.properties.href = base + href.slice(1);
          }
        }
        if (node.tagName === 'img' && node.properties?.src) {
          const src = node.properties.src;
          if (src.startsWith('/') && !src.startsWith(base)) {
            node.properties.src = base + src.slice(1);
          }
        }
      }
      // Handle raw HTML blocks (inline HTML in markdown)
      if (node.type === 'raw' && typeof node.value === 'string') {
        node.value = node.value
          .replace(/href="\/(?!scrapediary\/|\/)/g, `href="${base}`)
          .replace(/src="\/(?!scrapediary\/|\/|https?:)/g, `src="${base}`);
      }
      // Handle text nodes that contain HTML (some parsers put figure blocks here)
      if (node.type === 'text' && typeof node.value === 'string' && node.value.includes('src="/')) {
        node.value = node.value
          .replace(/src="\/(?!scrapediary\/)/g, `src="${base}`);
      }
    });
  };
}
