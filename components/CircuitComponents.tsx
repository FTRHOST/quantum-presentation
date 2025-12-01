import React from 'react';

// Common Gate Descriptions
const GATE_INFO: Record<string, { name: string, desc: string }> = {
  "H": { name: "Hadamard Gate", desc: "Menciptakan superposisi. Mengubah |0⟩ menjadi |+⟩." },
  "X": { name: "Pauli-X (NOT)", desc: "Membalik bit. Mengubah |0⟩ ke |1⟩ dan sebaliknya." },
  "Z": { name: "Pauli-Z", desc: "Membalik fase. Mengubah |+⟩ menjadi |-⟩." },
  "Y": { name: "Pauli-Y", desc: "Kombinasi flip bit dan fase." },
  "CR2": { name: "Controlled Rotation (R2)", desc: "Rotasi fase terkontrol sebesar π/2." },
  "CR3": { name: "Controlled Rotation (R3)", desc: "Rotasi fase terkontrol sebesar π/4." },
  "@": { name: "Control Node", desc: "Titik kontrol untuk gerbang multi-qubit." },
};

// --- Helper Components ---

// LaTeX-style Math Formula Renderer
export const MathFormula = ({ 
  tex, 
  className = "",
  large = false
}: { 
  tex: string, 
  className?: string,
  large?: boolean 
}) => {
  // Helper for fraction rendering
  const renderFraction = (num: string, den: string) => (
    <span className="inline-flex flex-col items-center align-middle mx-1 vertical-align-middle scale-90">
      <span className="border-b border-current leading-none px-1 pb-[1px] text-center w-full">{num}</span>
      <span className="leading-none px-1 pt-[1px] text-center w-full">{den}</span>
    </span>
  );

  // 1. Handle Matrices (e.g., Slide 11)
  if (tex.includes("\\begin{pmatrix}")) {
    const parts = tex.split(/\\begin{pmatrix}|\\end{pmatrix}/);
    const pre = parts[0];
    const matrixContent = parts[1];
    
    const rows = matrixContent.split('\\\\').map(row => row.split('&').map(cell => cell.trim()));

    return (
      <span className={`inline-flex items-center font-serif italic ${className} ${large ? 'text-xl' : 'text-base'}`}>
         {/* Pre-matrix content (e.g., "H = 1/sqrt(2)") */}
         <span dangerouslySetInnerHTML={{__html: 
            pre.replace("H =", "H =")
               .replace("R_k =", "R<sub>k</sub> =")
               .replace(/\\frac\{1\}\{\\sqrt\{2\}\}/, '') 
         }}></span>
         
         {/* Special handling for H gate fraction if it was removed above */}
         {pre.includes("\\frac{1}{\\sqrt{2}}") && renderFraction("1", "√2")}

         {/* Matrix */}
         <span className="inline-flex items-center align-middle mx-1">
            <span className="text-2xl font-light transform scale-y-150 mr-0.5">(</span>
            <span className="grid gap-x-3 gap-y-1 text-center" style={{ gridTemplateColumns: `repeat(${rows[0].length}, auto)` }}>
              {rows.flat().map((cell, i) => (
                 <span key={i} dangerouslySetInnerHTML={{__html: 
                   cell.replace(/e\^\{([^}]+)\}/, 'e<sup>$1</sup>')
                       .replace(/\\pi/g, 'π')
                       .replace(/\\sqrt\{2\}/g, '√2')
                 }}></span>
              ))}
            </span>
            <span className="text-2xl font-light transform scale-y-150 ml-0.5">)</span>
         </span>
      </span>
    );
  }

  // 2. Handle QFT Summation Formula (Slide 10)
  if (tex.includes("\\sum")) {
      return (
          <span className={`inline-flex items-center font-serif italic ${className} ${large ? 'text-2xl' : 'text-lg'}`}>
              <span className="mr-2">QFT|j⟩ =</span>
              {renderFraction("1", "√N")}
              <span className="mx-1 inline-flex flex-col justify-center items-center relative h-12 align-middle">
                 <span className="text-xs absolute top-0">N-1</span>
                 <span className="text-2xl leading-none">∑</span>
                 <span className="text-xs absolute bottom-0">k=0</span>
              </span>
              <span className="mx-1">e</span>
              <sup className="text-sm -top-4 relative">
                {renderFraction("2πijk", "N")}
              </sup>
              <span className="ml-1">|k⟩</span>
          </span>
      );
  }

  // 3. Handle specific superposition formula (Slide 3)
  if (tex.includes("H|0⟩")) {
    return (
        <span className={`inline-flex items-center font-serif italic ${className} ${large ? 'text-2xl' : 'text-lg'}`}>
            <span className="mr-2">H|0⟩ =</span>
            {renderFraction("1", "√2")}
            <span className="ml-1"> (|0⟩ + |1⟩) ≡ |+⟩</span>
        </span>
    );
  }

  // 4. Basic Replacements for simple formulas
  let display = tex
    .replace(/\|0⟩/g, '<span class="font-serif">|0⟩</span>')
    .replace(/\|1⟩/g, '<span class="font-serif">|1⟩</span>')
    .replace(/\|ψ⟩/g, '<span class="font-serif">|ψ⟩</span>')
    .replace(/\|Φ\+⟩/g, '<span class="font-serif">|Φ⁺⟩</span>')
    .replace(/\|Φ\^+\+⟩/g, '<span class="font-serif">|Φ⁺⟩</span>')
    .replace(/\|α\|\^2/g, '|α|<sup>2</sup>')
    .replace(/\|β\|\^2/g, '|β|<sup>2</sup>')
    .replace(/\\frac\{1\}\{\\sqrt\{2\}\}/g, '1/√2')
    .replace(/\^2/g, '<sup>2</sup>')
    .replace(/\^n/g, '<sup>n</sup>')
    .replace(/alpha/g, 'α')
    .replace(/beta/g, 'β')
    .replace(/pi/g, 'π')
    .replace(/\\equiv/g, '≡')
    .replace(/\\rightarrow/g, '→');

  return <span className={`font-serif italic ${className} ${large ? 'text-xl' : ''}`} dangerouslySetInnerHTML={{__html: display}}></span>;
};

