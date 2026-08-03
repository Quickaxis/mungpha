const fs = require('fs');
let html = fs.readFileSync('packages.html', 'utf-8');

// 1. Remove WhatsApp buttons
html = html.replace(/<a[^>]*class="[^"]*btn-whatsapp-pill[^"]*"[^>]*>.*?<\/a>/gs, '');

// 2. Change package-btn-trio to package-btn-duo
html = html.replace(/class="([^"]*)package-btn-trio([^"]*)"/g, 'class="$1package-btn-duo$2"');

// 3. Trim destinations to 4 + '+X More'
const regex = /<div class="package-tags-flex">([\s\S]*?)<\/div>/g;
let match;
while ((match = regex.exec(html)) !== null) {
    let content = match[1];
    
    // Find all tag pills
    const pillRegex = /<span class="tag-pill">([\s\S]*?)<\/span>/g;
    let pills = [];
    let pillMatch;
    while ((pillMatch = pillRegex.exec(content)) !== null) {
        pills.push(pillMatch[0]);
    }
    
    if (pills.length > 4) {
        let excess = pills.length - 4;
        let newContent = '\n                  ' + pills.slice(0, 4).join('\n                  ') + '\n                  <span class="tag-pill tag-pill-more">+' + excess + ' More</span>\n                ';
        html = html.substring(0, match.index) + '<div class="package-tags-flex">' + newContent + '</div>' + html.substring(match.index + match[0].length);
        regex.lastIndex = match.index + ('<div class="package-tags-flex">' + newContent + '</div>').length;
    }
}

fs.writeFileSync('packages.html', html, 'utf-8');
console.log('packages.html updated successfully!');
