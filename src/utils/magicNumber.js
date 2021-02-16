/* A simple and fast function for converting numbers to words, e.g. 1234 => "one thousand two hundred thirty four"
 Inspired by: https://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript ... but it was really fun to do it by myself :)
 The requirement is to make it fit the American English pattern. Easy Peasy :) ... Hebrew or Russian spelling would require a more nuanced approach...
 The code is verbose with the intent of making it easier for the reader to digest

 params:
 value: number, required - Number <= Number.MAX_SAFE_INTEGER
 withDecimal: boolean, optional - pass true is result should include the numbers after the decimal point
 */
export const numberToWords = (num, withDecimal = false) => { // aka 2 words 2 furious

	if (typeof num !== 'number' || isNaN(num) || num > Number.MAX_SAFE_INTEGER) { // Let's do a fast param value sanity check
		throw new Error('https://i.kym-cdn.com/entries/icons/original/000/004/918/imposibru.jpg');
	}

	// Ideally, these texts should be sourced externally
	const NUMBERS_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'nineteen'];
	const NUMBERS_WORDS_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
	const NUMBERS_SCALES = ['hundred', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'gazillion', 'bazillion']; // Future proofing :)

	let scale = 0; // i.e. 1 = thousand, 2 = million, ...
	let remainder = Math.abs(parseInt(num)); // Initialize the abstract remainder. It will be used in the loop
	let result = []; // Here we'll push out number part words, in the end it will be reversed and turned to string by array.join('')


	// Lets do the decimals first
	if (withDecimal) {
		const decimals = num.toString().split('.')[1];

		if (decimals) {
			const words = decimals.split('').map(digit => NUMBERS_WORDS[Number(digit)]).join(' ');

			result.push(words, ', point ');
		}
	}

	if (parseInt(num) === 0) {
		result.push(NUMBERS_WORDS[0]); // 'zero'
	}

	// The "tahles" that does the thing
	// We'll use a loop for this. Could've been done with a recursive function, but what's the point?
	while (remainder) {
		const hundreds = remainder % 1000; // Hundreds is the 234 part of 1234

		remainder = Math.trunc(remainder / 1000); // Divide our num by 1000 until reaching 0

		if (hundreds) {
			const hundredsDigit = Math.trunc(hundreds / 100); // The 4 part of 432
			const tens = hundreds % 100; // The 32 part of 432
			const tensDigit = Math.trunc(tens / 10); // The 3 part of 432
			const lastDigit = hundreds % 10; // The 2 part of 432
			let wordsArray = [];

			if (remainder) { // Determine if we need to prepend the words with a comma
				wordsArray.push(',');
			}

			if (hundredsDigit) {
				wordsArray.push(NUMBERS_WORDS[hundredsDigit], NUMBERS_SCALES[0]);
			}

			if (tens) {
				if (tens < 11 && (remainder || hundredsDigit)) { // Lexical check to determine if preceding 'and' is necessary
					if (hundredsDigit === 0) {
						wordsArray[0] = '';
					}

					wordsArray.push('and');
				}

				if (tens < 20) {
					wordsArray.push(NUMBERS_WORDS[tens]);
				} else {
					wordsArray.push(NUMBERS_WORDS_TENS[tensDigit]);
					lastDigit && wordsArray.push(NUMBERS_WORDS[lastDigit]);
				}
			}

			if (scale) { // If scale above 0 (i.e. thousand) add the correct suffix
				wordsArray.push(NUMBERS_SCALES[scale]);
			}

			result.push(wordsArray.join(' '));
		}

		scale++;
	}

	if (num < 0) { // prepend negative number with a 'minus' word
		result.push('minus ');
	}

	return result.reverse().join(''); // Since we were digesting the number from the end we now need to reverse the results array.
};