const fs = require('fs');
const path = require('path');

function fixImports(filePath) {
  let c = fs.readFileSync(filePath, 'utf8');
  const original = c;
  c = c.replace(/(from\s+['"])(\.\.?\/[^'"]+)(['"])/g, (match, prefix, importPath, suffix) => {
    if (importPath.endsWith('.js') || importPath.endsWith('.mjs') || importPath.endsWith('.cjs')) {
      return match;
    }
    return prefix + importPath + '.js' + suffix;
  });
  if (c !== original) {
    fs.writeFileSync(filePath, c);
    console.log(`Fixed imports in ${filePath}`);
  }
}

const generatedFile = path.join(__dirname, 'src', 'generated', 'routes.ts');
fixImports(generatedFile);
