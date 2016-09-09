var tableUsage = document.getElementById("tableUsage");

function addUsage(usageLine) {

	var part = usageLine.split("|");
	var startRow = document.createElement("tr");

	for (var i=0; i<=3; i++) {
		var td = document.createElement("td");
		var tdTextValue = document.createTextNode(part[i]);
		td.appendChild(tdTextValue);
		startRow.appendChild(td);
	}
	
	if (part[4] == "취소") {
		var td = document.createElement("td");
		var tdTextValue = document.createTextNode(part[4]);
		td.appendChild(tdTextValue);
		startRow.appendChild(td);
	} else {
		var tdButton = document.createElement("td");
		var cancleButton = document.createElement("button");
		var cancleButtonTextValue = document.createTextNode("구매 취소");
		cancleButton.appendChild(cancleButtonTextValue);
		cancleButton.addEventListener("click", function() { clickCancle(part[0], part[1], part[2], part[3]); });
		tdButton.appendChild(cancleButton);
		startRow.appendChild(tdButton);
	}
	
	tableUsage.appendChild(startRow);
}

function clickCancle(count, name, price, date) {
	var check = window.confirm("구매 취소를 요청하셨습니다.\n맞으면 확인을 아니면 취소를 눌러주세요.");
	if (check)
		window.location.href = "./action/purchaseCancle.jsp?" + 
					"count=" + count + 
					"&name=" + name + 
					"&price=" + price +
					"&date=" + date;
}
