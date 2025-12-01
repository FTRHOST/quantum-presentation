import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface ResultBlochSphereProps {
  targetState: 'superposition' | 'zero' | 'one';
  shots?: number;
}

export const ResultBlochSphere: React.FC<ResultBlochSphereProps> = ({ targetState, shots = 1000 }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Scene Setup ---
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2, 1.5, 3);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;

    // --- Sphere Geometry ---
    const group = new THREE.Group();
    scene.add(group);
    
    const radius = 1.2;
    const segments = 32;

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x1e40af, transparent: true, opacity: 0.2 });
    
    for (let i = 1; i < 6; i++) {
        const theta = (i * Math.PI) / 6;
        const r = radius * Math.sin(theta);
        const y = radius * Math.cos(theta);
        const geo = new THREE.BufferGeometry().setFromPoints(
            new THREE.Path().absarc(0, 0, r, 0, Math.PI * 2).getPoints(segments)
        );
        geo.rotateX(Math.PI / 2);
        geo.translate(0, y, 0);
        group.add(new THREE.Line(geo, lineMaterial));
    }
    
    for (let i = 0; i < 4; i++) {
        const geo = new THREE.BufferGeometry().setFromPoints(
            new THREE.Path().absarc(0, 0, radius, 0, Math.PI * 2).getPoints(segments)
        );
        geo.rotateY((i * Math.PI) / 4);
        group.add(new THREE.Line(geo, lineMaterial));
    }

    // Poles
    const poleGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const poleMat = new THREE.MeshBasicMaterial({ color: 0x1e3a8a });
    const poleN = new THREE.Mesh(poleGeo, poleMat); poleN.position.y = radius;
    const poleS = new THREE.Mesh(poleGeo, poleMat); poleS.position.y = -radius;
    group.add(poleN, poleS);

    // Arrow
    const arrowDir = new THREE.Vector3(1, 0, 0); 
    const arrow = new THREE.ArrowHelper(arrowDir, new THREE.Vector3(0,0,0), radius, 0xf59e0b, 0.3, 0.2);
    group.add(arrow);

    // --- Animation ---
    let frameId: number;
    let currentAngle = 0; // 0 = |+>, PI/2 = |0>, -PI/2 = |1>

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();

      let targetAngle = 0;
      if (targetState === 'zero') targetAngle = Math.PI / 2;
      if (targetState === 'one') targetAngle = -Math.PI / 2;
      
      const speed = 0.05;
      if (Math.abs(currentAngle - targetAngle) > 0.001) {
          currentAngle += (targetAngle - currentAngle) * speed;
      }

      const x = Math.cos(currentAngle);
      const y = Math.sin(currentAngle);
      const dir = new THREE.Vector3(x, y, 0).normalize();
      arrow.setDirection(dir);
      
      if (targetState !== 'superposition') {
          arrow.setColor(0x10b981);
      } else {
          arrow.setColor(0xf59e0b);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
        if (!mountRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', handleResize);
        if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
    };
  }, [targetState]);

  return (
    <div className="w-full h-full relative">
       <div ref={mountRef} className="w-full h-full" />
       
       <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded shadow text-xs font-mono border border-gray-200">
           Shots: {shots}<br/>
           Result: {targetState === 'zero' ? '|0⟩ (100%)' : targetState === 'one' ? '|1⟩ (100%)' : 'Calculating...'}
       </div>
    </div>
  );
};
