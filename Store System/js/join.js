var sectionLogin = document.getElementById("login");
var sectionJoin = document.getElementById("join");

function join() {
	sectionJoin.style.display = "block";
	sectionLogin.style.display = "none";
}

function cancleJoin() {
	sectionJoin.style.display = "none";
	sectionLogin.style.display = "block";
}
