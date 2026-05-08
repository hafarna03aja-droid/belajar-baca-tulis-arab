const fs = require('fs');

let content = fs.readFileSync('src/lib/hijaiyah-data.ts', 'utf8');

// Update Interface
content = content.replace(
  /positionForms: \{\s+isolated: string;\s+initial: string;\s+medial: string;\s+final: string;\s+\};/g,
  `positionForms: {
    isolated: { char: string; guidePath: string; strokeCount: number };
    initial: { char: string; guidePath: string; strokeCount: number };
    medial: { char: string; guidePath: string; strokeCount: number };
    final: { char: string; guidePath: string; strokeCount: number };
  };`
);

// We need to parse each letter block to extract guidePath and strokeCount
// and inject them into positionForms.isolated, while setting empty ones for others.

const lines = content.split('\n');
let newLines = [];
let currentStrokeCount = 0;
let currentGuidePath = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // match strokeCount: N,
  const strokeMatch = line.match(/strokeCount:\s*(\d+)/);
  if (strokeMatch) {
    currentStrokeCount = parseInt(strokeMatch[1]);
  }
  
  // match guidePath: '...'
  const guideMatch = line.match(/guidePath:\s*'([^']+)'/);
  if (guideMatch) {
    currentGuidePath = guideMatch[1];
  }
  
  // match positionForms: { isolated: 'X', initial: 'Y', medial: 'Z', final: 'W' }
  const posMatch = line.match(/positionForms:\s*\{\s*isolated:\s*'([^']+)',\s*initial:\s*'([^']+)',\s*medial:\s*'([^']+)',\s*final:\s*'([^']+)'\s*\}/);
  
  if (posMatch) {
    const isoChar = posMatch[1];
    const iniChar = posMatch[2];
    const medChar = posMatch[3];
    const finChar = posMatch[4];
    
    newLines.push(`    positionForms: {`);
    newLines.push(`      isolated: { char: '${isoChar}', guidePath: '${currentGuidePath}', strokeCount: ${currentStrokeCount} },`);
    newLines.push(`      initial: { char: '${iniChar}', guidePath: '', strokeCount: 0 },`);
    newLines.push(`      medial: { char: '${medChar}', guidePath: '', strokeCount: 0 },`);
    newLines.push(`      final: { char: '${finChar}', guidePath: '', strokeCount: 0 }`);
    newLines.push(`    },`);
    
  } else {
    // wait, we shouldn't remove guidePath and strokeCount from the main object because they are part of the interface!
    // Or we should remove them from the interface since they are now in isolated?
    // Let's keep them in the main interface for backward compatibility for now, or update interface?
    // The user's code relies on letter.guidePath and letter.strokeCount in some places, so we leave them.
    newLines.push(line);
  }
}

fs.writeFileSync('src/lib/hijaiyah-data.ts', newLines.join('\n'));
console.log('Updated src/lib/hijaiyah-data.ts for complex positionForms');
