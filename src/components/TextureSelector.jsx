import { useState } from 'react';
import { useStore } from '../hooks/useStore.js';
import * as images from '../images/images.js';
import { useKeyboard } from '../hooks/UseKeyboard.js';
import { useEffect } from 'react';

export const TextureSelector = () => {
	const [texture, setTexture] = useStore((state) => [
		state.texture,
		state.setTexture
	]);
	const { dirt, glass, grass, log, wood } = useKeyboard();

	useEffect(() => {
		const options = {
			dirt,
			glass,
			grass,
			log,
			wood
		};

		const selectedTexture = Object.entries(options).find(
			([texture, isEnabled]) => isEnabled
		);
		if (selectedTexture) {
			const [textureName] = selectedTexture;
			setTexture(textureName);
		}
	}, [dirt, glass, grass, wood, log]);

	return (
		<div className='texture-selector'>
			{Object.entries(images).map(([imgKey, img]) => {
				return (
					<img
						className={
							texture === imgKey.replace('Img', '')
								? 'selected'
								: ''
						}
						key={imgKey}
						src={img}
						alt={imgKey}
					/>
				);
			})}
		</div>
	);
};
