
export function sanitizeHTML(string) {
    const bodyRegex = /<body>([\s\S]*?)<\/body>/;
    const bodyMatch = string.match(bodyRegex);
    const body = bodyMatch ? bodyMatch[0] : string;
    
    const titleregex = /<title>(.*?)<\/title>/;
    const match = string.match(titleregex);
    const title = match ? `<title>${match[1]}</title>` : `<title>Document</title>`;

    const headRegex = /<head>([\s\S]*?)<\/head>/;
    const headMatch = string.match(headRegex);
    const includes=`<link rel="stylesheet" href="./style.css">
    <script src="./script.js" defer></script>`
    const head = headMatch ? `<head>${headMatch[1]} ${includes}</head>` :`<head>
    ${includes}
    ${title}
    </head>`;

    const htmlRegex = /<html>([\s\S]*?)<\/html>/;
    const htmlMatch = string.match(htmlRegex);
    const sanitizedHTML = htmlMatch ? htmlMatch[0] : `<html>
    ${head}
    ${body}
    </html>`;

    return sanitizedHTML;
  }