// Reusable Histogram Component
export const Histogram = ({ 
  data, 
  total = 1000 
}: { 
  data: { label: string, value: number, highlight?: boolean, expected?: boolean }[],
  total?: number
}) => {
  return (
    <div className="w-full h-64 flex items-end justify-center space-x-8 md:space-x-12 relative border-b-2 border-gray-400 pb-2 px-8">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
         <span>{total}</span>
         <span>{total/2}</span>
         <span>0</span>
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 flex flex-col justify-between">
         <div className="border-t border-gray-200 w-full"></div>
         <div className="border-t border-gray-200 w-full"></div>
         <div className="border-t border-gray-200 w-full"></div>
      </div>

      {data.map((item, idx) => {
        const heightPercent = (item.value / total) * 100;
        return (
          <div key={idx} className="flex flex-col items-center w-20 relative z-10 group">
             {/* Value Tooltip */}
             <div className={`absolute -top-8 text-sm font-bold bg-black text-white px-2 py-1 rounded transition-opacity ${item.value > 0 ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}>
                {item.value}
             </div>

             {/* The Bar */}
             <div className="w-full relative flex items-end justify-center h-48">
                {item.value > 0 ? (
                  <div 
                    className={`w-full rounded-t-md transition-all duration-500 ease-out shadow-lg ${item.highlight ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-400 hover:bg-gray-300'}`}
                    style={{ height: `${heightPercent}%` }}
                  ></div>
                ) : (
                  <div className="w-full bg-gray-200 h-0.5 rounded-t-md"></div>
                )}
             </div>

             {/* X-axis Label */}
             <span className={`mt-3 font-mono font-bold text-lg ${item.value > 0 ? 'text-gray-800' : 'text-gray-400'}`}>
               {item.label}
             </span>
          </div>
        )
      })}
    </div>
  );
};

