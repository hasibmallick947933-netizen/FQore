'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ChromeCrystalCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.015);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 38);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 1. Crystal Chrome Ribbon Mesh (faceted Torus Knot wave)
    const geometry = new THREE.TorusKnotGeometry(11, 2.6, 220, 24, 2, 3);
    
    // Facet look: compute flat vertex normals for crystalline reflection
    geometry.computeVertexNormals();

    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x90caf9,
      emissive: 0x031926,
      roughness: 0.12,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
      flatShading: true,
    });

    const crystalMesh = new THREE.Mesh(geometry, chromeMaterial);
    scene.add(crystalMesh);

    // 2. Glowing Inner Wireframe Layer
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMat);
    wireframeMesh.scale.set(1.01, 1.01, 1.01);
    scene.add(wireframeMesh);

    // 3. Floating Cyan & White Particle Field
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 80;
      particlePositions[i + 1] = (Math.random() - 0.5) * 50;
      particlePositions[i + 2] = (Math.random() - 0.5) * 40;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.4,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 4. Dramatic Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.5);
    scene.add(ambientLight);

    const cyanLight1 = new THREE.PointLight(0x00f0ff, 12, 120);
    cyanLight1.position.set(25, 15, 20);
    scene.add(cyanLight1);

    const blueLight2 = new THREE.PointLight(0x2563eb, 10, 100);
    blueLight2.position.set(-25, -15, 15);
    scene.add(blueLight2);

    const whiteSpecular = new THREE.DirectionalLight(0xffffff, 4.0);
    whiteSpecular.position.set(0, 30, 25);
    scene.add(whiteSpecular);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
    rimLight.position.set(0, -25, -20);
    scene.add(rimLight);

    // Animation & Scroll State
    let animationFrameId: number;
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);

    // Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.08;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate 3D crystal directly responsive to scroll + continuous subtle drift
      const scrollRotationY = scrollY * 0.0025;
      const scrollRotationX = scrollY * 0.0012;
      const scrollPositionY = -scrollY * 0.015;

      crystalMesh.rotation.y = scrollRotationY + elapsedTime * 0.15 + mouseX * 0.3;
      crystalMesh.rotation.x = scrollRotationX + Math.sin(elapsedTime * 0.25) * 0.15 + mouseY * 0.2;
      crystalMesh.rotation.z = Math.cos(elapsedTime * 0.2) * 0.1;
      crystalMesh.position.y = scrollPositionY;

      wireframeMesh.rotation.copy(crystalMesh.rotation);
      wireframeMesh.position.copy(crystalMesh.position);

      // Rotate particles with scroll
      particleSystem.rotation.y = scrollRotationY * 0.5 + elapsedTime * 0.04;
      particleSystem.rotation.x = scrollRotationX * 0.3;

      // Dynamic light movements for shimmering chrome facets
      cyanLight1.position.x = Math.sin(elapsedTime * 0.7) * 30;
      cyanLight1.position.y = Math.cos(elapsedTime * 0.5) * 20;

      blueLight2.position.x = -Math.cos(elapsedTime * 0.6) * 30;
      blueLight2.position.y = -Math.sin(elapsedTime * 0.8) * 20;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      geometry.dispose();
      chromeMaterial.dispose();
      wireframeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
};
