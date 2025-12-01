import React, { useState, useEffect } from 'react';
import { BlochSphere } from '../BlochSphere';
import { MathFormula, Gate, Wire, Measure } from '../CircuitComponents';

export const Slide3_Qubit = () => {
  const [measuring, setMeasuring] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [blochState, setBlochState] = useState<'0' | '1' | '+' | 'random'>('0');

  // Looping Animation Sequence
  useEffect(() => {
    let timeoutIds: ReturnType<typeof setTimeout>[] = [];

    const runSequence = () => {
      // Phase 1: Initial State |0>
      setBlochState('0');
      setMeasuring(false);
      setShowResults(false);

      // Phase 2: Signal starts, apply H -> |+>
      const t1 = setTimeout(() => {
        setMeasuring(true);
        setBlochState('+');
      }, 1000);

      // Phase 3: Start Measuring (Random fluctuation)
      const t2 = setTimeout(() => {
         setBlochState('random');
      }, 2500); 

      // Phase 4: Collapse to |0> (2s after measuring starts)
      const t3 = setTimeout(() => {
        setShowResults(true);
        setBlochState('0'); 
      }, 4500);

      // Phase 5: Reset and Loop after 10 seconds of showing results
      const t4 = setTimeout(() => {
         runSequence();
      }, 14500); // 4500ms + 10000ms pause

      timeoutIds = [t1, t2, t3, t4];
    };

    runSequence();

    return () => {
        timeoutIds.forEach(id => clearTimeout(id));
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 border-b pb-4">Blok Pembangun Fundamental: Qubit</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start flex-1 overflow-y-auto min-h-0">
        
        {/* Left Column: Theory & Circuit */}
        <div className="flex flex-col space-y-8">
          {/* Theory Section */}
          <div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Bit Klasik vs Qubit</h3>
            <p className="text-gray-700 mb-4 text-base leading-relaxed">
              Jika bit klasik hanya bisa 0 atau 1, Qubit dapat berada dalam <strong>superposisi linear</strong>.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg font-serif text-center text-lg border border-gray-200 shadow-inner">
              <MathFormula tex="|ψ⟩ = α|0⟩ + β|1⟩" large />
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Probabilitas total: <MathFormula tex="|α|^2 + |β|^2 = 1" />
            </p>
          </div>

          {/* Circuit Simulation Section */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm">
            <h4 className="font-bold text-blue-900 text-lg mb-4">Eksperimen Superposisi</h4>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 overflow-hidden relative">
               <div className="absolute top-2 right-2 text-[10px] text-gray-400 font-mono">CIRCUIT VIEW</div>
               
               <div className="flex items-center mt-4 w-full px-2">
                  <div className="font-mono font-bold text-lg mr-2 shrink-0">|0⟩</div>
                  <div className="flex-grow min-w-[20px]"><Wire signalDelay={measuring ? 0 : undefined} /></div>
                  <div className="shrink-0"><Gate label="H" description="Hadamard Gate: Menciptakan superposisi" /></div>
                  <div className="flex-grow min-w-[40px]"><Wire signalDelay={measuring ? 500 : undefined} /></div>
                  <div className="shrink-0"><Measure /></div>
               </div>
            </div>

            <p className="text-sm text-gray-700 mt-4 leading-snug">
              Sirkuit menginisialisasi qubit ke <strong>|0⟩</strong>, menerapkan gerbang <strong>Hadamard (H)</strong> untuk membuat superposisi, lalu melakukan <strong>Pengukuran</strong>.
            </p>
          </div>
        </div>

        {/* Right Column: Visualization & Results */}
        <div className="flex flex-col h-full bg-gray-50 rounded-xl border border-gray-200 p-4 shadow-inner">
           
           <h3 className="font-bold text-gray-800 mb-2 text-center">
               Visualisasi Bola Bloch
               {blochState === '+' && <span className="ml-2 text-red-600 font-normal text-sm animate-pulse">(Superposisi)</span>}
               {blochState === 'random' && <span className="ml-2 text-purple-600 font-normal text-sm animate-pulse">(Mengukur...)</span>}
               {showResults && <span className="ml-2 text-blue-600 font-normal text-sm">(Collapse)</span>}
           </h3>
           
           {/* Bloch Sphere Container */}
           <div className="flex-1 relative min-h-[300px] bg-white rounded-lg border border-gray-200 mb-4">
              <BlochSphere state={blochState} />
           </div>

           {/* Measurement Results */}
           <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative">
              <h4 className="font-bold text-gray-900 text-sm mb-3 flex justify-between">
                 <span>Hasil Pengukuran (N=1000)</span>
                 {showResults && <span className="text-green-600 text-xs animate-pulse">Selesai ✓</span>}
              </h4>
              
              <div className="space-y-3">
                 {/* State 0 */}
                 <div>
                    <div className="flex justify-between text-xs font-mono font-bold text-gray-600 mb-1">
                       <span className="text-blue-600">|0⟩</span>
                       <span>{showResults ? '474' : '0'} (47.4%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                       <div 
                          className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: showResults ? '47.4%' : '0%' }}
                       ></div>
                    </div>
                 </div>

                 {/* State 1 */}
                 <div>
                    <div className="flex justify-between text-xs font-mono font-bold text-gray-600 mb-1">
                       <span className="text-amber-600">|1⟩</span>
                       <span>{showResults ? '526' : '0'} (52.6%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                       <div 
                          className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: showResults ? '52.6%' : '0%' }}
                       ></div>
                    </div>
                 </div>
              </div>

              <div className="mt-3 text-xs text-gray-500 italic border-t pt-2">
                 *Simulasi berjalan 1 kali untuk visualisasi, data statistik menunjukkan hasil dari 1000 shot.
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};