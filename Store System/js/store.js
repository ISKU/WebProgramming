var imgArticle = document.getElementsByClassName("article");
var infoArticle = document.getElementsByClassName("infoArticle");

function addArticle(articleName, articlePrice, articleStock, articleImage, index) {
	
	index = parseInt(index);
	
	var addImage = document.createElement("img");
	addImage.setAttribute("src", articleImage);
	addImage.setAttribute("class", "imgArticle");
	imgArticle[index].insertBefore(addImage, imgArticle[index].childNodes[0]);

	var addName = document.createElement("h5");
	var nameTextValue = document.createTextNode(articleName);
	addName.appendChild(nameTextValue);
	
	var addPrice = document.createElement("h6");
	var priceTextValue = document.createTextNode("가격: " + articlePrice);
	addPrice.appendChild(priceTextValue);

	var addStock = document.createElement("h6");
	var stockTextValue = document.createTextNode("재고: " + articleStock);
	addStock.appendChild(stockTextValue);				

	infoArticle[index].appendChild(addName);
	infoArticle[index].appendChild(addPrice);
	infoArticle[index].appendChild(addStock);

	if (parseInt(articleStock) > 0) {
		var addForm = document.createElement("form");
		addForm.setAttribute("action", "./action/purchase.jsp");
		addForm.setAttribute("method", "POST");
	
		var addHiddenIndex = document.createElement("input");
		addHiddenIndex.setAttribute("type", "hidden");
		addHiddenIndex.setAttribute("name", "index");
		addHiddenIndex.setAttribute("value", index);		
		var addHiddenName = document.createElement("input");
		addHiddenName.setAttribute("type", "hidden");
		addHiddenName.setAttribute("name", "name");
		addHiddenName.setAttribute("value", articleName);
		var addHiddenPrice = document.createElement("input");
		addHiddenPrice.setAttribute("type", "hidden");
		addHiddenPrice.setAttribute("name", "price");
		addHiddenPrice.setAttribute("value", articlePrice);
		var addHiddenStock = document.createElement("input");
		addHiddenStock.setAttribute("type", "hidden");
		addHiddenStock.setAttribute("name", "stock");
		addHiddenStock.setAttribute("value", articleStock);

		var addInput = document.createElement("input");
		addInput.setAttribute("value", "구매");
		addInput.setAttribute("type", "submit");

		addForm.appendChild(addHiddenIndex);
		addForm.appendChild(addHiddenName);
		addForm.appendChild(addHiddenPrice);
		addForm.appendChild(addHiddenStock);
		addForm.appendChild(addInput);
		infoArticle[index].appendChild(addForm);
	} else {
		var addSoldOut = document.createElement("h5");
		var soldOutTextValue = document.createTextNode("Sold Out");
		addSoldOut.appendChild(soldOutTextValue);
		addSoldOut.style.color = "red";
		infoArticle[index].appendChild(addSoldOut);
	}	
}