// Signal Animation Component
export const Signal = ({ active = true, delay = 0 }) => (
  <div className={`absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden ${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
     <div 
        className="absolute top-1/2 left-0 w-3 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_8px_4px_rgba(250,204,21,0.6)] animate-signal-flow z-20"
        style={{ animationDelay: `${delay}ms`, transform: 'translateY(-50%)' }}
     ></div>
  </div>
);


// --- Circuit Elements ---

// A simple wire
export const Wire = ({ signalDelay, vertical }: { signalDelay?: number, vertical?: boolean }) => {
    if (vertical) {
        return (
            <div className="w-0.5 h-full bg-black relative"></div>
        )
    }
    return (
        <div className="h-10 flex items-center w-full relative">
            <div className="w-full h-0.5 bg-gray-800 relative overflow-hidden">
                {signalDelay !== undefined && <Signal delay={signalDelay} />}
            </div>
        </div>
    );
};

// A gate box (e.g., H, X, Z)
export const Gate = ({ 
    label, 
    color = "bg-white", 
    description, 
    tooltipPosition = "top" 
}: { 
    label: string, 
    color?: string, 
    description?: string, 
    tooltipPosition?: "top" | "bottom" 
}) => {
  const info = GATE_INFO[label] || { name: label, desc: "Gerbang Operasi Kuantum" };
  const tooltipText = description || info.desc;
  const tooltipTitle = info.name;

  return (
    <div className="h-10 flex items-center justify-center w-16 relative group cursor-help z-10">
      <div className="absolute w-full h-0.5 bg-gray-800"></div>
      <div className={`w-10 h-10 border-2 border-blue-600 ${color} z-10 flex items-center justify-center font-bold text-lg shadow-sm relative hover:scale-105 transition-transform bg-white`}>
        {label}
      </div>
      
      {/* Tooltip */}
      <div 
        className={`absolute ${tooltipPosition === 'top' ? 'bottom-full mb-3' : 'top-full mt-3'} w-48 p-3 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl left-1/2 -translate-x-1/2 text-center ring-1 ring-white/20`}
      >
        <div className="font-bold text-blue-300 mb-1 text-sm">{tooltipTitle}</div>
        <div className="leading-tight text-gray-300">{tooltipText}</div>
        {/* Arrow */}
        <div className={`absolute left-1/2 -ml-1.5 border-4 ${tooltipPosition === 'top' ? 'top-full border-t-gray-900 border-x-transparent border-b-transparent' : 'bottom-full border-b-gray-900 border-x-transparent border-t-transparent'}`}></div>
      </div>
    </div>
  );
};

// X Gate as a Circle with Cross (⊕)
export const XCircleGate = () => (
  <div className="h-10 flex items-center justify-center w-16 relative group cursor-help z-10">
    <div className="absolute w-full h-0.5 bg-gray-800"></div>
    <div className="w-8 h-8 border-2 border-black rounded-full z-10 bg-white flex items-center justify-center text-xl font-bold relative hover:scale-105 transition-transform">
      <span className="mb-0.5 leading-none">⊕</span>
    </div>
    
    {/* Tooltip */}
    <div className="absolute bottom-full mb-3 w-32 p-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl left-1/2 -translate-x-1/2 text-center">
        <div className="font-bold text-blue-300">Pauli-X</div>
        <div className="leading-tight">Membalik bit (NOT). |0⟩ → |1⟩</div>
        <div className="absolute top-full left-1/2 -ml-1.5 border-4 border-t-gray-900 border-x-transparent border-b-transparent"></div>
    </div>
  </div>
);

// A measurement box
export const Measure = () => (
  <div className="h-10 flex items-center justify-center w-16 relative group cursor-help z-10">
    <div className="absolute w-full h-0.5 bg-gray-800"></div>
    <div className="w-10 h-10 border-2 border-gray-800 bg-gray-100 z-10 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform">
      <div className="relative w-6 h-4 border-t-2 border-r-2 border-l-2 border-black rounded-t-full mt-2">
        <div className="absolute bottom-0 left-1/2 w-0.5 h-4 bg-black origin-bottom -rotate-45"></div>
      </div>
    </div>
    {/* Tooltip */}
    <div className="absolute bottom-full mb-3 w-32 p-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl left-1/2 -translate-x-1/2 text-center">
        <div className="font-bold text-blue-300">Pengukuran</div>
        <div className="leading-tight">Membaca keadaan qubit (collapse ke 0 atau 1).</div>
        <div className="absolute top-full left-1/2 -ml-1.5 border-4 border-t-gray-900 border-x-transparent border-b-transparent"></div>
    </div>
  </div>
);

// Control dot (for CNOT)
export const ControlDot = () => (
  <div className="h-10 flex items-center justify-center w-16 relative group z-10">
    <div className="absolute w-full h-0.5 bg-gray-800"></div>
    <div className="w-3 h-3 bg-black rounded-full z-10"></div>
    {/* Tooltip */}
    <div className="absolute bottom-full mb-3 w-32 p-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl left-1/2 -translate-x-1/2 text-center">
        <div className="font-bold text-blue-300">Kontrol</div>
        <div className="leading-tight">Mengaktifkan target jika qubit ini bernilai |1⟩.</div>
        <div className="absolute top-full left-1/2 -ml-1.5 border-4 border-t-gray-900 border-x-transparent border-b-transparent"></div>
    </div>
  </div>
);

// Target X (for CNOT)
export const TargetX = () => (
  <div className="h-10 flex items-center justify-center w-16 relative group z-10">
    <div className="absolute w-full h-0.5 bg-gray-800"></div>
    <div className="w-8 h-8 border-2 border-black rounded-full z-10 bg-white flex items-center justify-center text-xl">
      <span className="mb-0.5 leading-none">⊕</span>
    </div>
    {/* Tooltip */}
    <div className="absolute bottom-full mb-3 w-32 p-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl left-1/2 -translate-x-1/2 text-center">
        <div className="font-bold text-blue-300">Target (CNOT)</div>
        <div className="leading-tight">Nilai qubit dibalik jika kontrol aktif.</div>
        <div className="absolute top-full left-1/2 -ml-1.5 border-4 border-t-gray-900 border-x-transparent border-b-transparent"></div>
    </div>
  </div>
);

// Vertical line for multi-qubit gates
export const VerticalLine = ({ height = "h-10" }: { height?: string }) => (
  <div className={`absolute top-1/2 left-1/2 w-0.5 bg-black -translate-x-1/2 ${height} z-0`}></div>
);

export const Swap = ({ connectedTo }: { connectedTo?: 'top' | 'bottom' }) => (
    <div className="h-10 flex items-center justify-center w-16 relative group cursor-help z-10">
    <div className="absolute w-full h-0.5 bg-gray-800"></div>
    {/* Vertical Connection Line */}
    {connectedTo && (
        <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 bg-black z-0 ${connectedTo === 'bottom' ? 'top-1/2 h-full' : 'bottom-1/2 h-full'}`}></div>
    )}
    <div className="relative z-10 text-2xl font-bold bg-white rounded-full px-1">×</div>
    
    {/* Tooltip */}
    <div className="absolute bottom-full mb-3 w-40 p-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl left-1/2 -translate-x-1/2 text-center">
        <div className="font-bold text-blue-300">SWAP Gate</div>
        <div className="leading-tight">Menukar keadaan dua qubit.</div>
        <div className="absolute top-full left-1/2 -ml-1.5 border-4 border-t-gray-900 border-x-transparent border-b-transparent"></div>
    </div>
  </div>
)

export const CodeBlock = ({ code, title }: { code: string, title?: string }) => (
  <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg my-4 text-left border border-gray-700">
    {title && <div className="bg-gray-800 px-4 py-2 text-xs font-bold text-gray-300 border-b border-gray-700 flex justify-between items-center">
        <span>{title}</span>
        <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
    </div>}
    <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
      <code className="text-gray-300">{code}</code>
    </pre>
  </div>
);