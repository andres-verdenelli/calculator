const displayText = document.getElementById('display-text')
const buttonArray = Array.from(
	document.getElementById('keyboard').childNodes
).filter(e => e.tagName == 'BUTTON')

buttonArray.forEach(element => {
	element.addEventListener('click', e =>
		buttonPressed(e.target.childNodes[0].data)
	)
})

document.addEventListener('keydown', e => buttonPressed(e.key.toUpperCase()))

let number1 = undefined
let number2 = undefined
let operator = undefined
let showingResult = true

function buttonPressed(key) {
	switch (key) {
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
			if (showingResult === true) {
				displayText.innerText = ''
			}
			displayText.innerText += key
			showingResult = false
			break
		case '/':
		case 'X':
		case '-':
		case '+':
		case '=':
			//guarda el numero en pantalla
			if (number1 === undefined) {
				number1 = displayText.innerText
			} else {
				number2 = displayText.innerText
			}
			//evalua la expresion y muetra el resultado
			if (
				operator !== undefined &&
				operator !== '=' &&
				number1 !== undefined &&
				number2 !== undefined
			) {
				number1 = evaluateExpresion()
				displayText.innerText = number1
				number2 = undefined
			}
			//guarda el operador
			operator = key
			//activa el modo showingResult
			showingResult = true
			break
		case 'C':
			number1 = undefined
			number2 = undefined
			operator = undefined
			displayText.innerText = '0'
			break
		default:
			break
	}
}
function evaluateExpresion() {
	switch (operator) {
		case '+':
			return sum()
		case '-':
			return sub()
		case '/':
			return div()
		case 'X':
			return mul()
	}
}

function sum() {
	return Number(number1) + Number(number2)
}
function sub() {
	return number1 - number2
}
function mul() {
	return number1 * number2
}
function div() {
	return number1 / number2
}
