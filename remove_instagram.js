const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    const htmlFiles = files.filter(file => file.endsWith('.html'));

    htmlFiles.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const data = fs.readFileSync(filePath, 'utf8');

        // Regex to match "Instagram: <a href="...">@mung_phai</a><br>" across multiple lines
        const regex = /[ \t]*Instagram:\s*<a href="https:\/\/instagram\.com\/mung_phai" target="_blank"[^>]*>@mung_phai<\/a><br>\n?/g;
        
        if (regex.test(data)) {
            const result = data.replace(regex, '');
            fs.writeFileSync(filePath, result, 'utf8');
            console.log('Updated: ' + file);
        } else {
            console.log('Not found in: ' + file);
        }
    });
});
