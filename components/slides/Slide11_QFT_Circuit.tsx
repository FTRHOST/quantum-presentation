import React, { useState, useEffect } from 'react';
import { Gate, Wire, ControlDot, Swap, MathFormula } from '../CircuitComponents';

const QFT_CODE = [
  "import cirq",
  "import numpy as np",
  "",
  "# Mendefinisikan 3 qubit",
  "q0, q1, q2 = cirq.GridQubit.rect(1, 3)",
  "",
  "# Membuat fungsi sirkuit Quantum Fourier Transform (QFT)",
  "def qft_circuit(qubits):",
  "  q_list = list(qubits)",
  "  circuit = cirq.Circuit()",
  "  # langkah 1: Terapkan gerbang H dan rotasi terkontrol",
  "  for i, qubit in enumerate(q_list):",
  "    # Terapkan H pada qubit ke i",
  "    circuit.append(cirq.H(qubit))",
  "",
  "    # Terapkan rotasi terkontrol pada qubit berikutnya",
  "    for j in range(i + 1, len(q_list)):",
  "      # Sudut rotasi bergantung pada jarak qubit kontrol dan target",
  "      angel = 2.0 * np.pi / (2**(j - i + 1))",
  "      # Implementasi gerbang rotasi terkontrol",
  "      circuit.append(cirq.CZ(q_list[j], qubit)**(2 * angel / np.pi))",
  "",
  "  # Lakukan SWAP untuk membalik urutan qubit",
  "  for i in range(len(q_list) // 2):",
  "    circuit.append(cirq.SWAP(q_list[i], q_list[len(q_list) - 1 - i]))",
  "",
  "  return circuit",
  "",
  "my_qft = qft_circuit([q0, q1, q2])",
  "print('Sirkuit Quantum Fourier Transform (QFT) untuk 3 Qubit:')",
  "print(my_qft)"
];

const TERMINAL_OUTPUT = `Sirkuit Quantum Fourier Transform (QFT) untuk 3 Qubit:
(0, 0): ───H───@────@─────────────────×───
               │    │                 │
(0, 1): ───────@────┼────H────@───────┼───
                    │         │       │
(0, 2): ────────────@^0.5─────@───H───×───`;

