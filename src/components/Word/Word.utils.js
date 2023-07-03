export const isLetter = key => key.length === 1 && ( /[a-zA-Z]/ ).test(key);

export const Print = text => console.log(text);


export const getNewColors = (wordToPresent, letters) => {
	const arrayOfLetters = wordToPresent.split('');
	let newColors = [];
	for (let i = 0; i < arrayOfLetters.length; i++) {
		newColors.push(( letters[i].toLowerCase() === arrayOfLetters[i].toLowerCase() ) ? 'green' : 'red');
	}

	return newColors;
};


// export const areAllGreen = (colors, expectedNumberOfGreen) => (colors.filter(color => color === 'green').length === expectedNumberOfGreen);