import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface BlochSphereProps {
  state?: '0' | '1' | '+' | 'random';
}

export const BlochSphere: React.FC<BlochSphereProps> = ({ state = '0' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Refs for animation state
  const targetVectorRef = useRef(new THREE.Vector3(0, 1, 0)); 
  const currentVectorRef = useRef(new THREE.Vector3(0, 1, 0));
  const targetColorRef = useRef(new THREE.Color(0x2563eb));
  const currentColorRef = useRef(new THREE.Color(0x2563eb));
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
    
    // Set targets based on state
    if (state === '0') {
        targetVectorRef.current.set(0, 1, 0);
        targetColorRef.current.setHex(0x2563eb); // Blue
    } else if (state === '1') {
        targetVectorRef.current.set(0, -1, 0);
        targetColorRef.current.setHex(0xf59e0b); // Orange
    } else if (state === '+') {
        targetVectorRef.current.set(1, 0, 0);
        targetColorRef.current.setHex(0xdc2626); // Red
    } else if (state === 'random') {
        targetColorRef.current.setHex(0x9333ea); // Purple
    }
  }, [state]);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Scene Setup ---
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(3.5, 2, 4);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;

    // --- Geometry ---
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const radius = 1.5;
    const segments = 64;

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x1e40af, transparent: true, opacity: 0.15 });

    // Latitudes & Longitudes
    for (let i = 1; i < 6; i++) {
        const theta = (i * Math.PI) / 6;
        const r = radius * Math.sin(theta);
        const y = radius * Math.cos(theta);
        const geo = new THREE.BufferGeometry().setFromPoints(new THREE.Path().absarc(0, 0, r, 0, Math.PI * 2).getPoints(segments));
        geo.rotateX(Math.PI / 2); geo.translate(0, y, 0);
        sphereGroup.add(new THREE.Line(geo, lineMaterial));
    }
    for (let i = 0; i < 4; i++) {
        const geo = new THREE.BufferGeometry().setFromPoints(new THREE.Path().absarc(0, 0, radius, 0, Math.PI * 2).getPoints(segments));
        geo.rotateY((i * Math.PI) / 4);
        sphereGroup.add(new THREE.Line(geo, lineMaterial));
    }

    // Axes
    const axisMaterial = new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2, transparent: true });
    const axisGroup = new THREE.Group();
    axisGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -radius, 0), new THREE.Vector3(0, radius, 0)]), axisMaterial));
    axisGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-radius, 0, 0), new THREE.Vector3(radius, 0, 0)]), axisMaterial));
    axisGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -radius), new THREE.Vector3(0, 0, radius)]), axisMaterial));
    sphereGroup.add(axisGroup);

    // Dynamic Arrow
    const mainArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), radius, 0x2563eb, 0.3, 0.2);
    sphereGroup.add(mainArrow);

    // Ghost Arrows
    const ghost0 = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), radius, 0x2563eb, 0.3, 0.2);
    (ghost0.line.material as THREE.Material).opacity = 0.1; (ghost0.line.material as THREE.Material).transparent = true;
    (ghost0.cone.material as THREE.Material).opacity = 0.1; (ghost0.cone.material as THREE.Material).transparent = true;
    sphereGroup.add(ghost0);

    const ghost1 = new THREE.ArrowHelper(new THREE.Vector3(0,-1,0), new THREE.Vector3(0,0,0), radius, 0xf59e0b, 0.3, 0.2);
    (ghost1.line.material as THREE.Material).opacity = 0.1; (ghost1.line.material as THREE.Material).transparent = true;
    (ghost1.cone.material as THREE.Material).opacity = 0.1; (ghost1.cone.material as THREE.Material).transparent = true;
    sphereGroup.add(ghost1);

    // Poles
    const dotGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const northPole = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: 0x2563eb })); northPole.position.set(0, radius, 0); sphereGroup.add(northPole);
    const southPole = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: 0xf59e0b })); southPole.position.set(0, -radius, 0); sphereGroup.add(southPole);
    const plusPole = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: 0xdc2626 })); plusPole.position.set(radius, 0, 0); sphereGroup.add(plusPole);

    // --- Animation ---
    let frameId: number;

    const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();

        // Update Target for Random Mode
        if (stateRef.current === 'random') {
             const time = performance.now() * 0.003;
             // Smooth chaotic wandering
             targetVectorRef.current.set(
                 Math.sin(time * 2),
                 Math.sin(time * 3) * 0.9, 
                 Math.cos(time * 2)
             ).normalize();
        }

        // Interpolation (Smooth Transition)
        currentVectorRef.current.lerp(targetVectorRef.current, 0.1);
        currentColorRef.current.lerp(targetColorRef.current, 0.1);

        mainArrow.setDirection(currentVectorRef.current.normalize());
        mainArrow.setColor(currentColorRef.current);
        
        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        if (!mountRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        if (w && h) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
    };
    
    // Fix for ResizeObserver loop error
    const resizeObserver = new ResizeObserver(() => {
        window.requestAnimationFrame(handleResize);
    });
    resizeObserver.observe(mountRef.current);

    return () => {
        cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
        if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-full min-h-[300px] relative cursor-move">
        <div className="absolute top-4 right-4 text-xs font-mono text-gray-500 pointer-events-none bg-white/50 p-2 rounded backdrop-blur-sm select-none">
            <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 bg-blue-600 rounded-full"></div> |0⟩ Basis</div>
            <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 bg-red-600 rounded-full"></div> |+⟩ Superposisi</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded-full"></div> |1⟩ Basis</div>
            {state === 'random' && (
               <div className="flex items-center gap-2 mt-1 animate-pulse text-purple-700 font-bold"><div className="w-3 h-3 bg-purple-600 rounded-full"></div> Measuring...</div>
            )}
        </div>
    </div>
  );
};