import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { OrbitControls, Preload,Decal,Float, useTexture,useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader'
const Ball = (props) => {
  const [decal]=useTexture([props.imgUrl])
  return (
    <Float>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0,0,0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1,1]} />
        <meshStandardMaterial color="#fff8eb" polygonOffset polygonOffsetFactor={-5} flatShading />
        <Decal
          position={[0,0,1]}
          rotation={[2 * Math.PI,0,6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  )
}
const BallCanvas = ({icon}) => {
  return (
    <Canvas
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
        />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  )

}
export default BallCanvas