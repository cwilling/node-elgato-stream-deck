const { openStreamDeck } = require('../dist/index')
const streamDeck = openStreamDeck()

streamDeck.on('error', (error) => {
	console.error(error)
})

let isFilling = false
setInterval(() => {
	if (isFilling) return
	isFilling = true

	Promise.resolve().then(async () => {
		try {
			const r = getRandomIntInclusive(0, 255)
			const g = getRandomIntInclusive(0, 255)
			const b = getRandomIntInclusive(0, 255)
			console.log('Filling with rgb(%d, %d, %d)', r, g, b)
			for (let i = 0; i < streamDeck.NUM_KEYS; i++) {
				await streamDeck.fillKeyColor(i, r, g, b)
			}
		} catch (e) {
			console.error('Fill failed:', e)
		} finally {
			isFilling = false
		}
	})
}, 1000 / 5)

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}
