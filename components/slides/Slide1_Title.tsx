import React from 'react';

export const Slide1_Title = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div className="mb-6">
        <img 
          src="https://www.uinsalatiga.ac.id/wp-content/uploads/2022/12/2022-Web-UIN-Logo-1-1.png" 
          alt="Logo UIN Salatiga" 
          className="h-24 w-auto object-contain"
        />
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        Implementation and Analysis of Deutsch-Jozsa and QFT Algorithms on High-Performance Quantum Simulators
      </h1>
      
      <p className="text-blue-600 font-semibold mb-6">Teknologi Informasi</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl w-full">
        <div>
          <h3 className="font-bold text-lg text-gray-800">Muhammad Fathir Al Faruq</h3>
          <p className="text-gray-600">Faculty of Da’wah</p>
          <p className="text-gray-600">Universitas Islam Negeri Salatiga</p>
        </div>
        <div className="md:text-right">
          <h3 className="font-bold text-lg text-gray-800">Juwita Artanti Kusumaningtyas</h3>
          <p className="text-gray-600">Faculty of Da’wah</p>
          <p className="text-gray-600">Universitas Islam Negeri Salatiga</p>
        </div>
      </div>
    </div>
  );
};