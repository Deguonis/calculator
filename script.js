function add(a, b) {
	return a + b
}

function subtract(a, b) {
	return a - b
}

function multiply(a, b) {
	return a * b
}

function divide(a, b) {
	if (b === 0) {
		return "Cannot divide by zero!"
	}
	return a / b
}

function operate(operator, a, b) {
	const operations = {
		"+": add,
		"-": subtract,
		"*": multiply,
		"/": divide
	}
	return operations[operator] ? operations[operator](a,b) : null
}

const display = document.getElementById('display')
const buttons = document.querySelectorAll('button')

let currentDisplay = ""
let lastInputWasEquals = false
let lastInputWasOperator = false
let decimalUsed = false

function appendToDisplay(value) {
	currentDisplay += value
	display.value = currentDisplay
}

function clear() {
	currentDisplay = ""
	display.value = currentDisplay
	lastInputWasOperator = false
	decimalUsed = false
}

function backspace() {
	currentDisplay = currentDisplay.slice(0, -1)
	display.value = currentDisplay
}

buttons.forEach(button => {
	button.addEventListener("click", (event) => {
		const buttonText = event.target.textContent
		handleInput(buttonText)
	})
})

document.addEventListener('keydown', (event) => {
	const key = event.key

	if (key === 'Escape') {
		handleInput("Clear")
	}

	if (key === 'Backspace') {
		handleInput('Backspace')
	}

	if (["+", "-", "*", "/"].includes(key)) {
		handleInput(key)
	}

	if (key === ".") {
		handleInput(key)
	}

	if (key === "Enter") {
		handleInput("=")
	}

	if (key >= '0' && key <= '9') {
		handleInput(key)
	}
})

function handleInput(value) {

	if (lastInputWasEquals) {

		if (value === "+" || value === "-" || value === "*" || value === "/") {
		} else {
			clear()
		}

		lastInputWasEquals = false
	}

	if (value === "Clear") {
		clear()
		lastInputWasOperator = false
	} else if (value === "Backspace") {
		backspace()
		lastInputWasOperator = false
	} else if (["+", "-", "*", "/"].includes(value)) {
		if (lastInputWasOperator) {
			return
		}

		appendToDisplay(value)
		lastInputWasOperator = true
		decimalUsed = false
	} else if (value === ".") {
		
		if (decimalUsed) {
			return
		}
		appendToDisplay(value)
		decimalUsed = true

	} else if (value === "=") {

		let regex = /[+\-*/]/
		let operator = currentDisplay.match(regex)

		if (operator) {
			let split = currentDisplay.split(operator[0])
			let a = +split[0]
			let b = +split[1]

			clear()
			let result = operate(operator[0], a, b)
			let decimal = result % 1

			if (result === "Cannot divide by zero!") {
				appendToDisplay(value)
			} else if (decimal === 0) {
				appendToDisplay(Math.round(result))
			} else {
				appendToDisplay(result)
			}

			lastInputWasEquals = true
			lastInputWasOperator = false
		}

	} else {
		appendToDisplay(value)
	}
}