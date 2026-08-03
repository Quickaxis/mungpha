const fs = require('fs');
let html = fs.readFileSync('packages.html', 'utf8');

const dests = {
  meghalaya: ['Mawsynram', 'Nongriat', 'Laitlum', 'Krang Suri', 'Mawphlang', 'Wei Sawdong'],
  assam: ['Majuli', 'Manas', 'Tezpur', 'Jorhat', 'Dibrugarh', 'Sivasagar', 'Haflong'],
  arunachal: ['Dirang', 'Bomdila', 'Ziro', 'Itanagar', 'Pasighat', 'Bhalukpong', 'Roing']
};

const moreRegex = /<span class="tag-pill tag-pill-more">\+(\d+) More<\/span>/g;
html = html.replace(moreRegex, (fullMatch, xStr, offset) => {
    const x = parseInt(xStr, 10);
    
    // determine category by looking backward
    const textBefore = html.substring(Math.max(0, offset - 1500), offset);
    let category = 'meghalaya';
    if (textBefore.includes('data-category="assam"')) category = 'assam';
    if (textBefore.includes('data-category="arunachal"')) category = 'arunachal';
    
    const categoryDests = dests[category];
    let newTags = '';
    for (let i = 0; i < x; i++) {
        const dest = categoryDests[i % categoryDests.length];
        newTags += '\n                  <span class="tag-pill">' + dest + '</span>';
    }
    return newTags + '\n';
});

fs.writeFileSync('packages.html', html, 'utf8');
console.log('Restored dummy pills and removed hardcoded +More tags');
