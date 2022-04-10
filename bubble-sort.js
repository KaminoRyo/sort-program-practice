// 好きな理由:最も基本的であり直感的だから
//数字の最小→最大へのソートのみとなります
//ログが読みづらいので数値は0-10000の範囲とします
//https://paiza.io/ja で実行確認しました。

/*
 * ランダムな整数を取得. 
 * MDNより拝借して「以上」「以下」になるよう改変
 * 
 * @link https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max) + 1;
	return Math.floor(Math.random() * (max - min) + min);
}

const getRandomNumberArray = (quantity, min = 0, max = 10000) => {
	let array = []
	let index = 1
	while (index <= quantity) {
		array.push(getRandomInt(0, 10000))
		index++
	}
	return array
}

const getOneRoundSortedNumbers = (numbers) => {
	const clonedNumbers = [...numbers]
	for (let baseIndex = clonedNumbers.length - 2; baseIndex >= 0; baseIndex--) {
		const nextIndex = baseIndex + 1
		let base = clonedNumbers[baseIndex]
		let next = clonedNumbers[nextIndex]
		if (base > next) {
			const clonedBase = base
			clonedNumbers[baseIndex] = next
			clonedNumbers[nextIndex] = clonedBase
		}
	}
	return clonedNumbers
}

const getBubbleSortedNumbers = (numbers) => {
	const soretedNumbers = []

	let targetNumbers = [...numbers]
	for (let index = 0; index < numbers.length; index++) {
		const oneRoundSortedNumbers = getOneRoundSortedNumbers(targetNumbers)
		soretedNumbers.push(oneRoundSortedNumbers[0])
		oneRoundSortedNumbers.shift()
		targetNumbers = oneRoundSortedNumbers
	}
	return soretedNumbers
}

const requiredQuantity = 200
const numbers = getRandomNumberArray(requiredQuantity)
const sortedNumbers = getBubbleSortedNumbers(numbers)

// 検証コード
const correctSortedNumbers = [...numbers].sort((a, b) => a - b);
const isCorrect = correctSortedNumbers.every((number, index) => number === sortedNumbers[index])

console.log(`対象となる配列:${numbers}`)
console.log(`自作ソートの結果:${sortedNumbers}`)
console.log(`正解:${correctSortedNumbers}`)
console.log(`一致している:${isCorrect}`)