import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // ── Morphing icosphere ──────────────────────────────────────────
    const icoGeo  = new THREE.IcosahedronGeometry(1.9, 5);
    const origPos = new Float32Array(icoGeo.attributes.position.array);

    const surfaceMat = new THREE.MeshPhongMaterial({
      color: 0xC9A227,
      emissive: 0x1a1000,
      transparent: true,
      opacity: 0.07,
      side: THREE.FrontSide,
      shininess: 80,
    });
    const icoMesh = new THREE.Mesh(icoGeo, surfaceMat);
    scene.add(icoMesh);

    // Wireframe (low-poly, sharp)
    const wireGeo = new THREE.IcosahedronGeometry(1.92, 2);
    const edgeGeo = new THREE.EdgesGeometry(wireGeo);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xC9A227, transparent: true, opacity: 0.22 });
    const wireMesh = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(wireMesh);

    // Inner glow sphere
    const innerGeo = new THREE.SphereGeometry(1.5, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xC9A227, transparent: true, opacity: 0.04, side: THREE.BackSide });
    scene.add(new THREE.Mesh(innerGeo, innerMat));

    // ── Surface particles ────────────────────────────────────────────
    const N = 240;
    const pPos = new Float32Array(N * 3);
    const pSpeeds = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r     = 1.95 + Math.random() * 0.3;
      pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
      pSpeeds[i] = 0.3 + Math.random() * 0.7;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00C8A8, size: 0.028, transparent: true, opacity: 0.55 });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // ── Lights ───────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xC9A227, 0.3));
    const light1 = new THREE.PointLight(0xC9A227, 3, 12);
    light1.position.set(4, 3, 4);
    scene.add(light1);
    const light2 = new THREE.PointLight(0x00C8A8, 2, 10);
    light2.position.set(-3, -2, 3);
    scene.add(light2);
    const light3 = new THREE.PointLight(0x6060ff, 1.5, 8);
    light3.position.set(0, -4, -2);
    scene.add(light3);

    // ── Ring accent ───────────────────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(2.4, 0.008, 4, 128);
    const ringMat = new THREE.LineBasicMaterial({ color: 0xC9A227, transparent: true, opacity: 0.12 });
    const ring = new THREE.LineLoop(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    scene.add(ring);

    // ── Mouse parallax ────────────────────────────────────────────────
    let tX = 0, tY = 0;
    const onMouse = (e: MouseEvent) => {
      tX = (e.clientX / window.innerWidth  - 0.5) * 2;
      tY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    // ── Render loop ───────────────────────────────────────────────────
    let animId: number;
    let t = 0;
    const pos = icoGeo.attributes.position as THREE.BufferAttribute;
    let rotX = 0, rotY = 0;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      t += 0.0045;

      // Morph icosphere with layered sine waves → organic pulsing
      for (let i = 0; i < origPos.length; i += 3) {
        const ox = origPos[i], oy = origPos[i + 1], oz = origPos[i + 2];
        const d =
          Math.sin(ox * 2.2 + t * 1.1) * 0.14 +
          Math.sin(oy * 2.6 + t * 0.9) * 0.11 +
          Math.sin(oz * 1.9 + t * 1.4) * 0.09 +
          Math.sin((ox + oy) * 1.6 + t * 0.7) * 0.06 +
          Math.sin((oy + oz) * 2.0 + t * 1.2) * 0.05;
        const s = 1 + d;
        pos.setXYZ(i / 3, ox * s, oy * s, oz * s);
      }
      pos.needsUpdate = true;
      icoGeo.computeVertexNormals();

      // Smooth mouse-driven tilt
      rotX += (tY * 0.35 - rotX) * 0.045;
      rotY += (tX * 0.35 - rotY) * 0.045;

      icoMesh.rotation.y  += 0.0025 + rotY * 0.012;
      icoMesh.rotation.x   = rotX * 0.4;
      wireMesh.rotation.y  = icoMesh.rotation.y * 0.65;
      wireMesh.rotation.x  = icoMesh.rotation.x;
      wireMesh.rotation.z += 0.001;
      points.rotation.y    = icoMesh.rotation.y * 0.45;
      points.rotation.x    = icoMesh.rotation.x;
      ring.rotation.y     += 0.003;
      ring.rotation.z     += 0.001;

      // Pulse light intensity
      light1.intensity = 3 + Math.sin(t * 2.3) * 0.5;
      light2.intensity = 2 + Math.sin(t * 1.7 + 1) * 0.4;

      renderer.render(scene, camera);
    };
    tick();

    // ── Resize ────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      ro.disconnect();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
      [icoGeo, surfaceMat, edgeGeo, edgeMat, wireGeo, innerGeo, innerMat,
       pGeo, pMat, ringGeo, ringMat].forEach((o) => o.dispose());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
