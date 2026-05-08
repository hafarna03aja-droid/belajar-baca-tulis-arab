const fs = require('fs');

let content = fs.readFileSync('src/lib/hijaiyah-data.ts', 'utf8');

content = content.replace(
  /\/\/ Position forms\s+isolated: string;\s+initial: string;\s+medial: string;\s+final: string;/g,
  `// Position forms
  positionForms: {
    isolated: string;
    initial: string;
    medial: string;
    final: string;
  };`
);

content = content.replace(
  /isolated: (.*?), initial: (.*?), medial: (.*?), final: (.*?),/g,
  `positionForms: { isolated: $1, initial: $2, medial: $3, final: $4 },`
);

fs.writeFileSync('src/lib/hijaiyah-data.ts', content);
console.log('Updated src/lib/hijaiyah-data.ts');
