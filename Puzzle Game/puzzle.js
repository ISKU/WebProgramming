/* Global Variable */
var tablePuzzle = document.getElementById("puzzle");
var tableRank = document.getElementById("rank");
var buttonProgress = document.getElementById("progress");
var spanTime = document.getElementById("time");

var ranking = new Array();
var gameSet = undefined;
var timer;

/* ON LOAD */
window.onload = function() {
	setRankTable(); // set rank table
}

/* Create Random Number 1~36 = randomNumber array */
function createRandomNumber() {
	var temp;
	var randomNumberIndex;
	var randomNumber = new Array();
	
	for(var i=1; i<=36; i++)
		randomNumber.push(i);

	for(var i=0; i<randomNumber.length; i++) {
		randomNumberIndex = Math.floor(Math.random() * 36);
		temp = randomNumber[i];
		randomNumber[i] = randomNumber[randomNumberIndex];
		randomNumber[randomNumberIndex] = temp;
	}
	
	return randomNumber;
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("Text", event.target.id);
}

function drop(event) {
	event.preventDefault();
	var selectAreaImgIndex = event.dataTransfer.getData("Text");
	var selectArea = document.getElementById(selectAreaImgIndex).parentNode;
	var dropArea = event.target.parentNode;
	
	selectArea.appendChild(dropArea.childNodes[0]);
	dropArea.appendChild(selectArea.childNodes[0]);
	checkRightAnswer();
}

/* Game Start, Stop Button */
function clickProgress() {
	if (gameSet) { // pause
		gameSet = false;
		buttonProgress.innerHTML = "RESUME";
		clearInterval(timer);
		toggleDraggable("false");
	} else if (gameSet == false) { // resume
		gameSet = true;
		buttonProgress.innerHTML = "PAUSE";
		timer = setInterval(updateTime, 1000);
		toggleDraggable("true");
	} else { // game start
		gameSet = true;
		buttonProgress.innerHTML = "PAUSE";
		setRandomPuzzlePiece();
		var buttonRestart = document.createElement("button");
		var buttonRestartTextValue = document.createTextNode("RESTART");
		buttonRestart.appendChild(buttonRestartTextValue);
		buttonRestart.addEventListener("click", clickRestart);
		(document.getElementsByTagName("section")[0]).insertBefore(buttonRestart, spanTime);
		timer = setInterval(updateTime, 1000);
	}
}

/* Restart Button */
function clickRestart() {
	clearInterval(timer);
	gameSet = false;
	spanTime.innerHTML = "00:00";
	clearPuzzle();
	setRandomPuzzlePiece();
	clickProgress();
}

/* Ranking Reset Button */
function clickReset() {
	clearRankTable();
	localStorage.clear();
}

/* Set Puzzle */
function setRandomPuzzlePiece() {
	var areaIndex = 1;
	var randomNumber = createRandomNumber();
	
	for (var i=1; i<=6; i++) {
		var tr = document.createElement("tr");
		for (var j=1; j<=6; j++) {
			var imgIndex = randomNumber.pop();
			
			var td = document.createElement("td");
			td.setAttribute("ondrop", "drop(event)");
			td.setAttribute("ondragover", "allowDrop(event)");
			td.setAttribute("index", areaIndex++);
			td.setAttribute("class", "dropArea");
			var img = document.createElement("img");
			img.setAttribute("src", "./img/6x6/puzzleImg_" + imgIndex + ".jpg");
			img.setAttribute("class", "piece");
			img.setAttribute("draggable", "true");
			img.setAttribute("ondragstart", "drag(event)");
			img.setAttribute("id", imgIndex);
			
			td.appendChild(img);
			tr.appendChild(td);
		}
		tablePuzzle.appendChild(tr);
	}
}

/* Remove all puzzle piece */
function clearPuzzle() {
	for (var i=0; i<6; i++)
		tablePuzzle.removeChild(tablePuzzle.lastChild);
}

/* toggle draggable */
function toggleDraggable(toggle) {
	for (var i=0; i<36; i++)
		document.getElementsByClassName("piece")[i].setAttribute("draggable", toggle);
}

/* Update Time */
function updateTime() {
	var minuteAndSecond = (spanTime.innerHTML).split(":");
	var minute = parseInt(minuteAndSecond[0]);
	var second = parseInt(minuteAndSecond[1]);
	
	if (second < 59)
		second++;
	else {
		minute++;
		second = 0;
	}
		
	if (second < 10)
		second = "0" + second;
	if (minute < 10)
		minute = "0" + minute;
		
	spanTime.innerHTML = minute + ":" + second;
}

/* Right Answer Check */
function checkRightAnswer() {
	for (var i=0; i<36; i++) {
		var td = document.getElementsByClassName("dropArea")[i];
		if (td.getAttribute("index") != td.childNodes[0].getAttribute("id"))
			return;
	}
	window.alert("Success!");
	clickProgress();	// stop
	updateRank(spanTime.innerHTML);
}

/* Score Up */
function updateRank(userScore) {
	if (typeof(Storage) !== "undefined") {
		for (var i=1; i<=10; i++) {
			var rankScore = localStorage.getItem("rank" + i);
			if (rankScore == null) {
				clearRankTable();
				localStorage.setItem("rank" + i, userScore);
				setRankTable();
				break;
			}
			if (compareScore(rankScore, userScore) == userScore) {
				var limit = getLocalStorageLengthForScoreUp();
				ranking.splice(i-1, 0, userScore);
				clearRankTable();
				for (var j=1; j<=limit; j++)
					localStorage.setItem("rank" + j, ranking[j-1]);
				setRankTable();
				break;
			}
		}
	} else
        window.alert("Your browser does not support web storage");
}

/* Compare Rank Score */
function compareScore(x, y) {
	var compareX = x.split(":");
	var compareY = y.split(":");
	
	// minute
	if (parseInt(compareX[0]) < parseInt(compareY[0]))
		return x;
	else if (parseInt(compareX[0]) > parseInt(compareY[0]))
		return y;
	else {	// second
			if(parseInt(compareX[1]) < parseInt(compareY[1]))
				return x;
			else if (parseInt(compareX[1]) > parseInt(compareY[1]))
				return y;
			else
				return x;
	}
}

/* get local storage length */
function getLocalStorageLengthForScoreUp() {
	var currentLength = localStorage.length;
	if (currentLength >= 10)
		return 10;
	else
		return currentLength + 1;
}

/* All Clear RankTable */
function clearRankTable() {		
	for (var i=0; i<localStorage.length; i++)
		tableRank.removeChild(tableRank.lastChild);
}

/* Set RankTable */
function setRankTable() {
	if (typeof(Storage) !== "undefined") {
		for (var i=1; i<=10; i++) {
			var rankScore = localStorage.getItem("rank" + i);
			
			if (rankScore != null) {
				var tr = document.createElement("tr");
	
				var tdRank = document.createElement("td");
				var tdRankTextValue = document.createTextNode(i);
				tdRank.appendChild(tdRankTextValue);
				var tdScore = document.createElement("td");
				var tdScoreTextValue = document.createTextNode(rankScore);
				tdScore.appendChild(tdScoreTextValue);
	
				tr.appendChild(tdRank);
				tr.appendChild(tdScore);
				tableRank.appendChild(tr);
				
				ranking[i-1] = rankScore;
			} else
				break;
		}
	} else
        window.alert("Your browser does not support web storage");	
}