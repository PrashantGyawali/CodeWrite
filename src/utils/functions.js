
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

  export function combineIntoHTML(string,css,js) {
    const bodyRegex = /<body>([\s\S]*?)<\/body>/;
    const bodyMatch = string.match(bodyRegex);
    js=js.trim();
    css=css.trim();
    string=string.trim();
    const body = bodyMatch ? `<body>${bodyMatch[1]} <script>${js}</script></body>` : `<body>${string}<script>${js}</script></body>`;
    
    const titleregex = /<title>(.*?)<\/title>/;
    const match = string.match(titleregex);
    const title = match ? `<title>${match[1]}</title>` : `<title>Document</title>`;

    const headRegex = /<head>([\s\S]*?)<\/head>/;
    const headMatch = string.match(headRegex);
    const head = headMatch ? `<head>${headMatch[1]} <style>${css}</style></head>` :`<head>
    <style>${css}</style>
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

  export function isEmptyExcluding(str, [...excluding]) {
    console.log(excluding);
    if (excluding.length > 0) {
      excluding.forEach((exclusion) => {
        // Escape special characters in the exclusion string
        const escapedExclusion = exclusion.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        
        // Create a RegExp with the escaped exclusion string
        let regex = new RegExp(escapedExclusion, 'g');
        
        // Replace occurrences of the exclusion in the string
        str = str.replace(regex, '');
        });
    }    
    // Remove extra spaces and newlines and check if the string is empty
    return (str.trim().replace(/\n/g, '').trim()).length < 1;
  }
  

  export function replaceSubstring(str,substr,replacement)
  {
    return str.replace(substr,replacement);
  }