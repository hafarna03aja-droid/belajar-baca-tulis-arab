const fs = require('fs');

let content = fs.readFileSync('src/app/learn/writing/[letterId]/WritingClient.tsx', 'utf8');

// Update calcAccuracy
content = content.replace(
  /function calcAccuracy\(userCanvas: HTMLCanvasElement, letter: any\): number \{\s+if \(!letter \|\| !letter\.guidePath\) return 0/g,
  `function calcAccuracy(userCanvas: HTMLCanvasElement, guidePath: string | undefined): number {
  if (!guidePath) return 0`
);

content = content.replace(
  /skeletonCtx\.stroke\(new Path2D\(letter\.guidePath\)\)/g,
  `skeletonCtx.stroke(new Path2D(guidePath))`
);

content = content.replace(
  /zoneCtx\.stroke\(new Path2D\(letter\.guidePath\)\)/g,
  `zoneCtx.stroke(new Path2D(guidePath))`
);

// Add activeForm state
content = content.replace(
  /const \[showGuide, setShowGuide\] = useState\(true\)/g,
  `const [showGuide, setShowGuide] = useState(true)
  const [activeForm, setActiveForm] = useState<'isolated' | 'initial' | 'medial' | 'final'>('isolated')`
);

// Update drawGuide to use activeForm guidePath
content = content.replace(
  /if \(showGuide && letter\.guidePath\) \{\s+ctx\.save\(\)\s+ctx\.strokeStyle = 'rgba\(245, 158, 11, 0\.3\)'\s+ctx\.lineWidth = 3\s+ctx\.setLineDash\(\[8, 6\]\)\s+ctx\.lineCap = 'round'\s+const path = new Path2D\(letter\.guidePath\)/g,
  `const currentGuidePath = letter?.positionForms[activeForm]?.guidePath;
    if (showGuide && currentGuidePath) {
      ctx.save()
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)'
      ctx.lineWidth = 3
      ctx.setLineDash([8, 6])
      ctx.lineCap = 'round'
      const path = new Path2D(currentGuidePath)`
);

// Update check to pass guidePath
content = content.replace(
  /const score = calcAccuracy\(userCanvas, letter\)/g,
  `const score = calcAccuracy(userCanvas, letter.positionForms[activeForm].guidePath)`
);

// Update the Form selector to be interactive tabs
const oldFormSelector = `{letter && \\[\\s+\\{ label: 'Tunggal', char: letter\\.positionForms\\.isolated\\.char \\},\\s+\\{ label: 'Awal', char: letter\\.positionForms\\.initial\\.char \\},\\s+\\{ label: 'Tengah', char: letter\\.positionForms\\.medial\\.char \\},\\s+\\{ label: 'Akhir', char: letter\\.positionForms\\.final\\.char \\},\\s+\\]\\.map\\(\\(p\\) => \\(\\s+<div key=\\{p\\.label\\} className="bg-\\[#0F172A\\] rounded-2xl p-4 text-center border border-\\[#334155\\]">\\s+<div className="font-arabic text-2xl text-\\[#3B82F6\\] mb-2">\\{p\\.char\\}</div>\\s+<div className="text-\\[10px\\] uppercase font-bold tracking-widest text-\\[#94A3B8\\]">\\{p\\.label\\}</div>\\s+</div>\\s+\\)\\)}`;

const newFormSelector = `{letter && [
                  { id: 'isolated', label: 'Tunggal', char: letter.positionForms.isolated.char },
                  { id: 'initial', label: 'Awal', char: letter.positionForms.initial.char },
                  { id: 'medial', label: 'Tengah', char: letter.positionForms.medial.char },
                  { id: 'final', label: 'Akhir', char: letter.positionForms.final.char },
                ].map((p) => (
                  <button 
                    key={p.id} 
                    onClick={() => { setActiveForm(p.id as any); handleClear(); }}
                    className={\`rounded-2xl p-4 text-center border transition-all \${activeForm === p.id ? 'bg-[#3B82F6]/10 border-[#3B82F6] shadow-md shadow-[#3B82F6]/20' : 'bg-[#0F172A] border-[#334155] hover:border-[#475569]'}\`}
                  >
                    <div className={\`font-arabic text-2xl mb-2 \${activeForm === p.id ? 'text-[#3B82F6]' : 'text-[#94A3B8]'}\`}>{p.char}</div>
                    <div className={\`text-[10px] uppercase font-bold tracking-widest \${activeForm === p.id ? 'text-[#3B82F6]' : 'text-[#94A3B8]'}\`}>{p.label}</div>
                  </button>
                ))}`;

content = content.replace(new RegExp(oldFormSelector), newFormSelector);

// Change the background letter to activeForm letter
content = content.replace(
  /<div className="absolute top-0 right-0 p-8 text-7xl font-arabic text-\\[#334155\\]\/50 -rotate-12 pointer-events-none">\{letter\?\.letter\}<\/div>/g,
  `<div className="absolute top-0 right-0 p-8 text-7xl font-arabic text-[#334155]/50 -rotate-12 pointer-events-none">{letter?.positionForms[activeForm]?.char}</div>`
);

content = content.replace(
  /<div className="font-arabic text-9xl text-\\[#3B82F6\\] mb-4 leading-none py-4">\{letter\?\.letter \|\| ''\}<\/div>/g,
  `<div className="font-arabic text-9xl text-[#3B82F6] mb-4 leading-none py-4">{letter?.positionForms[activeForm]?.char || ''}</div>`
);


// In drawGuide, update the background text as well
content = content.replace(
  /ctx\.fillText\(letter\.letter, canvas\.width \/ 2, canvas\.height \/ 2\)/g,
  `ctx.fillText(letter.positionForms[activeForm]?.char || letter.letter, canvas.width / 2, canvas.height / 2)`
);

// Also add effect to clear canvas when form changes
content = content.replace(
  /useEffect\(\(\) => \{\n    drawGuide\(\)\n  \}, \[drawGuide\]\)/g,
  `useEffect(() => {
    drawGuide()
  }, [drawGuide, activeForm])`
);


fs.writeFileSync('src/app/learn/writing/[letterId]/WritingClient.tsx', content);
console.log('Updated WritingClient');
