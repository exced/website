import React, { useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import {
  Canvas,
  useThree,
  useRender,
  useLoader,
  useUpdate,
} from 'react-three-fiber';
import { useSpring, a, interpolate } from 'react-spring/three';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useThemeContext from '@theme/hooks/useThemeContext';
import styles from './styles.module.css';

const data = [
  {
    url: '/img/tech/javascript.png',
    x: -0.5585486420134362,
    y: -3.9373147490685803,
    factor: 5,
    z: 0,
    scale: 0.5,
  },
  {
    url: '/img/tech/typescript.png',
    x: 1.2658082998471168,
    y: -11.546249109522778,
    factor: 10,
    z: 0.25,
    scale: 0.5,
  },
  {
    url: '/img/tech/reason.png',
    x: -1.9467783978748945,
    y: -14.812371431221711,
    factor: 15,
    z: 0.25,
    scale: 0.5,
  },
];

function Text({ children, position, opacity, color, fontSize = 410 }) {
  const {
    size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight },
  } = useThree();
  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight;
  const canvas = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 2048;
    const context = canvas.getContext('2d');
    context.font = `bold ${fontSize}px -apple-system, "Segoe UI", avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = color;
    context.fillText(children, 1024, 1024 - 410 / 2);
    return canvas;
  }, [children, width, height, color]);

  return (
    <a.sprite scale={[scale, scale, 1]} position={position}>
      <a.spriteMaterial attach="material" transparent opacity={opacity}>
        <canvasTexture
          attach="map"
          image={canvas}
          premultiplyAlpha
          onUpdate={s => (s.needsUpdate = true)}
        />
      </a.spriteMaterial>
    </a.sprite>
  );
}

function Image({ url, opacity, scale, ...props }) {
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
  const [hovered, setHover] = useState(false);
  const hover = useCallback(() => setHover(true), []);
  const unhover = useCallback(() => setHover(false), []);
  const { factor } = useSpring({ factor: hovered ? 1.1 : 1 });
  return (
    <a.mesh
      {...props}
      onHover={hover}
      onUnhover={unhover}
      scale={factor.interpolate(f => [scale * f, scale * f, 1])}
    >
      <planeBufferGeometry attach="geometry" args={[5, 5]} />
      <a.meshLambertMaterial attach="material" transparent opacity={opacity}>
        <primitive attach="map" object={texture} />
      </a.meshLambertMaterial>
    </a.mesh>
  );
}

function Images({ top, mouse, scrollMax }) {
  return (
    <>
      {data.map((e, index) => {
        const { url, x, y, factor, z, scale } = e;
        return (
          <Image
            key={index}
            url={url}
            scale={scale}
            opacity={top.interpolate([0, 500], [0, 1])}
            position={interpolate([top, mouse], (top, mouse) => [
              (-mouse[0] * factor) / 50000 + x,
              (mouse[1] * factor) / 50000 +
                y * 1.15 +
                ((top * factor) / scrollMax) * 2,
              z + top / 2000,
            ])}
          />
        );
      })}
    </>
  );
}

function Background({ color }) {
  const { viewport } = useThree();
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <a.meshBasicMaterial attach="material" color={color} depthTest={false} />
    </mesh>
  );
}

function Scene({ top, mouse, isDark }) {
  const { size } = useThree();
  const scrollMax = size.height * 4.5;
  const backgroundColors = isDark
    ? ['#1e2125', '#34b5e9', '#a2ddf5;', '#d9f1fb', '#f8f3f1']
    : ['#f8f3f1', '#d9f1fb', '#a2ddf5', '#34b5e9', , '#1e2125'];
  const color = isDark ? '#f8f3f1' : '#1e2125';

  return (
    <>
      <a.spotLight
        intensity={1.2}
        color="white"
        position={mouse.interpolate((x, y) => [x / 100, -y / 100, 6.5])}
      />
      <Background
        color={top.interpolate(
          [0, scrollMax * 0.25, scrollMax * 0.8, scrollMax],
          backgroundColors
        )}
      />
      <Images top={top} mouse={mouse} scrollMax={scrollMax} />
      <Text
        color={color}
        fontSize={100}
        opacity={top.interpolate([0, 200], [1, 0])}
        position={top.interpolate(top => [0, -1 + top / 200, 0])}
      >
        Thomas Barras
      </Text>

      <Text
        color={color}
        fontSize={70}
        opacity={top.interpolate([0, 200], [1, 0])}
        position={top.interpolate(top => [0, -1.8, 0])}
      >
        Software Engineer
      </Text>
    </>
  );
}

function Main({ top, mouse }) {
  const { isDarkTheme } = useThemeContext();
  return (
    <Canvas
      style={{ position: 'absolute', top: 0, pointerEvents: 'none' }}
      shadowMap={true}
    >
      <Scene top={top} mouse={mouse} isDark={isDarkTheme} />
    </Canvas>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const [{ top, mouse }, set] = useSpring(() => ({ top: 0, mouse: [0, 0] }));
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      set({ mouse: [x - window.innerWidth / 2, y - window.innerHeight / 2] }),
    []
  );
  const onScroll = useCallback(e => set({ top: e.target.scrollTop }), []);

  return (
    <Layout
      className={classnames(styles.wrapper)}
      title={siteConfig.title}
      description="Thomas Barras personal website"
    >
      <Main top={top} mouse={mouse} />
      <div
        className={classnames(styles.scrollContainer)}
        onScroll={onScroll}
        onMouseMove={onMouseMove}
      >
        <div style={{ height: '525vh' }} />
      </div>
    </Layout>
  );
}

export default Home;
