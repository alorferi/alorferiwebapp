import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const locales = Object.fromEntries(['en', 'bn'].map(locale => [locale, JSON.parse(fs.readFileSync(path.join(root, 'src/locales', locale + '.json'), 'utf8'))]));
function flatten(value, prefix = '', result = {}) {
    for (const [key, entry] of Object.entries(value)) {
        const full = prefix ? prefix + '.' + key : key;
        if (entry && typeof entry === 'object') flatten(entry, full, result);
        else result[full] = entry;
    }
    return result;
}
const keys = Object.fromEntries(Object.entries(locales).map(([locale, messages]) => [locale, flatten(messages)]));
const missing = [];
for (const [locale, messages] of Object.entries(keys)) {
    for (const key of new Set(Object.values(keys).flatMap(Object.keys))) {
        if (!(key in messages)) missing.push(locale + ': ' + key);
    }
}
function scan(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
        const filename = path.join(directory, entry.name);
        return entry.isDirectory() ? scan(filename) : /\.(vue|js)$/.test(entry.name) ? [filename] : [];
    });
}
const unknown = new Set();
for (const filename of scan(path.join(root, 'src'))) {
    const content = fs.readFileSync(filename, 'utf8');
    for (const match of content.matchAll(/\$t\(\s*(['"])([\w. -]+)\1\s*[,)]/g)) {
        if (!(match[2] in keys.en)) unknown.add(path.relative(root, filename) + ': ' + match[2]);
    }
}
console.log(`Locales: ${Object.keys(keys.en).length} English / ${Object.keys(keys.bn).length} Bengali keys`);
if (missing.length) console.log('Missing locale keys:\n' + missing.join('\n'));
if (unknown.size) console.log('Untranslated static labels (fallback text):\n' + [...unknown].join('\n'));
if (!missing.length && !unknown.size) console.log('Locale parity and static translation references passed.');
process.exitCode = missing.length || unknown.size ? 1 : 0;
