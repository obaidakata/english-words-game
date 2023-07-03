import { createRef, useEffect, useState } from 'react';
import { getNewColors, isLetter } from './Word.utils';
import './Word.css';
import Button from '@mui/material/Button';

const Word = ({ word: wordToPresent, onSuccess }) => {
	const wordToPresentLength = wordToPresent.length;
	const showCheckButton = useState(true);
	const [showNextButton, setShowNextButton] = useState(false);
	const [inputRefsArray] = useState(() =>
		Array.from({ length: wordToPresentLength }, () => createRef())
	);

	const [letters, setLetters] = useState(() =>
		Array.from({ length: wordToPresentLength }, () => '')
	);
	const [colors, setColors] = useState(() =>
		Array.from({ length: wordToPresentLength }, () => 'grey')
	);

	const handleKeyPress = e => {
		const currentIndex = Number(e.target.id);
		const key = e.key;
		// setShowCheckButton(isAllFull());

		let nextIndex = currentIndex;
		if (isLetter(key) && currentIndex < wordToPresentLength - 1) {
			nextIndex = currentIndex + 1;
		} else if (key === 'Backspace' && currentIndex > 0) {
			nextIndex = currentIndex - 1;
			// setShowCheckButton(false);
			// console.log('prevIndex', prevIndex);
		}

		const nextInput = inputRefsArray?.[nextIndex]?.current;
		nextInput.focus();
		nextInput.select();
	};

	useEffect(() => {
		if (inputRefsArray?.[0]?.current) {
			inputRefsArray?.[0]?.current?.focus();
		}

		window.addEventListener('keyup', handleKeyPress, false);
		return () => window.removeEventListener('keyup', handleKeyPress);
	}, [handleKeyPress, inputRefsArray]);

	useEffect(() => {
		window.addEventListener('keyup', handleEnterPress, false);
		return () => window.removeEventListener('keyup', handleEnterPress);
	});

	const handleEnterPress = e => {
		if (e.key === 'Enter' && showNextButton) {
			onSuccess && onSuccess();
		} else if (e.key === 'Enter') { //&& showCheckButton
			checkWord();
		}
	};

	const checkWord = () => {
		const newColors = getNewColors(wordToPresent, letters);
		setColors(newColors);
		if (true) {
			setShowNextButton(true);
		}
	};

	const updateLetters = (e, index) => {
		const { value } = e.target;
		letters[index] = value;
		setLetters(letters);
	};

	return (
		<>
			<div>
				{inputRefsArray.map((ref, index) => {
					return (
						<input
							className={'letter ' + colors[index]}
							ref={ref}
							type="text"
							id={`${index}`}
							onChange={(e) => updateLetters(e, index)}
							onClick={e => e.target.select()}
							maxLength="1"
							size="2"
						/>
					);
				})}
			</div>
			{showCheckButton && <Button variant="contained" onClick={checkWord}>Check</Button>}
			{showNextButton && <Button variant="contained" onClick={onSuccess}>Next</Button>}
		</>
	);
};

export default Word;