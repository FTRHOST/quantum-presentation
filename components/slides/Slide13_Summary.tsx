import React from 'react';

export const Slide13_Summary = () => {
  return (
    <div className="h-full flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-blue-800 mb-10 text-center">Rangkuman Perjalanan: Dari Qubit ke Algoritma</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-white p-6 rounded-xl border-t-4 border-blue-500 shadow-lg flex flex-col items-center text-center">
           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-4">🔮</div>
           <h3 className="font-bold text-lg mb-2">Fondasi</h3>
           <p className="text-gray-600 text-sm">
             Membangun dan memvalidasi superposisi dan keterikatan (Bell State) secara komputasi.
           </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-t-4 border-yellow-500 shadow-lg flex flex-col items-center text-center">
           <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-3xl mb-4">⚡</div>
           <h3 className="font-bold text-lg mb-2">Keunggulan Kuantum</h3>
           <p className="text-gray-600 text-sm">
             Mendemonstrasikan bagaimana Algoritma Deutsch-Jozsa mengungguli pendekatan klasik (1 kueri vs 2).
           </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-t-4 border-green-500 shadow-lg flex flex-col items-center text-center">
           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mb-4">🔄</div>
           <h3 className="font-bold text-lg mb-2">Subrutin Kunci</h3>
           <p className="text-gray-600 text-sm">
             Mengimplementasikan QFT dan membuktikan reversibilitasnya sebagai blok pembangun algoritma kompleks.
           </p>
        </div>

      </div>

      <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
         <p className="text-gray-700 font-medium">
           "Kombinasi Cirq dan Qsim menyediakan platform yang kuat untuk mengubah teori abstrak menjadi hasil yang dapat direproduksi."
         </p>
      </div>
    </div>
  );
};