export const Slide11_QFT_Circuit = () => {
  const [linesDisplayed, setLinesDisplayed] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    const typeLine = () => {
      if (currentLine < QFT_CODE.length) {
        setLinesDisplayed(prev => [...prev, QFT_CODE[currentLine]]);
        currentLine++;
        setTimeout(typeLine, 30);
      } else {
        setIsFinished(true);
      }
    };
    const t = setTimeout(typeLine, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="h-full flex flex-col overflow-hidden">
       <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2 text-center shrink-0">Blueprint Sirkuit QFT 3-Qubit</h2>
       
       <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
          
          {/* Left Column: Code Animation */}
          <div className="flex flex-col h-full bg-gray-900 rounded-lg border border-gray-700 shadow-xl overflow-hidden">
             <div className="bg-gray-800 px-3 py-1 border-b border-gray-700 flex items-center space-x-2 shrink-0">
                 <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                 <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                 <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                 <span className="text-[10px] text-gray-400 ml-2 font-mono">qft_algorithm.py</span>
             </div>
             
             <div className="flex-1 p-3 overflow-auto font-mono text-[10px] md:text-xs">
                 {linesDisplayed.map((line, i) => (
                    <div key={i} className="text-gray-300 whitespace-pre min-h-[1.2em]">{line}</div>
                 ))}
                 {!isFinished && <div className="w-1.5 h-3 bg-gray-500 animate-pulse inline-block"></div>}
                 
                 {isFinished && (
                    <div className="mt-4 pt-4 border-t border-gray-700 animate-[fadeIn_0.5s_ease-out]">
                       <pre className="text-green-400 whitespace-pre font-bold leading-tight">{TERMINAL_OUTPUT}</pre>
                    </div>
                 )}
             </div>
          </div>

          {/* Right Column: Circuit Visual & Math */}
          <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 overflow-y-auto">
             
             {/* Circuit Diagram (Scaled) */}
             <div className="overflow-x-auto flex items-center justify-center mb-6 pb-2 border-b border-gray-100">
                  <div className="grid grid-rows-3 gap-y-8 transform scale-90 origin-top-left" style={{ gridTemplateColumns: 'repeat(8, 60px)' }}>
                     {/* --- Visual Logic (Same as before but compact) --- */}
                     {/* ROW 1 (0,0) */}
                     <div className="flex items-center justify-center"><span className="font-mono font-bold text-sm text-gray-500">q0</span></div>
                     <div className="flex items-center relative"><Wire /><Gate label="H" /><Wire /></div>
                     <div className="flex items-center justify-center relative">
                         <div className="absolute w-full h-0.5 bg-gray-800"></div><ControlDot />
                         <div className="absolute top-1/2 left-1/2 w-0.5 bg-black h-[calc(100%+32px)] -translate-x-1/2 z-0"></div>
                     </div>
                     <div className="flex items-center justify-center relative">
                         <div className="absolute w-full h-0.5 bg-gray-800"></div><ControlDot />
                         <div className="absolute top-1/2 left-1/2 w-0.5 bg-black h-[calc(200%+64px)] -translate-x-1/2 z-0"></div>
                     </div>
                     <div className="flex items-center relative col-span-3"><Wire /><Wire /><Wire /></div>
                     <div className="flex items-center justify-center relative">
                         <div className="absolute w-full h-0.5 bg-gray-800"></div>
                         <div className="relative z-10 text-xl font-bold bg-white rounded-full px-1">×</div>
                         <div className="absolute top-1/2 left-1/2 w-0.5 bg-black h-[calc(200%+64px)] -translate-x-1/2 z-0"></div>
                     </div>

                     {/* ROW 2 (0,1) */}
                     <div className="flex items-center justify-center"><span className="font-mono font-bold text-sm text-gray-500">q1</span></div>
                     <div className="flex items-center relative"><Wire /></div>
                     <div className="flex items-center justify-center relative">
                         <div className="absolute w-full h-0.5 bg-gray-800"></div><ControlDot />
                     </div>
                     <div className="flex items-center relative"><Wire /></div>
                     <div className="flex items-center relative"><Wire /><Gate label="H" /><Wire /></div>
                     <div className="flex items-center justify-center relative">
                         <div className="absolute w-full h-0.5 bg-gray-800"></div><ControlDot />
                         <div className="absolute top-1/2 left-1/2 w-0.5 bg-black h-[calc(100%+32px)] -translate-x-1/2 z-0"></div>
                     </div>
                     <div className="flex items-center relative col-span-2"><Wire /><Wire /></div>

                     {/* ROW 3 (0,2) */}
                     <div className="flex items-center justify-center"><span className="font-mono font-bold text-sm text-gray-500">q2</span></div>
                     <div className="flex items-center relative col-span-2"><Wire /><Wire /></div>
                     <div className="flex items-center justify-center relative">
                         <div className="absolute w-full h-0.5 bg-gray-800"></div>
                         <div className="bg-white px-1 relative z-10 border border-black rounded text-[10px] font-bold">@^0.5</div>
                     </div>
                     <div className="flex items-center relative"><Wire /></div>
                     <div className="flex items-center justify-center relative">
                         <div className="absolute w-full h-0.5 bg-gray-800"></div><ControlDot />
                     </div>
                     <div className="flex items-center relative"><Wire /><Gate label="H" /><Wire /></div>
                     <div className="flex items-center justify-center relative">
                         <div className="absolute w-full h-0.5 bg-gray-800"></div>
                         <div className="relative z-10 text-xl font-bold bg-white rounded-full px-1">×</div>
                     </div>
                  </div>
             </div>

             {/* Mathematical Explanation */}
             <div className="space-y-4 text-sm text-gray-700">
                <h3 className="font-bold text-gray-900 border-b pb-1">Komponen Matematika</h3>
                
                {/* Hadamard */}
                <div className="flex items-start space-x-3">
                   <div className="w-10 h-10 flex items-center justify-center border-2 border-blue-600 font-bold text-blue-800 bg-blue-50 shrink-0">H</div>
                   <div>
                      <div className="font-bold text-blue-900">Gerbang Hadamard</div>
                      <p className="text-xs mb-1">Membuat superposisi seragam.</p>
                      <div className="bg-gray-50 p-1 rounded border border-gray-200 inline-block">
                         <MathFormula tex="H = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}" />
                      </div>
                   </div>
                </div>

                {/* Controlled Phase */}
                <div className="flex items-start space-x-3">
                   <div className="w-10 h-10 flex items-center justify-center border-2 border-black font-bold text-gray-800 bg-gray-50 shrink-0 text-xs">@^k</div>
                   <div>
                      <div className="font-bold text-gray-900">Controlled-Phase (R_k)</div>
                      <p className="text-xs mb-1">Rotasi fase relatif sebesar sudut <span className="font-mono">angel</span>.</p>
                      <div className="bg-gray-50 p-1 rounded border border-gray-200 inline-block">
                         <MathFormula tex="R_k = \begin{pmatrix} 1 & 0 \\ 0 & e^{2\pi i / 2^k} \end{pmatrix}" />
                      </div>
                   </div>
                </div>

                {/* Swap */}
                <div className="flex items-start space-x-3">
                   <div className="w-10 h-10 flex items-center justify-center border-2 border-gray-400 font-bold text-gray-600 bg-white shrink-0 text-xl">×</div>
                   <div>
                      <div className="font-bold text-gray-900">SWAP</div>
                      <p className="text-xs">
                        Membalik urutan qubit di akhir sirkuit untuk mengoreksi urutan bit output QFT.
                      </p>
                   </div>
                </div>
             </div>

          </div>

       </div>
    </div>
  );
};