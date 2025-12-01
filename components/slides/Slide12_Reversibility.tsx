import React, { useState, useEffect } from 'react';
import { BlochSphere } from '../BlochSphere';

const CODE_LINES = [
  "import cirq",
  "import numpy as np",
  "",
  "# Mendefinisikan 3 qubit",
  "q0, q1, q2 = cirq.GridQubit.rect(1,3)",
  "",
  "# Fungsi sirkuit Quantum Fourier Transform (QFT)",
  "def qft_circuit(qubits):",
  "  q_list = list(qubits)",
  "  circuit = cirq.Circuit()",
  "  for i, qubit in enumerate(q_list):",
  "    circuit.append(cirq.H(qubit))",
  "    for j in range(i + 1, len(q_list)):",
  "      angel = 2.0 * np.pi / (2**(j - i + 1))",
  "      circuit.append(cirq.CZ(q_list[j], qubit)**(2 * angel / np.pi))",
  "  for i in range(len(q_list) // 2):",
  "    circuit.append(cirq.SWAP(q_list[i], q_list[len(q_list) - 1 - i]))",
  "  return circuit",
  "",
  "# Input Sirkuit & Simulasi",
  "input_circuit = cirq.Circuit(cirq.X(q0), cirq.X(q2))",
  "my_qft = qft_circuit([q0, q1, q2])",
  "iqft_circuit = cirq.inverse(my_qft)",
  "",
  "full_circuit = input_circuit + my_qft + iqft_circuit",
  "print(full_circuit)",
  "",
  "simulator = cirq.Simulator()",
  "result = simulator.simulate(full_circuit)",
  "print('\\nState vector: ')",
  "print(np.round(result.final_state_vector, 3))"
];

const TERMINAL_OUTPUT = `(0, 0): ───X───H───@────@─────────────────×───×────────────@──────────@───H───
                   │    │                 │   │            │          │
(0, 1): ───────────@────┼────H────@───────┼───┼───────@────┼─────H────@───────
                        │         │       │   │       │    │
(0, 2): ───X────────────@^0.5─────@───H───×───×───H───@────@^-0.5─────────────
                       └──────┘                           └───────┘

State vector: 
[0.+0.j 0.+0.j 0.+0.j 0.+0.j 0.+0.j 1.+0.j 0.+0.j 0.+0.j]`;

