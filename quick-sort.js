// 好きな理由:早いのと考え方がシンプルなので

//数字の最小→最大へのソートのみとなります
//またログが読みづらいので数値は0-10000の範囲とします
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
		array.push(getRandomInt(min, max))
		index++
	}
	return array
}
const getQuickSortedNumbers = (numbers) => {
	const pivotIndex = getRandomInt(0, numbers.length - 1)
	const pivot = numbers[pivotIndex]

	const smallNumbers = []
	// 同じ数字が複数ある場合があるので
	const pivots = []
	const bigNumbers = []
	numbers.forEach(number => {
		if (number < pivot) {
			smallNumbers.push(number)
		} else if (number > pivot) {
			bigNumbers.push(number)
		} else {
			pivots.push(pivot)
		}
	})
	const sortedSmallNumbers = (smallNumbers.length >= 2) ? getQuickSortedNumbers(smallNumbers) : smallNumbers
	const sortedBigNumbers = (bigNumbers.length >= 2) ? getQuickSortedNumbers(bigNumbers) : bigNumbers
	const sortedNumbers = [...sortedSmallNumbers, ...pivots, ...sortedBigNumbers]
	return sortedNumbers
}

const requiredQuantity = 100
const numbers = getRandomNumberArray(requiredQuantity)
const sortedNumbers = getQuickSortedNumbers(numbers)

// 検証コード
const correctSortedNumbers = [...numbers].sort((a, b) => a - b);
const isCorrect = correctSortedNumbers.every((number, index) => number === sortedNumbers[index])

if (isCorrect === false) {
	console.log("検証に失敗しました。正解との差分を出力します")
	correctSortedNumbers.forEach((number, index) => {
		if (number === sortedNumbers[index]) { return }
		console.log(`index:${index}/正解:${number}/自作:${sortedNumbers[index]}`)
	})
}
console.log(`対象となる配列:${numbers}`)
console.log(`自作ソートの結果:${sortedNumbers}`)
console.log(`正解:${correctSortedNumbers}`)
console.log(`一致している:${isCorrect}`)