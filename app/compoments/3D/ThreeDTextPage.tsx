'use client';
import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, ThreeEvent, useThree } from '@react-three/fiber';
import { Text3D, Center, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface RandomCubesProps {
  count: number;
  size: number;
}

const RandomCubes: React.FC<RandomCubesProps> = ({ count, size }) => {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
          ]}
        >
          <icosahedronGeometry args={[size, 0]} />
          <meshStandardMaterial color='#fff' metalness={0.8} roughness={0.4} />
        </mesh>
      ))}
    </>
  );
};

function Movable3DText() {
  const mesh = useRef<THREE.Group>(null!);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y +=
        (mouse.current.x - mesh.current.rotation.y) * 0.05;
      mesh.current.rotation.x +=
        (mouse.current.y - mesh.current.rotation.x) * 0.05;
    }
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    mouse.current.x = (e.point.x / 5) * 1.6;
    mouse.current.y = (-e.point.y / 2) * 1.3;
  };

  const text = 'text => image';

  return (
    <group ref={mesh} onPointerMove={handlePointerMove}>
      <Center>
        <Text3D
          font='/fonts/Underdog_Regular.json'
          size={1.1}
          height={0.4}
          curveSegments={12}
          bevelEnabled
          bevelSize={0.08}
          bevelThickness={0.1}
        >
          {text}
          <meshPhysicalMaterial color='#fff' metalness={0.8} roughness={0.4} />
        </Text3D>
      </Center>
      <mesh position={[0, -0.7, 0]}>
        <planeGeometry args={[6, 3]} />
        <meshBasicMaterial color='black' transparent opacity={0} />
      </mesh>
      <directionalLight intensity={1} position={[5, 5, 5]} />
      <ambientLight intensity={0.5} />
      <RandomCubes count={100} size={1} />
    </group>
  );
}
function AdaptiveCamera() {
  const { camera, size } = useThree();

  const perspCam = camera as THREE.PerspectiveCamera;

  useEffect(() => {
    const updateCamera = () => {
      const { width } = size;

      if (width < 600) {
        // Мобильная версия
        perspCam.fov = 80;
        perspCam.position.z = 12;
      } else if (width < 928) {
        perspCam.fov = 70;
        perspCam.position.z = 11;
      } else {
        // Десктоп
        perspCam.fov = 60;
        perspCam.position.z = 8;
      }

      perspCam.updateProjectionMatrix(); // ВАЖНО: пересчитать матрицу проекции
    };

    updateCamera();

    // Можно повесить слушатель, но useThree уже обновляется при ресайзе
  }, [size, perspCam]);

  return null;
}

export default function ThreeDTextPage() {
  return (
    <Canvas>
      <AdaptiveCamera />
      <Movable3DText />
      <OrbitControls enablePan={false} rotateSpeed={0.2} zoomSpeed={1.0} />
    </Canvas>
  );
}
