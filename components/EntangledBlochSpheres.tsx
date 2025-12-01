import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface EntangledSpheresProps {
  visible: boolean;
  measurementState: 'none' | 'zero' | 'one';
  step?: number; // 0=Init, 1=Hadamard, 2=CNOT, 3=MeasureLoop
}

export const EntangledBlochSpheres: React.FC<EntangledSpheresProps> = ({ visible, measurementState, step = 0 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // State Refs
  const stepRef = useRef(0);
  const measureStateRef = useRef(measurementState);
  
  // Animation Targets
  const targetVec1Ref = useRef(new THREE.Vector3(0, 1, 0));
  const targetVec2Ref = useRef(new THREE.Vector3(0, 1, 0));
  const curVec1Ref = useRef(new THREE.Vector3(0, 1, 0));
  const curVec2Ref = useRef(new THREE.Vector3(0, 1, 0));
  
  const targetColor1Ref = useRef(new THREE.Color(0x2563eb));
  const targetColor2Ref = useRef(new THREE.Color(0x2563eb));
  const curColor1Ref = useRef(new THREE.Color(0x2563eb));
  const curColor2Ref = useRef(new THREE.Color(0x2563eb));

  // Scene Object Refs
  const arrow1Ref = useRef<THREE.ArrowHelper | null>(null);
  const arrow2Ref = useRef<THREE.ArrowHelper | null>(null);
  const linkRef = useRef<THREE.Line | null>(null);
  const particleRef = useRef<THREE.Mesh | null>(null);
  const labelRef = useRef<THREE.Sprite | null>(null);

  useEffect(() => { stepRef.current = step; }, [step]);
  useEffect(() => { measureStateRef.current = measurementState; }, [measurementState]);

  useEffect(() => {
    if (!mountRef.current || !visible) return;

    // --- Scene Setup ---
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 9);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    // --- Sphere Factory ---
    const createSphere = (x: number) => {
      const g = new THREE.Group();
      g.position.x = x;
      const r = 1.2;
      const segments = 32;
      const lineMat = new THREE.LineBasicMaterial({ color: 0x1e40af, transparent: true, opacity: 0.15 });

      for (let i = 1; i < 6; i++) {
          const t = (i * Math.PI) / 6;
          const rad = r * Math.sin(t);
          const y = r * Math.cos(t);
          const geo = new THREE.BufferGeometry().setFromPoints(new THREE.Path().absarc(0, 0, rad, 0, Math.PI * 2).getPoints(segments));
          geo.rotateX(Math.PI / 2); geo.translate(0, y, 0); g.add(new THREE.Line(geo, lineMat));
      }
      for (let i = 0; i < 4; i++) {
          const geo = new THREE.BufferGeometry().setFromPoints(new THREE.Path().absarc(0, 0, r, 0, Math.PI * 2).getPoints(segments));
          geo.rotateY((i * Math.PI) / 4); g.add(new THREE.Line(geo, lineMat));
      }
      
      const arrow = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), r, 0x2563eb, 0.3, 0.2);
      g.add(arrow);
      return { g, arrow };
    };

    const s1 = createSphere(-1.8);
    const s2 = createSphere(1.8);
    scene.add(s1.g);
    scene.add(s2.g);
    arrow1Ref.current = s1.arrow;
    arrow2Ref.current = s2.arrow;

    // --- Link Visuals ---
    const linkGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.8, 0, 0), new THREE.Vector3(1.8, 0, 0)]);
    const linkMat = new THREE.LineBasicMaterial({ color: 0xec4899, linewidth: 2, transparent: true, opacity: 0 });
    const link = new THREE.Line(linkGeo, linkMat);
    scene.add(link);
    linkRef.current = link;

    const pGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const pMat = new THREE.MeshBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0 });
    const particle = new THREE.Mesh(pGeo, pMat);
    scene.add(particle);
    particleRef.current = particle;



    // --- Animation Loop ---
    let frameId: number;
    let particlePhase = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();

      const step = stepRef.current;
      const ms = measureStateRef.current;

      // --- LOGIC FOR TARGETS ---
      if (step === 0) {
          // Init: |0⟩ |0⟩ (Blue)
          targetVec1Ref.current.set(0, 1, 0);
          targetVec2Ref.current.set(0, 1, 0);
          targetColor1Ref.current.setHex(0x2563eb);
          targetColor2Ref.current.setHex(0x2563eb);
          
          if (linkRef.current) (linkRef.current.material as THREE.Material).opacity = 0;
          if (particleRef.current) (particleRef.current.material as THREE.Material).opacity = 0;
          if (labelRef.current) labelRef.current.material.opacity = 0;

      } else if (step === 1) {
          // Hadamard q0: |+⟩ |0⟩ (Red, Blue)
          targetVec1Ref.current.set(1, 0, 0);
          targetVec2Ref.current.set(0, 1, 0);
          targetColor1Ref.current.setHex(0xdc2626);
          targetColor2Ref.current.setHex(0x2563eb);

      } else if (step === 2) {
          // CNOT -> Entanglement
          // Visually set BOTH to |+⟩ (Red) to show they are "active/linked" and mixed
          // This ensures both jump when measurement starts
          targetVec1Ref.current.set(1, 0, 0);
          targetVec2Ref.current.set(1, 0, 0);
          targetColor1Ref.current.setHex(0xdc2626);
          targetColor2Ref.current.setHex(0xdc2626);

          if (linkRef.current) (linkRef.current.material as THREE.Material).opacity = 1;
          if (particleRef.current) (particleRef.current.material as THREE.Material).opacity = 1;
          if (labelRef.current) labelRef.current.material.opacity = 1;

      } else if (step >= 3) {
          // Measurement Loop
          if (ms === 'zero') {
              // Both UP (|00⟩)
              targetVec1Ref.current.set(0, 1, 0);
              targetVec2Ref.current.set(0, 1, 0);
              targetColor1Ref.current.setHex(0x10b981); // Green
              targetColor2Ref.current.setHex(0x10b981);
          } else {
              // Both DOWN (|11⟩)
              targetVec1Ref.current.set(0, -1, 0);
              targetVec2Ref.current.set(0, -1, 0);
              targetColor1Ref.current.setHex(0xf59e0b); // Orange
              targetColor2Ref.current.setHex(0xf59e0b);
          }
      }

      // --- SMOOTH INTERPOLATION ---
      const speed = 0.1;
      curVec1Ref.current.lerp(targetVec1Ref.current, speed);
      curVec2Ref.current.lerp(targetVec2Ref.current, speed);
      
      curColor1Ref.current.lerp(targetColor1Ref.current, speed);
      curColor2Ref.current.lerp(targetColor2Ref.current, speed);

      // Apply
      if (arrow1Ref.current) {
          arrow1Ref.current.setDirection(curVec1Ref.current.normalize());
          arrow1Ref.current.setColor(curColor1Ref.current);
      }
      if (arrow2Ref.current) {
          arrow2Ref.current.setDirection(curVec2Ref.current.normalize());
          arrow2Ref.current.setColor(curColor2Ref.current);
      }

      // Link Particle
      if (step >= 2) {
          particlePhase += 0.05;
          if (particleRef.current) particleRef.current.position.x = Math.sin(particlePhase) * 1.8;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        if (!mountRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        if(w && h) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
    };
    const ro = new ResizeObserver(() => window.requestAnimationFrame(handleResize));
    ro.observe(mountRef.current);

    return () => {
        cancelAnimationFrame(frameId);
        ro.disconnect();
        if(mountRef.current) mountRef.current.innerHTML = '';
        renderer.dispose();
    };
  }, [visible]);

  if (!visible) return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200">
        <div className="text-gray-400 font-mono text-sm animate-pulse">Menunggu inisialisasi kode...</div>
    </div>
  );

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl overflow-hidden border border-gray-200">
       <div ref={mountRef} className="w-full h-full" />
       
       <div className="absolute top-4 left-4 flex flex-col space-y-2 text-xs font-mono text-gray-500 pointer-events-none select-none">
          <div className="flex items-center"><div className={`w-3 h-3 rounded-full mr-2 ${step >= 1 ? 'bg-red-500' : 'bg-blue-600'}`}></div> Qubit A (q0)</div>
          <div className="flex items-center"><div className={`w-3 h-3 rounded-full mr-2 ${step >= 2 ? 'bg-red-500' : 'bg-blue-600'}`}></div> Qubit B (q1)</div>
       </div>
    </div>
  );
};