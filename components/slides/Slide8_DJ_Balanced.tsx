import React, { useState, useEffect } from 'react';
import { Gate, Wire, Measure, ControlDot, TargetX, Signal, XCircleGate } from '../CircuitComponents';
import { ResultBlochSphere } from '../ResultBlochSphere';

export const Slide8_DJ_Balanced = () => {
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
          setResultDisplay(1); // Balanced function -> always 1
          setResultState('one');
       }, 2000); 
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b pb-4">Kasus 2: Oracle Fungsi Seimbang</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center h-full">
         <div className="flex flex-col justify-center">
            <p className="text-gray-800 mb-6 text-lg">
              Oracle untuk fungsi seimbang <span className="font-serif italic">f(x) = x</span> menggunakan gerbang <strong>CNOT</strong>. 
              Ancilla yang berada di state <strong>|-⟩</strong> (hasil X lalu H) memicu <em>Phase Kickback</em> saat CNOT diterapkan.
            </p>

            <div className="bg-white p-8 rounded-xl border border-gray-300 shadow-lg relative overflow-hidden">
               <div className="absolute top-2 right-2 text-xs font-mono text-gray-400">Circuit Visualization</div>
               
               <div className="flex flex-col gap-8 min-w-max mt-4 relative">
                 
                 {/* Oracle Box Overlay */}
                 <div className="absolute left-[216px] w-[80px] h-[120px] border-2 border-dashed border-gray-300 rounded bg-gray-50/50 -z-0"></div>
                 <div className="absolute top-[-25px] left-[260px] w-[80px] text-center text-xs font-bold text-gray-500">Oracle f(x)=x</div>

                 {/* Top Row (Input) */}
                 <div className="flex items-center z-10">
                   <span className="w-24 font-mono font-bold text-gray-600 shrink-0">Input |0⟩</span>
                   
                   {/* Col 1 */}
                   <Gate label="H" />
                   
                   {/* Col 2: Spacer Wire to align with Ancilla's H gate */}
                   <div className="w-16"><Wire signalDelay={500} /></div>
                   
                   {/* Col 3: Control Part of CNOT */}
                   <div className="w-16 h-10 flex items-center justify-center relative">
                      <div className="absolute w-full h-0.5 bg-gray-800"></div>
                      <ControlDot />
                      <Signal delay={1000} />
                      {/* Vertical line connector downwards. 
                          Row height=40px, Gap=32px. Center-to-center = 72px.
                      */}
                      <div className="absolute top-1/2 left-1/2 w-0.5 bg-black -translate-x-1/2 z-0" style={{ height: '72px' }}></div>
                   </div>
                   
                   <Gate label="H" />
                   <Measure />
                   
                   {/* Result display */}
                   <div className={`ml-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all ${resultDisplay === 1 ? 'bg-blue-600 scale-110' : 'bg-gray-200'}`}>
                      {resultDisplay === 1 ? '1' : '?'}
                   </div>
                 </div>

                 {/* Bottom Row (Ancilla) */}
                 <div className="flex items-center z-10">
                   <span className="w-24 font-mono font-bold text-gray-600 shrink-0">Ancilla |0⟩</span>
                   
                   {/* Col 1: Phase Kickback Prep (X) */}
                   <XCircleGate />
                   
                   {/* Col 2: Phase Kickback Prep (H) */}
                   <Gate label="H" />
                   
                   {/* Col 3: Target Part of CNOT */}
                   <div className="w-16 h-10 flex items-center justify-center relative">
                       <div className="absolute w-full h-0.5 bg-gray-800"></div>
                       <TargetX />
                       <Signal delay={1000} />
                   </div>
                   
                   <div className="w-16"><Wire signalDelay={1500} /></div>
                   <div className="w-16"><Wire signalDelay={1500} /></div>
                 </div>
              </div>
              
              {executing && <div className="absolute bottom-2 right-2 text-xs text-blue-600 font-bold animate-pulse">Running Simulation...</div>}
            </div>
         </div>

         <div className="bg-blue-50 p-8 rounded-xl border-2 border-blue-200 flex flex-col items-center h-full justify-center shadow-inner">
            <h3 className="font-bold text-xl mb-6 text-gray-800">Hasil Simulasi (N=1000)</h3>
            
            <div className="w-full h-64 bg-white rounded-lg border border-gray-200 shadow-sm relative overflow-hidden">
                <ResultBlochSphere targetState={resultState} shots={1000} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 mt-4 text-center w-full">
                <p className="text-gray-800 text-lg">
                  Pengukuran <span className="font-bold font-mono">|1⟩</span> secara deterministik mengidentifikasi fungsi sebagai:
                </p>
                <div className="mt-2 text-2xl font-black text-blue-800 uppercase tracking-widest">
                  SEIMBANG
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};