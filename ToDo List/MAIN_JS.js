/* Global Variable */
var displayAreaA = document.getElementsByClassName("displayArea_A")[0];
var displayAreaB = document.getElementsByClassName("displayArea_B")[0];
var displayAreaC = document.getElementsByClassName("displayArea_C")[0];
var displayAreaD = document.getElementsByClassName("displayArea_D")[0];
var areaA = new Array;
var areaB = new Array;
var areaC = new Array;
var areaD = new Array;
var viewAddToDo = document.getElementById("viewAddToDo");
var tooltip = document.getElementById("tooltip");
var currentSelectCategory = "학교";
var searchKeywordChange = "";

String.prototype.hashCode = function() {
	for(var ret = 0, i = 0, len = this.length; i < len; i++) {
		ret = (31 * ret + this.charCodeAt(i)) << 0;
	}
	return ret;
};

/* Select Category Onchage */
function selectCategory(select) {
	currentSelectCategory = select.value;
}

/* Search Keyword Item */
function searchOnChange(keyword) {
	searchKeywordChange = keyword.value;
	removeAllItem();
	if (searchKeywordChange == "") {
		refreshAllItem();
		tooltip.style.display = "none";
	} else
		search(searchKeywordChange.toUpperCase());
}

/* AddToDo Button Click */
function clickAddToDo() {
	viewAddToDo.style.display = "block";
}

/* AddToDo Delete Button Click */
function clickDelete() {
	viewAddToDo.style.display = "none";
}

/* Item Delete Image Click */
function itemImageClick(index, area) {
	delete area[index];
	removeAllItem();
	refreshAllItem();
}

/* AddToDo Add Button Click */
function clickAdd() {
	try {
		checkForm();
		
		var item = document.createElement("div");
		item.style.width = "100%";
		item.style.height = "110px";
		item.style.borderRadius = "7px";
		item.style.textAlign = "left"
		item.style.marginBottom = "10px";
	
		var itemImage = document.createElement("img");
		itemImage.setAttribute("src", "img/delete.png");
		itemImage.style.float = "right";
	
		var itemTitle = document.createElement("p");
		itemTitle.style.fontWeight = "bold";
		itemTitle.style.margin = "10px";
		var itemTitleTextValue = document.createTextNode(document.getElementsByClassName("formType")[1].value);
		itemTitle.appendChild(itemTitleTextValue);
	
		var itemContent = document.createElement("p");
		itemContent.style.margin = "10px 5px 10px 5px";
		var itemContentTextValue = document.createTextNode(document.getElementsByClassName("formType")[2].value);
		itemContent.appendChild(itemContentTextValue);

		item.appendChild(itemImage);
		item.appendChild(itemTitle);
		item.appendChild(itemContent);
		switch (currentSelectCategory) {
			case "학교" :
				var indexItem = areaA.length;
				item.style.backgroundColor = "#cfe0e0";
				itemImage.addEventListener("click", function() { itemImageClick(indexItem, areaA); });
				areaA.push(item);
				break;
			case "자기개발" : 
				var indexItem = areaB.length;
				item.style.backgroundColor = "#e9b7b7"; 
				itemImage.addEventListener("click", function() { itemImageClick(indexItem, areaB); });
				areaB.push(item);
				break;
			case "기념일" : 
				var indexItem = areaC.length;
				item.style.backgroundColor = "#cce0e0"; 
				itemImage.addEventListener("click", function() { itemImageClick(indexItem, areaC); });
				areaC.push(item); 
				break;
			case "개인" :
				var indexItem = areaD.length;
				item.style.backgroundColor = "#e2ddc0"; 
				itemImage.addEventListener("click", function() { itemImageClick(indexItem, areaD); });
				areaD.push(item);
				break;
		}
		removeAllItem();
		refreshAllItem();
		document.getElementsByClassName("formType")[1].value = "";
		document.getElementsByClassName("formType")[2].value = "";
	} catch (error) {
		window.alert(error);
	}
}

/* Search */
function search(keyword) {
	var result = 0;
	
	for (var i=0; i<areaA.length; i++) {
		if (areaA[i] == undefined || ((areaA[i].childNodes[1].innerHTML).toUpperCase()).search(keyword) == -1)
			continue;
		displayAreaA.appendChild(areaA[i]);
		result++;
	}
	
	for (var i=0; i<areaB.length; i++) {
		if (areaB[i] == undefined || ((areaB[i].childNodes[1].innerHTML).toUpperCase()).search(keyword) == -1)
			continue;
		displayAreaB.appendChild(areaB[i]);
		result++;
	}
	
	for (var i=0; i<areaC.length; i++) {
		if (areaC[i] == undefined || ((areaC[i].childNodes[1].innerHTML).toUpperCase()).search(keyword) == -1)
			continue;
		displayAreaC.appendChild(areaC[i]);
		result++;
	}
	
	for (var i=0; i<areaD.length; i++) {
		if (areaD[i] == undefined || ((areaD[i].childNodes[1].innerHTML).toUpperCase()).search(keyword) == -1)
			continue;
		displayAreaD.appendChild(areaD[i]);
		result++;
	}
	
	if (result == 0)
		noSearchResult(keyword);
	else
		tooltip.style.display = "none";
}

