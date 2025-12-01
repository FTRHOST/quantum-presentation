import React from 'react';
import { Book, FileText, Globe, Link } from 'lucide-react';

export const Slide16_References = () => {
  return (
    <div className="h-full flex flex-col justify-center max-w-5xl mx-auto overflow-y-auto min-h-0">
      <h2 className="text-3xl font-bold text-blue-900 mb-6 border-b-2 border-blue-100 pb-2 shrink-0">Daftar Pustaka</h2>

      <div className="space-y-4 overflow-y-auto pr-2 pb-4">
        
        {/* Nielsen & Chuang */}
        <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border-l-4 border-blue-600 shadow-sm">
           <div className="mt-1 text-blue-600"><Book size={18} /></div>
           <div>
             <h3 className="font-bold text-gray-900 text-sm">Quantum Computation and Quantum Information: 10th Anniversary Edition</h3>
             <p className="text-gray-600 text-xs italic">Nielsen, Michael A. and Chuang, Isaac L. (2010)</p>
             <p className="text-gray-500 text-[10px]">Cambridge University Press.</p>
           </div>
        </div>

        {/* Deutsch & Jozsa */}
        <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border-l-4 border-indigo-600 shadow-sm">
           <div className="mt-1 text-indigo-600"><FileText size={18} /></div>
           <div>
             <h3 className="font-bold text-gray-900 text-sm">Rapid solution of problems by quantum computation</h3>
             <p className="text-gray-600 text-xs italic">Deutsch, David and Jozsa, Richard (1992)</p>
             <p className="text-gray-500 text-[10px]">Proceedings of the Royal Society of London. Series A, 439(1907), 553-558.</p>
           </div>
        </div>

        {/* Einstein, Podolsky, Rosen */}
        <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border-l-4 border-purple-600 shadow-sm">
           <div className="mt-1 text-purple-600"><FileText size={18} /></div>
           <div>
             <h3 className="font-bold text-gray-900 text-sm">Can quantum-mechanical description of physical reality be considered complete?</h3>
             <p className="text-gray-600 text-xs italic">Einstein, A., Podolsky, B., and Rosen, N. (1935)</p>
             <p className="text-gray-500 text-[10px]">Physical Review, 47(10), 777.</p>
           </div>
        </div>

        {/* Shor */}
        <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border-l-4 border-green-600 shadow-sm">
           <div className="mt-1 text-green-600"><FileText size={18} /></div>
           <div>
             <h3 className="font-bold text-gray-900 text-sm">Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer</h3>
             <p className="text-gray-600 text-xs italic">Shor, Peter W. (1999)</p>
             <p className="text-gray-500 text-[10px]">SIAM Review, 41(2), 303-332.</p>
           </div>
        </div>

        {/* Cirq Announcement */}
        <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border-l-4 border-yellow-500 shadow-sm">
           <div className="mt-1 text-yellow-600"><Globe size={18} /></div>
           <div>
             <h3 className="font-bold text-gray-900 text-sm">Announcing Cirq: An Open Source Framework for NISQ Algorithms</h3>
             <p className="text-gray-600 text-xs italic">Alan Ho & Dave Bacon, Google AI Quantum Team (2018)</p>
             <a href="https://research.google/blog/announcing-cirq-an-open-source-framework-for-nisq-algorithms/" target="_blank" rel="noreferrer" className="text-blue-500 text-[10px] hover:underline flex items-center">
               <Link size={10} className="mr-1"/> research.google/blog...
             </a>
           </div>
        </div>

        {/* Qsim Blog */}
        <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border-l-4 border-red-500 shadow-sm">
           <div className="mt-1 text-red-600"><Globe size={18} /></div>
           <div>
             <h3 className="font-bold text-gray-900 text-sm">Researchers can use qsim to explore quantum algorithms</h3>
             <p className="text-gray-600 text-xs italic">Sergei Isakov, Google (2020)</p>
             <a href="https://blog.google/technology/ai/qsim-explore-quantum-algorithms/" target="_blank" rel="noreferrer" className="text-blue-500 text-[10px] hover:underline flex items-center">
               <Link size={10} className="mr-1"/> blog.google/technology...
             </a>
           </div>
        </div>

         {/* Second Quantum Revolution */}
         <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border-l-4 border-teal-500 shadow-sm">
           <div className="mt-1 text-teal-600"><FileText size={18} /></div>
           <div>
             <h3 className="font-bold text-gray-900 text-sm">The Second Quantum Revolution: Unexplored Facts and Latest News</h3>
             <p className="text-gray-600 text-xs italic">Intonti, K. et al. (2024)</p>
             <p className="text-gray-500 text-[10px]">Encyclopedia, 4(2), 630-671.</p>
           </div>
        </div>

      </div>
    </div>
  );
};