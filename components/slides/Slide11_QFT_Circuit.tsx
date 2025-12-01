import React from 'react';
import { Gate, Wire, ControlDot, Swap } from '../CircuitComponents';

export const Slide11_QFT_Circuit = () => {
  return (
    <div className="h-full flex flex-col">
       <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">Blueprint Sirkuit QFT 3-Qubit</h2>
       <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Implementasi langsung dari definisi matematis menggunakan gerbang Hadamard (H), Controlled-Phase (@), dan Swap.</p>
       
       <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-lg p-8 overflow-x-auto flex items-center justify-center relative">
          
          {/* CSS Grid for Rigid Alignment */}
          <div className="grid grid-rows-3 gap-y-12" style={{ gridTemplateColumns: 'repeat(8, 80px)' }}>
             
             {/* --- Vertical Connections (Absolute Overlays) --- */}
             {/* Using absolute position relative to the grid container would be hard, 
                 so we will render vertical lines inside specific cells using relative positioning with full height. */}

             {/* === ROW 1: Qubit (0,0) === */}
             
             {/* Col 0: Label */}
             <div className="flex items-center justify-center col-span-1"><span className="font-bold font-mono text-xl text-gray-600">(0,0)</span></div>
             {/* Col 1: H */}
             <div className="flex items-center relative"><Wire /><Gate label="H" /><Wire /></div>
             {/* Col 2: Control for q1 */}
             <div className="flex items-center justify-center relative">
                 <div className="absolute w-full h-0.5 bg-gray-800"></div>
                 <ControlDot />
                 {/* Line down to Row 2 (q1) */}
                 <div className="absolute top-1/2 left-1/2 w-0.5 bg-black h-[calc(100%+48px)] -translate-x-1/2 z-0"></div>
             </div>
             {/* Col 3: Control for q2 */}
             <div className="flex items-center justify-center relative">
                 <div className="absolute w-full h-0.5 bg-gray-800"></div>
                 <ControlDot />
                 {/* Line down to Row 3 (q2) */}
                 <div className="absolute top-1/2 left-1/2 w-0.5 bg-black h-[calc(200%+96px)] -translate-x-1/2 z-0"></div>
             </div>
             {/* Col 4: Wire */}
             <div className="flex items-center relative"><Wire /></div>
             {/* Col 5: Wire */}
             <div className="flex items-center relative"><Wire /></div>
             {/* Col 6: Wire */}
             <div className="flex items-center relative"><Wire /></div>
             {/* Col 7: SWAP Top */}
             <div className="flex items-center justify-center relative">
                 <div className="absolute w-full h-0.5 bg-gray-800"></div>
                 <div className="relative z-10 text-2xl font-bold bg-white rounded-full px-1">×</div>
                 {/* Line down to Row 3 (q2) */}
                 <div className="absolute top-1/2 left-1/2 w-0.5 bg-black h-[calc(200%+96px)] -translate-x-1/2 z-0"></div>
             </div>

             {/* === ROW 2: Qubit (0,1) === */}

             {/* Col 0: Label */}
             <div className="flex items-center justify-center col-span-1"><span className="font-bold font-mono text-xl text-gray-600">(0,1)</span></div>
             {/* Col 1: Wire */}
             <div className="flex items-center relative"><Wire /></div>
             {/* Col 2: Target (Control) from q0 */}
             <div className="flex items-center justify-center relative">
                 <div className="absolute w-full h-0.5 bg-gray-800"></div>
                 <ControlDot />
             </div>
             {/* Col 3: Cross Wire (q0 to q2) */}
             <div className="flex items-center justify-center relative">
                 <div className="absolute w-full h-0.5 bg-gray-800"></div>
                 {/* The vertical line from Row 1 passes through here (handled by Row 1's height) */}
             </div>
             {/* Col 4: H */}
             <div className="flex items-center relative"><Wire /><Gate label="H" /><Wire /></div>
             {/* Col 5: Control for q2 */}
             <div className="flex items-center justify-center relative">
                 <div className="absolute w-full h-0.5 bg-gray-800"></div>
                 <ControlDot />
                 {/* Line down to Row 3 (q2) */}
                 <div className="absolute top-1/2 left-1/2 w-0.5 bg-black h-[calc(100%+48px)] -translate-x-1/2 z-0"></div>
             </div>
             {/* Col 6: Wire */}
             <div className="flex items-center relative"><Wire /></div>
             {/* Col 7: Cross Wire (SWAP) */}
             <div className="flex items-center relative"><Wire /></div>


             {/* === ROW 3: Qubit (0,2) === */}

             {/* Col 0: Label */}
             <div className="flex items-center justify-center col-span-1"><span className="font-bold font-mono text-xl text-gray-600">(0,2)</span></div>
             {/* Col 1: Wire */}
             <div className="flex items-center relative"><Wire /></div>
             {/* Col 2: Wire */}
             <div className="flex items-center relative"><Wire /></div>
             {/* Col 3: Target for CR3 (from q0) */}
             <div className="flex items-center justify-center relative group">
                 <div className="absolute w-full h-0.5 bg-gray-800"></div>
                 <div className="bg-white px-1 relative z-10 border border-black rounded text-xs font-bold shadow-sm cursor-help">@^0.5</div>
             </div>
             {/* Col 4: Wire */}
             <div className="flex items-center relative"><Wire /></div>
             {/* Col 5: Target for CR2 (from q1) */}
             <div className="flex items-center justify-center relative">
                 <div className="absolute w-full h-0.5 bg-gray-800"></div>
                 <ControlDot />
             </div>
             {/* Col 6: H */}
             <div className="flex items-center relative"><Wire /><Gate label="H" /><Wire /></div>
             {/* Col 7: SWAP Bottom */}
             <div className="flex items-center justify-center relative">
                 <div className="absolute w-full h-0.5 bg-gray-800"></div>
                 <div className="relative z-10 text-2xl font-bold bg-white rounded-full px-1">×</div>
             </div>

          </div>
       </div>

       <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
            <span className="font-bold text-blue-800 text-lg block mb-2">1. Hadamard (H)</span>
            Gerbang H menciptakan superposisi, diterapkan secara berurutan pada setiap qubit.
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 shadow-sm">
            <span className="font-bold text-indigo-800 text-lg block mb-2">2. Controlled-Phase (@)</span>
            Rotasi fase terkontrol antar qubit. Garis vertikal menunjukkan qubit mana yang terhubung.
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm">
            <span className="font-bold text-gray-800 text-lg block mb-2">3. SWAP (×)</span>
            Gerbang SWAP di akhir sirkuit membalik urutan qubit (0 ↔ 2) untuk menyesuaikan output QFT.
          </div>
       </div>
    </div>
  );
};