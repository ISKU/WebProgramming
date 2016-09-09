/* ESC 입력시 입력창 초기화 */
window.document.onkeydown = function(key) {
	if (key.keyCode == 27)
		buttonClear();
}

/* global variable */
var intermediateResult = undefined;
var lastInputOperator = undefined;
var lastInput = undefined;

/* 숫자 버튼 클릭 (0~9 or .) */
function buttonNumber(newInput) {
	var input = currentInput();
	
	if (input.length >= 15)	// 15자리 이상 입력시 에러
		window.alert("입력할 숫자는 15자리를 넘을 수 없습니다.");
	else {
		switch (lastInput) {
			case "back":
				if (input == "0")	// 현재 입력창의 숫자가 0일 때 다음 입력을 위해 0을 지움
					changeCurrentInputScreen("");
				break;
			case "result":	// Operator or Result 이후 입력시 스크린 초기화
				changeFormulaScreen("");
			case "operator":
				changeCurrentInputScreen("");
				break;
		}
		changeCurrentInputScreen(currentInput() + newInput);
		lastInput = newInput;
	}
}

/* 연산자 버튼 클릭 (+, -, x, /) */
function buttonOperator(operatorIdentifier) {
	var operator;
		
	try {
		checkDivideByZero();

		switch (operatorIdentifier) {
			case "plus": 
				operator = " + ";
				break;
			case "minus":
				operator = " - ";
				break;
			case "divide":
				operator = " &divide ";
				break;
			case "multiply": 
				operator = " x ";
				break;
			default: window.alert("잘못된 입력입니다.");
		}
		
		if (intermediateResult == undefined)	// 처음 입력시 *, /의 계산 오류 방지
			intermediateResult = parseFloat(currentInput());
		else
			intermediateResult = calculate(intermediateResult, parseFloat(currentInput()), lastInputOperator);
	
		changeFormulaScreen(currentInputAll() + currentInput() + operator);
		changeCurrentInputScreen(intermediateResult);
		lastInputOperator = operatorIdentifier;
	} catch (error) {
		window.alert(error);
	} finally {
		lastInput = "operator";
	}
}

/* +- sign 버튼 클릭 */
function buttonSign() {
	changeCurrentInputScreen(parseFloat(currentInput()) * -1);
}

/* <- 버튼 클릭 */
function buttonBack() {
	var input = currentInput();
	
	changeCurrentInputScreen(input.substring(0, input.length-1));
	if (currentInput() == "")	// <- 버튼 클릭 결과 빈공간일 때 0으로 채움
		changeCurrentInputScreen("0");
	lastInput = "back";
}

/* C 버튼 클릭 */
function buttonClear() {
	changeFormulaScreen("");
	changeCurrentInputScreen("");
	clearResultVariable();
}

/* = 버튼 클릭 */
function buttonResult() {
	try {
		checkDivideByZero();
		intermediateResult = calculate(intermediateResult, parseFloat(currentInput()), lastInputOperator);
		var result = currentInputAll() + currentInput() + " = ";
		var resultValue = intermediateResult;
	
		// 히스토리의 리스트에 "li" element와 text 생성
		var historyListElement = document.createElement("li");
		var resultNode = document.createTextNode(result + resultValue);
		historyListElement.appendChild(resultNode);
		// 생성한 "li" element에 클릭 이벤트 추가
		historyListElement.addEventListener("click", function() { historyListElementClick(result, resultValue); });

		// 히스토리의 리스트에 생성한 "li" element 추가
		var historyList = document.getElementById("historyList");
		var element = document.getElementsByTagName("li")[0];
		historyList.insertBefore(historyListElement, element);
	
		changeFormulaScreen("");
		changeCurrentInputScreen(resultValue);
		clearResultVariable();
		lastInput = "result";
	} catch (error) {
		window.alert(error);
		changeCurrentInputScreen("");
	} 
}

/* 계산 */
function calculate(operandX, operandY, operator) {
	switch (operator) {
		case "plus": 
			return operandX + operandY;
		case "minus":
			return operandX - operandY;
		case "divide":
			return operandX / operandY;
		case "multiply": 
			return operandX * operandY;
		default: 
			window.alert("잘못된 계산입니다.");
	}
}

/* 히스토리 리스트 클릭 */
function historyListElementClick(formula, resultValue) {
	changeFormulaScreen(formula);
	changeCurrentInputScreen(resultValue);
}

/* divide by zero 체크 */
function checkDivideByZero() {
	if (parseFloat(currentInput()) == 0 && lastInputOperator == "divide")
		throw "0으로 나눌 수 없습니다."
}

/* 계산 값 초기화 */
function clearResultVariable() {
	intermediateResult = undefined;
	lastInputOperator = undefined;
	lastInput = undefined;
}

/* 전체 입력 창의 식 변경 */
function changeFormulaScreen(changeFormulaData) {
	document.getElementById("inputAll").innerHTML = changeFormulaData; 
}

/* 현재 입력한 창의 숫자 변경 */
function changeCurrentInputScreen(changeCurrentInputData) {
	document.getElementById("input").innerHTML = changeCurrentInputData;
}

/* 전체 입력 창의 식 반환 */
function currentInputAll() {
	return document.getElementById("inputAll").innerHTML;
}

/* 현재 입력한 창의 숫자 반환 */
function currentInput() {
	return document.getElementById("input").innerHTML;
}