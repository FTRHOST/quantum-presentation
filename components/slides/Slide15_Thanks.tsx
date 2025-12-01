import React from 'react';

export const Slide15_Thanks = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-white to-blue-50">
      
      <div className="mb-12 animate-bounce">
         <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl text-white text-4xl">
           👋
         </div>
      </div>

      <h2 className="text-5xl md:text-7xl font-bold text-blue-900 mb-6 tracking-tight">
        Terima Kasih
      </h2>
      
      <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed mb-12">
        Atas perhatian dan antusiasme Anda dalam menjelajahi dunia komputasi kuantum.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
         <div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Muhammad Fathir Al Faruq</h3>
            <p className="text-blue-600 font-mono text-sm">fathironmy4@gmail.com</p>
         </div>
         <div className="md:text-right">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Universitas Islam Negeri Salatiga</h3>
            <p className="text-gray-500 text-sm">Fakultas Dakwah / Teknologi Informasi</p>
         </div>
      </div>

      <div className="mt-16 text-gray-400 text-sm font-mono">
        Dibuat dengan React, Cirq, dan Qsim.
      </div>
    </div>
  );
};