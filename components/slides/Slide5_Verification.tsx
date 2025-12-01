import React, { useState, useEffect } from 'react';
import { EntangledBlochSpheres } from '../EntangledBlochSpheres';

const CODE_LINES = [
  "# Membangun Sirkuit Bell State",
  "import cirq",
  "import qsimcirq",
  "",
  "# 1. Inisialisasi Qubit",
  "q0 = cirq.GridQubit(0, 0)",
  "q1 = cirq.GridQubit(0, 1)",
  "",
  "# 2. Ciptakan Superposisi & Entanglement",
  "circuit = cirq.Circuit(",
  "    cirq.H(q0), # Gerbang H",
  "    cirq.CNOT(q0, q1), # Gerbang CNOT",
  "    cirq.measure(q0, q1, key='final_result')",
  ")",
  "",
  "print('Sirkuit yang dibuat:')",
  "print(circuit)",
  "",
  "# 3. Ukur Hasil",
  "simulator = qsimcirq.QSimSimulator()",
  "result = simulator.run(circuit, repetitions=1000)",
  "print('\\nHasil pengukuran N=1000:')",
  "print(result.histogram(key='final_result'))"
];

export const Slide5_Verification = () => {
  const [linesDisplayed, setLinesDisplayed] = useState<string[]>([]);
  const [showSpheres, setShowSpheres] = useState(false);
  const [measurementState, setMeasurementState] = useState<'none' | 'zero' | 'one'>('none');
  const [isFinished, setIsFinished] = useState(false);
  
  // Step for visualization: 0=Init, 1=Hadamard, 2=Entangled, 3=Measuring
  const [visualStep, setVisualStep] = useState(0); 

  // Animation Sequence
  useEffect(() => {
    let currentLine = 0;
    
    const typeLine = () => {
      if (currentLine < CODE_LINES.length) {
        const line = CODE_LINES[currentLine];
        setLinesDisplayed(prev => [...prev, line]);
        
        // Logic to trigger visualization steps based on code content
        if (line.includes("GridQubit")) {
           setShowSpheres(true);
           setVisualStep(0); // Init
        }
        else if (line.includes("cirq.H(q0)")) {
           setVisualStep(1); // Hadamard
        }
        else if (line.includes("cirq.CNOT")) {
           setVisualStep(2); // CNOT (Entanglement)
        }
        else if (line.includes("simulator.run")) {
           setVisualStep(3); // Start Measuring Loop
        }

        currentLine++;
        // Speed per line
        const speed = 100; // Faster typing to fit animation time
        setTimeout(typeLine, speed);
      } else {
        // Typing Finished
        setIsFinished(true);
      }
    };

    // Start delay
    const initialTimeout = setTimeout(typeLine, 500);

    return () => clearTimeout(initialTimeout);
  }, []);

  // Measurement Loop Effect (Triggered when typing finishes)
  useEffect(() => {
    if (!isFinished) return;

    // Start immediately with zero
    setMeasurementState('zero');

    const interval = setInterval(() => {
        setMeasurementState(prev => (prev === 'zero' ? 'one' : 'zero'));
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, [isFinished]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2 border-b pb-2 shrink-0">Verifikasi & Simulasi Entanglement</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full min-h-0 overflow-hidden">
        
        {/* Left Col: Coding Animation */}
        <div className="flex flex-col h-full overflow-hidden">
           <div className="mb-1 shrink-0">
              <h3 className="text-lg font-bold text-gray-800">Simulasi Kode (Cirq + Qsim)</h3>
           </div>

           {/* Terminal Window */}
           <div className="flex-1 bg-gray-900 rounded-lg shadow-xl border border-gray-700 flex flex-col overflow-hidden font-mono text-xs relative">
              <div className="bg-gray-800 px-3 py-1 border-b border-gray-700 flex items-center space-x-2 shrink-0">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                 <span className="ml-3 text-[10px] text-gray-400">quantum_sim.py</span>
              </div>
              
              <div className="p-3 text-gray-300 overflow-hidden flex-1 leading-tight whitespace-pre font-mono text-[10px] md:text-[11px]">
                 {linesDisplayed.map((line, idx) => (
                    <div key={idx} className="min-h-[1em]">{line}</div>
                 ))}
                 {!isFinished && <div className="w-1.5 h-3 bg-gray-500 animate-pulse mt-1 inline-block"></div>}
                 
                 {isFinished && (
                     <div className="mt-2 pt-2 border-t border-gray-700 text-white font-mono opacity-0 animate-[fadeIn_0.5s_forwards]">
                         <div className="text-blue-300">Sirkuit yang dibuat:</div>
                         <div>(0, 0): ───H───@───M('final_result')───</div>
                         <div>               │   │</div>
                         <div>(0, 1): ───────X───M───────────────────</div>
                         <br/>
                         <div className="text-blue-300">Hasil pengukuran N=1000:</div>
                         <div className="text-green-400">Counter({'{0: 513, 3: 487}'})</div>
                     </div>
                 )}
              </div>
           </div>
        </div>

        {/* Right Col: Entangled Spheres Visualization */}
        <div className="flex flex-col h-full overflow-hidden">
            <div className="mb-2 flex justify-between items-end shrink-0">
               <div>
                  <h3 className="text-lg font-bold text-gray-800">Visualisasi Keadaan</h3>
               </div>
               {measurementState !== 'none' && (
                  <span className="text-green-600 font-bold animate-pulse text-xs border border-green-200 bg-green-50 px-2 py-0.5 rounded-full">
                    Korelasi Terdeteksi ✓
                  </span>
               )}
            </div>

            <div className="flex-1 relative shadow-inner rounded-xl border border-gray-200 bg-gray-50/50 min-h-0">
               <EntangledBlochSpheres visible={showSpheres} measurementState={measurementState} step={visualStep} />
               
               {/* Overlay Status */}
               <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-blue-100 text-xs text-gray-800 shadow-lg">
                   <strong className="text-blue-800 block mb-0.5">Status Sistem:</strong> 
                   {visualStep === 0 && "Inisialisasi qubit |0⟩."}
                   {visualStep === 1 && "Gerbang H pada q0 -> Superposisi |+⟩."}
                   {visualStep === 2 && "Gerbang CNOT -> Entanglement (Bell State)."}
                   {visualStep >= 3 && measurementState === 'zero' && "Pengukuran: q0=0 memaksa q1=0."}
                   {visualStep >= 3 && measurementState === 'one' && "Pengukuran: q0=1 memaksa q1=1."}
               </div>
            </div>
        </div>

      </div>
    </div>
  );
};