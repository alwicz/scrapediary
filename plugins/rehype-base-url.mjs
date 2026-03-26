import { visit } from 'unist-util-visit';

export function rehypeBaseUrl(options = {}) {
  const base = options.base || '/';
  return (tree) => {
    visit(tree, 'element', (node) => {
      // Rewrite href on <a> tags
      if (node.tagName === 'a' && node.properties?.href) {
        const href = node.properties.href;
        if (href.startsWith('/') && !href.startsWith(base)) {
          node.properties.href = base + href.slice(1);
        }
      }
      // Rewrite src on <img> tags
      if (node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src;
        if (src.startsWith('/') && !src.startsWith(base)) {
          node.properties.src = base + src.slice(1);
        }
      }
    });
  };
}
