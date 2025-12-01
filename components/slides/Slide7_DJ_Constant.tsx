import React, { useState, useEffect } from 'react';
import { Gate, Wire, Measure, Signal, XCircleGate } from '../CircuitComponents';
import { ResultBlochSphere } from '../ResultBlochSphere';

export const Slide7_DJ_Constant = () => {
  const [executing, setExecuting] = useState(false);
  const [resultState, setResultState] = useState<'superposition' | 'zero' | 'one'>('superposition');
  const [resultDisplay, setResultDisplay] = useState<number | null>(null);

  // Animation cycle
  useEffect(() => {
    const interval = setInterval(() => {
       setExecuting(true);
       setResultDisplay(null);
       setResultState('superposition');
       
       setTimeout(() => {
          setExecuting(false);
          setResultDisplay(0); // Constant function -> always 0
          setResultState('zero');
       }, 2000); // 2s execution time matching signal
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b pb-4">Kasus 1: Oracle Fungsi Konstan</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center h-full">
         <div className="flex flex-col justify-center">
            <p className="text-gray-800 mb-6 text-lg">
              Oracle untuk fungsi konstan <span className="font-serif italic">f(x) = 0</span> adalah operasi identitas (kabel kosong).
              Ancilla tetap disiapkan ke <strong>|-⟩</strong> untuk konsistensi algoritma.
            </p>

            <div className="bg-white p-8 rounded-xl border border-gray-300 shadow-lg relative overflow-hidden">
              <div className="absolute top-2 right-2 text-xs font-mono text-gray-400">Circuit Visualization</div>
              
              <div className="flex flex-col gap-8 min-w-max mt-4">
                 {/* Line 1: Input */}
                 <div className="flex items-center">
                   <span className="w-24 font-mono font-bold text-gray-600 shrink-0">Input |0⟩</span>
                   <Gate label="H" />
                   
                   {/* Spacer Wire to match Ancilla's H */}
                   <div className="w-16"><Wire signalDelay={500} /></div>
                   
                   {/* Oracle Section */}
                   <div className="w-40 flex items-center justify-center text-sm font-bold text-gray-500 border-2 border-dashed border-gray-300 bg-gray-50 h-12 rounded shrink-0 mx-2">
                     Oracle f(x)=0
                     {/* Pass-through signal */}
                     <Signal delay={1000} />
                   </div>
                   
                   <Gate label="H" />
                   <Measure />
                   
                   {/* Result display */}
                   <div className={`ml-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all ${resultDisplay === 0 ? 'bg-green-600 scale-110' : 'bg-gray-200'}`}>
                      {resultDisplay === 0 ? '0' : '?'}
                   </div>
                 </div>

                 {/* Line 2: Ancilla */}
                 <div className="flex items-center">
                   <span className="w-24 font-mono font-bold text-gray-600 shrink-0">Ancilla |0⟩</span>
                   
                   {/* Initialization: X then H to get |-> */}
                   <XCircleGate />
                   <Gate label="H" />
                   
                   {/* Oracle Section */}
                   <div className="w-40 flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 h-12 rounded shrink-0 mx-2">
                     {/* Identity */}
                     <Signal delay={1000} />
                   </div>
                   
                   <div className="w-16"><Wire signalDelay={1500} /></div>
                   <div className="w-16"><Wire signalDelay={1500} /></div>
                 </div>
              </div>

              {executing && <div className="absolute bottom-2 right-2 text-xs text-blue-600 font-bold animate-pulse">Running Simulation...</div>}
            </div>
         </div>

         <div className="bg-yellow-50 p-8 rounded-xl border-2 border-yellow-200 flex flex-col items-center h-full justify-center shadow-inner relative">
            <h3 className="font-bold text-xl mb-6 text-gray-800">Hasil Simulasi (N=1000)</h3>
            
            <div className="w-full h-64 bg-white rounded-lg border border-gray-200 shadow-sm relative overflow-hidden">
                <ResultBlochSphere targetState={resultState} shots={1000} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100 mt-4 text-center w-full">
                <p className="text-gray-800 text-lg">
                  Pengukuran <span className="font-bold font-mono">|0⟩</span> secara deterministik mengidentifikasi fungsi sebagai:
                </p>
                <div className="mt-2 text-2xl font-black text-yellow-600 uppercase tracking-widest">
                  KONSTAN
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};