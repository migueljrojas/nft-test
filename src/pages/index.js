import { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useScroll, animate } from "framer-motion";
import styles from '@/styles/Home.module.scss';
import { useSetState, useWindowSize } from "rooks";

const rootClass = 'gallery';

function genClassName(klass) {
  return styles[`${rootClass}${klass ? '__' + klass : ''}`];
}

export default function Home() {
  const [styles, setStyles] = useState(
    [
      {
        scale: 1,
        opacity: 1,
      },
      {
        scale: .8,
        opacity: 1,
      },
      {
        scale: .8,
        opacity: 1,
      },
      {
        scale: .6,
        opacity: 1,
      },
      {
        scale: .6,
        opacity: 1,
      },
      {
        scale: .5,
        opacity: 1,
      },
      {
        scale: .5,
        opacity: 1,
      },
      {
        scale: .3,
        opacity: 1,
      },
      {
        scale: .2,
        opacity: 1,
      },
      {
        scale: 1,
        opacity: 1,
      }
    ]
  );

  useEffect(() => {
    function handleZoom(e) {
      const range = e.deltaY > 1 ? 0.1 : -0.1;
      
      setStyles((prev) => (prev.map(({scale}) => {
        const scaleValue = scale + range;
        const opacityValue =
          scaleValue <= 0.3 ? .9 - ((scaleValue / range) * 0.3) : scaleValue >= 3.7 ?
            .9 - ((4 - scaleValue) / range) : 1;

        return ({
          scale: scaleValue <= 0 ? 0 : scaleValue >= 4 ? 4 : scaleValue,
          opacity: opacityValue <= 0 ? 0 : opacityValue > 1 ? 0 : opacityValue,
        });
      })));
    }

    window.addEventListener("wheel", handleZoom);

    return () => window.removeEventListener("wheel", handleZoom);
  }, []);


  const { innerWidth, innerHeight } = useWindowSize();

  const viewport = {
    x: innerWidth,
    y: innerHeight
  };

  const x = useMotionValue(viewport.x / 2);
  const y = useMotionValue(viewport.y / 2);

  const rotateX = useTransform(y, [0, viewport.y], [15, -15]);
  const rotateY = useTransform(x, [0, viewport.x], [-15, 15]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  function resetPosition() {
    animate(x, (viewport.x / 2));
    animate(y, (viewport.y / 2));
  }

  return (
    <>
      <Head>
        <title>NFT Studios - TEST</title>
        <meta name="description" content="Test using next.js app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.main
        className={genClassName('')}
      >
        <motion.div
          className={genClassName('wrapper')}
          onMouseMove={handleMouse}
          onMouseLeave={resetPosition}
          style={{perspective: viewport.x}}
        >
          <motion.section
            className={genClassName('intro')}
            style={{
              ...styles[0],
              rotateX: rotateX,
              rotateY: rotateY,
              transition: 'all .2s ease'
            }}
          >
            <h1 className={genClassName('title')}>Welcome to the AIC</h1>
            <p className={genClassName('desc')}> - Scroll to navigate -</p>
          </motion.section>
          {styles.map((imageStyle, idx) => {
            return (
              <motion.div
                className={genClassName('image')}
                key={`image-${idx}`}
                style={{
                  ...imageStyle,
                  zIndex: 100 - idx,
                  rotateX: rotateX,
                  rotateY: rotateY,
                  left: `${Math.random() * 400 + 400}px`,
                  top: `${Math.random() * 200 + 400}px`
                }}
              >
                <img
                  src={`https://picsum.photos/id/1${idx}0/1000/800`}
                  alt={`Image example ${idx}`}
                />
              </motion.div>
            )
          })}
        </motion.div>
        {/* <div id="imgGroup">
          <img src="https://picsum.photos/id/111/1000/800" data-x="200" data-y="250" alt="Vintage car" />
          <img src="https://picsum.photos/id/140/1000/800" data-x="-100" data-y="-150" alt="Bare tree" />
          <img src="https://picsum.photos/id/160/1000/800" data-x="-500" data-y="50" alt="Bottom edge of a phone" />
          <img src="https://picsum.photos/id/180/1000/800" data-x="-60" data-y="-10" alt="Laptop and Moleskine" />
          <img src="https://picsum.photos/id/198/1000/800" data-x="-200" data-y="-200" alt="Grassy hillside" />
          <img src="https://picsum.photos/id/210/1000/800" data-x="100" data-y="-150" alt="Bricks and mortar" />
          <img src="https://picsum.photos/id/220/1000/800" data-x="-300" data-y="50" alt="Foggy train tracks" />
          <img src="https://picsum.photos/id/240/1000/800" data-x="-50" data-y="-200" alt="Stairs to water" />
          <img src="https://picsum.photos/id/260/1000/800" data-x="-120" data-y="60" alt="Snowy mountain forest" />
          <img src="https://picsum.photos/id/280/1000/800" data-x="400" data-y="-100" alt="Rocky jetty" />
          <img src="https://picsum.photos/id/360/1000/800" data-x="-60" data-y="150" alt="Peachy flowers" />
          <img src="https://picsum.photos/id/320/1000/800" data-x="-200" data-y="200" alt="City street" />
          <img src="https://picsum.photos/id/340/1000/800" data-x="300" data-y="-120" alt="Mossy tree" />
        </div> */}
        
        <div id="detail">
          <div id="detailImg"></div>
          <div id="detailTxt"></div>
        </div>
      </motion.main>
    </>
  );
}
