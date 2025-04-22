/**
 * Simple markdown to HTML converter
 * @param {string} markdown - Markdown content
 * @return {string} HTML content
 */
export const convertMarkdownToHtml = (markdown) => {
  if (!markdown) return '';
  
  let html = markdown;
  
  // Headers
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  
  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
  // Lists
  html = html.replace(/^\* (.*$)/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>');
  
  // Paragraphs - split by new lines
  html = html.split(/\n\s*\n/).map(p => {
    if (
      !p.trim().startsWith('<h') && 
      !p.trim().startsWith('<ul') &&
      p.trim() !== ''
    ) {
      return `<p>${p}</p>`;
    }
    return p;
  }).join('\n');
  
  return html;
};