/* Find Suggestions */
function noSearchResult(keyword) {
	var suggestions = new Array;
	var suggestion = function (word, priority) {
		this.word = word;
		this.priority = priority;
	}
	
	if (document.getElementById("tooltip").lastChild.nodeName == "UL")
		tooltip.removeChild(document.getElementById("tooltip").lastChild);
	tooltip.style.display = "block";

	for (var i=0; i<areaA.length; i++) {
		if (areaA[i] == undefined)
			continue;
		var compareTitle = (areaA[i].childNodes[1].innerHTML).toUpperCase();
		var equalCount = 0;
		for (var j=0; j<compareTitle.length; j++)
			if (keyword.charAt(j) == compareTitle.charAt(j))
				equalCount++;
		suggestions.push(new suggestion(areaA[i].childNodes[1].innerHTML, equalCount));
	}
	
	for (var i=0; i<areaB.length; i++) {
		if (areaB[i] == undefined)
			continue;
		var compareTitle = (areaB[i].childNodes[1].innerHTML).toUpperCase();
		var equalCount = 0;
		for (var j=0; j<compareTitle.length; j++)
			if (keyword.charAt(j) == compareTitle.charAt(j))
				equalCount++;
		suggestions.push(new suggestion(areaB[i].childNodes[1].innerHTML, equalCount));
	}
	
	for (var i=0; i<areaC.length; i++) {
		if (areaC[i] == undefined)
			continue;
		var compareTitle = (areaC[i].childNodes[1].innerHTML).toUpperCase();
		var equalCount = 0;
		for (var j=0; j<compareTitle.length; j++)
			if (keyword.charAt(j) == compareTitle.charAt(j))
				equalCount++;
		suggestions.push(new suggestion(areaC[i].childNodes[1].innerHTML, equalCount));
	}
	
	for (var i=0; i<areaD.length; i++) {
		if (areaD[i] == undefined)
			continue;
		var compareTitle = (areaD[i].childNodes[1].innerHTML).toUpperCase();
		var equalCount = 0;
		for (var j=0; j<compareTitle.length; j++)
			if (keyword.charAt(j) == compareTitle.charAt(j))
				equalCount++;
		suggestions.push(new suggestion(areaD[i].childNodes[1].innerHTML, equalCount));
	}
	
	suggestions.sort( function(a, b) { return a.priority < b.priority } );
	
	var suggestionList = document.createElement("ul");
	tooltip.appendChild(suggestionList);
	for (var i=0; i<suggestions.length; i++) {
		if (suggestions[i].priority >= 1) {
			var item = document.createElement("li");
			var suggestionTextValue = document.createTextNode(suggestions[i].word);
			item.appendChild(suggestionTextValue);
			suggestionList.appendChild(item);
		}
		if (i == 2)
			break;
	}
}

/* displayArea All Clear */
function removeAllItem() {
	for (var i=displayAreaA.childNodes.length-1; i>=0; i--)
		displayAreaA.removeChild(displayAreaA.childNodes[i]);
	
	for (var i=displayAreaB.childNodes.length-1; i>=0; i--)
		displayAreaB.removeChild(displayAreaB.childNodes[i]);
	
	for (var i=displayAreaC.childNodes.length-1; i>=0; i--)
		displayAreaC.removeChild(displayAreaC.childNodes[i]);

	for (var i=displayAreaD.childNodes.length-1; i>=0; i--)
		displayAreaD.removeChild(displayAreaD.childNodes[i]);
}

/* displayArea Refresh */
function refreshAllItem() {	
	for (var i=0; i<areaA.length; i++) {
		if (areaA[i] == undefined)
			continue;
		displayAreaA.appendChild(areaA[i]);
	}
	
	for (var i=0; i<areaB.length; i++) {
		if (areaB[i] == undefined)
			continue;
		displayAreaB.appendChild(areaB[i]);
	}
	
	for (var i=0; i<areaC.length; i++) {
		if (areaC[i] == undefined)
			continue;
		displayAreaC.appendChild(areaC[i]);
	}
	
	for (var i=0; i<areaD.length; i++) {
		if (areaD[i] == undefined)
			continue;
		displayAreaD.appendChild(areaD[i]);
	}
}

/* check Form */
function checkForm() {
	if (document.getElementsByClassName("formType")[1].value == "" || 
		document.getElementsByClassName("formType")[2].value == "" )
		throw "Title 또는 Content 내용을 입력해주세요."
}