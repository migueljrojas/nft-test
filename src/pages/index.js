import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
	motion,
	useMotionValue,
	useTransform,
	animate
} from 'framer-motion';
import styles from '@/styles/Home.module.scss';
import { useWindowSize } from 'rooks';

const rootClass = 'gallery';

function genClassName(klass) {
	return styles[`${rootClass}${klass ? '__' + klass : ''}`];
}

export default function Home() {
	const [imageStyles, setImageStyles] = useState([
		{
			scale: 1,
			coordinates: {
				x: getCoordinate(300, 600),
				y: getCoordinate(200, 300)
			}
		},
		{
			scale: 0,
			coordinates: {
				x: getCoordinate(300, 600),
				y: getCoordinate(200, 300)
			}
		},
		{
			scale: 0,
			coordinates: {
				x: getCoordinate(300, 600),
				y: getCoordinate(200, 300)
			}
		},
		{
			scale: 0,
			opacity: 0,
			coordinates: {
				x: getCoordinate(300, 600),
				y: getCoordinate(200, 300)
			}
		},
		{
			scale: 0,
			coordinates: {
				x: getCoordinate(300, 600),
				y: getCoordinate(200, 300)
			}
		},
		{
			scale: 0,
			coordinates: {
				x: getCoordinate(300, 600),
				y: getCoordinate(200, 300)
			}
		},
		{
			scale: 0,
			coordinates: {
				x: getCoordinate(300, 600),
				y: getCoordinate(200, 300)
			}
		},
		{
			scale: 0,
			coordinates: {
				x: getCoordinate(300, 600),
				y: getCoordinate(200, 300)
			}
		},
		{
			scale: 0,
			coordinates: {
				x: getCoordinate(300, 600),
				y: getCoordinate(200, 300)
			}
		},
		{
			scale: 0,
			coordinates: {
				x: getCoordinate(300, 600),
				y: getCoordinate(200, 300)
			}
		},
    {
			scale: 0,
			coordinates: {
				x: getCoordinate(300, 600),
				y: getCoordinate(200, 300)
			}
		}
	]);

	function getCoordinate(min, max) {
		return Math.random() * max + min;
	}

	useEffect(() => {
		function handleZoom(e) {
			const range = e.deltaY > 1 ? 0.1 : -0.1;

			setImageStyles(prev =>
				prev.map(({ scale, coordinates }, index, arr) => {
          const scaleMax = 3;

					if (arr[index - 1]?.scale <= scaleMax - 0.5) {
						return prev[index];
					}

					const scaleValue = scale + range;


					return {
						scale: scaleValue <= 0 ? 0 : scaleValue >= scaleMax ? scaleMax : scaleValue,
						animation: scaleValue > scaleMax - 1 ? '1s linear forwards fade' : scaleValue < 0.5 ? '1s linear reverse forwards fade' : 'none',
						coordinates
					};
				})
			);
		}

		window.addEventListener('wheel', handleZoom);

		return () => window.removeEventListener('wheel', handleZoom);
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
		animate(x, viewport.x / 2);
		animate(y, viewport.y / 2);
	}

	return (
		<>
			<Head>
				<title>NFT Studios - TEST</title>
				<meta
					name='description'
					content='Test using next.js app'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link
					rel='icon'
					href='/favicon.ico'
				/>
			</Head>
			<motion.main className={genClassName('')}>
				<motion.div
					className={genClassName('wrapper')}
					onMouseMove={handleMouse}
					onMouseLeave={resetPosition}
					style={{ perspective: viewport.x }}
				>
					<motion.section
						className={genClassName('intro')}
						style={{
							...imageStyles[0],
							rotateX: rotateX,
							rotateY: rotateY,
						}}
					>
						<h1 className={genClassName('title')}>Welcome to NFT Test</h1>
						<p className={genClassName('desc')}> - Scroll to navigate -</p>
					</motion.section>
					{imageStyles.map((imageStyle, idx, arr) => {
						return (
							idx > 0 && idx < arr.length - 1 && (
								<motion.div
									className={genClassName('image')}
									key={`image-${idx}`}
									style={{
										...imageStyle,
										zIndex: 100 - idx,
										rotateX: rotateX,
										rotateY: rotateY,
										left: `${imageStyle?.coordinates?.x || 600}px`,
										top: `${imageStyle?.coordinates?.y || 300}px`
									}}
								>
									<img
										src={`https://picsum.photos/id/1${idx}/1000/800`}
										alt={`Image example ${idx}`}
									/>
								</motion.div>
							)
						);
					})}
          <motion.section
						className={genClassName('ending')}
						style={{
							...imageStyles[imageStyles.length - 1],
							rotateX: rotateX,
							rotateY: rotateY,
						}}
					>
						<h2 className={genClassName('title')}>The End</h2>
						<p className={genClassName('desc')}> - Thank you -</p>
					</motion.section>
				</motion.div>

				<div id='detail'>
					<div id='detailImg'></div>
					<div id='detailTxt'></div>
				</div>
			</motion.main>
		</>
	);
}