export const Slide12_Reversibility = () => {
  const [linesDisplayed, setLinesDisplayed] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [step, setStep] = useState(0); 
  
  // Animation: Type Code
  useEffect(() => {
    let currentLine = 0;
    
    const typeLine = () => {
      if (currentLine < CODE_LINES.length) {
        setLinesDisplayed(prev => [...prev, CODE_LINES[currentLine]]);
        currentLine++;
        // Fast typing
        setTimeout(typeLine, 50); 
      } else {
        setIsFinished(true);
      }
    };
    
    const t = setTimeout(typeLine, 500);
    return () => clearTimeout(t);
  }, []);

  // Animation: Visual Loop (only after code finishes)
  useEffect(() => {
    if (!isFinished) {
        setStep(0); // Stay at Init
        return;
    }

    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;
    let t4: ReturnType<typeof setTimeout>;

    const sequence = () => {
       setStep(0); // Init
       t1 = setTimeout(() => setStep(1), 2000); // Input X
       t2 = setTimeout(() => setStep(2), 5000); // QFT
       t3 = setTimeout(() => setStep(3), 8000); // IQFT (Restore)
       t4 = setTimeout(sequence, 12000); // Loop
    };
    
    sequence();

    return () => {
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    }
  }, [isFinished]);

  const getQubitState = (qIndex: number) => {
      // Step 0: All 0
      if (step === 0) return '0';
      
      // Step 1: Input |101>
      if (step === 1) {
          if (qIndex === 0) return '1';
          if (qIndex === 1) return '0';
          if (qIndex === 2) return '1';
      }

      // Step 2: QFT (Superposition)
      if (step === 2) return '+';

      // Step 3: IQFT Output |101>
      if (step === 3) {
          if (qIndex === 0) return '1';
          if (qIndex === 1) return '0';
          if (qIndex === 2) return '1';
      }
      
      return '0';
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2 border-b pb-2 shrink-0">Bukti Reversibilitas: QFT & IQFT</h2>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-0 overflow-hidden">
         {/* Left: Code (Narrower, ~40%) */}
         <div className="col-span-1 lg:col-span-2 flex flex-col h-full overflow-hidden bg-gray-900 rounded-lg shadow-inner border border-gray-700">
             <div className="bg-gray-800 px-3 py-1 border-b border-gray-700 flex space-x-2 shrink-0">
                 <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                 <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                 <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
             </div>
             <div className="flex-1 p-3 text-[10px] font-mono flex flex-col min-h-0 overflow-hidden">
                 <div className="flex-1 overflow-y-auto no-scrollbar relative">
                    {linesDisplayed.map((line, i) => (
                        <div key={i} className="text-blue-300 whitespace-pre min-h-[1em] leading-tight">{line}</div>
                    ))}
                    {!isFinished && <div className="w-1.5 h-3 bg-gray-500 animate-pulse inline-block"></div>}
                 </div>
                 
                 {/* Output Terminal Area */}
                 <div className="mt-2 pt-2 border-t border-gray-700 shrink-0 h-1/3 overflow-hidden relative bg-black/20">
                    <div className="text-gray-400 mb-1 sticky top-0 text-[9px] font-bold"># Output</div>
                    {isFinished && (
                        <pre className="text-green-400 whitespace-pre text-[9px] leading-tight animate-[fadeIn_0.5s_ease-out]">{TERMINAL_OUTPUT}</pre>
                    )}
                 </div>
             </div>
         </div>

         {/* Right: Visual (Wider, ~60%) */}
         <div className="col-span-1 lg:col-span-3 flex flex-col h-full bg-gray-50 rounded-xl border border-gray-200 p-2 shadow-sm overflow-hidden">
             <div className="mb-2 text-center shrink-0">
                 <h3 className="font-bold text-lg text-gray-800">Visualisasi State (3 Qubit)</h3>
                 <div className="flex items-center justify-center space-x-2 mt-1 transform scale-90">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${step === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>Init</span>
                     <span className="text-gray-400">→</span>
                     <span className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${step === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>Input (X)</span>
                     <span className="text-gray-400">→</span>
                     <span className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>QFT</span>
                     <span className="text-gray-400">→</span>
                     <span className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${step === 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>IQFT</span>
                 </div>
             </div>

             {/* Bigger Spheres Container */}
             <div className="flex-1 grid grid-cols-3 gap-2 min-h-0 items-center justify-center p-2">
                 {/* Qubit 0 */}
                 <div className="flex flex-col h-full border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                     <div className="bg-gray-100 text-center text-xs font-mono font-bold py-1 text-gray-600 border-b border-gray-200">q0</div>
                     <div className="flex-1 relative">
                         <BlochSphere state={getQubitState(0)} />
                     </div>
                 </div>
                 {/* Qubit 1 */}
                 <div className="flex flex-col h-full border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                     <div className="bg-gray-100 text-center text-xs font-mono font-bold py-1 text-gray-600 border-b border-gray-200">q1</div>
                     <div className="flex-1 relative">
                         <BlochSphere state={getQubitState(1)} />
                     </div>
                 </div>
                 {/* Qubit 2 */}
                 <div className="flex flex-col h-full border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                     <div className="bg-gray-100 text-center text-xs font-mono font-bold py-1 text-gray-600 border-b border-gray-200">q2</div>
                     <div className="flex-1 relative">
                         <BlochSphere state={getQubitState(2)} />
                     </div>
                 </div>
             </div>
             
             <div className="mt-2 text-center shrink-0">
                 <div className="font-mono font-bold text-xl text-blue-900 transition-all duration-300 h-8">
                     {!isFinished ? (
                         <span className="text-gray-400 text-sm animate-pulse">Mengetik kode...</span>
                     ) : (
                         <>
                            State: 
                            {step === 0 && "|000⟩"}
                            {step === 1 && "|101⟩"}
                            {step === 2 && <span className="text-red-500">Superposisi (Fourier)</span>}
                            {step === 3 && <span className="text-green-600">|101⟩ (Pulih)</span>}
                         </>
                     )}
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};