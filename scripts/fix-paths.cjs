const fs = require('fs');
const path = require('path');

const jsPath = path.resolve(__dirname, '../public/gallery/gallery-data.js');
const jsonPath = path.resolve(__dirname, '../public/gallery/gallery-data.json');

let js = fs.readFileSync(jsPath, 'utf8');
js = js.split('"/gallery/').join('"gallery/');
fs.writeFileSync(jsPath, js, 'utf8');

let json = fs.readFileSync(jsonPath, 'utf8');
json = json.split('"/gallery/').join('"gallery/');
fs.writeFileSync(jsonPath, json, 'utf8');

console.log('Successfully updated gallery-data.js and gallery-data.json with relative paths!');
