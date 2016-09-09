/* Check Login */
function checkLogin() {
	var id = document.getElementsByName("id")[0].value;
	var pw = document.getElementsByName("pw")[0].value;

	$.ajax({
		type: "POST",
		url: "./server/checkLogin.jsp",
		data: ({id: id, pw: pw}),	// id, pw로 유저 정보 확인
		dataType: "JSON",
		success: function(data) {
			if (data[0].value == "ACK") {	// 유저의 정보가 일치함
				$("#loginArea").css("display", "none");
				$("#googleMap").fadeIn(3000);
				loadScript();	// 지도를 불러온다
			} else
				window.alert(data[0].value);
		},
		error: function(xhr, status, error) {
			console.log(xhr + "\n" + status + "\n" + error);
		}
	});
}

/* Join Button Click */
function checkJoin() {
	$("#loginArea").css("display", "none");
	$("#joinArea").fadeIn(1000);
}

/* Join Cancle Button */
function cancleJoin() {
	$("#joinArea").css("display", "none");
	$("#loginArea").fadeIn(1000);
}

/* 회원가입 체크 및 완료 */
function completeJoin() {
	var id = document.getElementsByName("joinid")[0].value;
	var pw = document.getElementsByName("joinpw")[0].value;

	$.ajax({
		type: "POST",
		url: "./server/completeJoin.jsp",	
		data: ({id: id, pw: pw}),
		dataType: "JSON",
		success: function(data){	// 회원가입 결과를 받는다.
			window.alert(data[0].value);
			cancleJoin();
		},
		error: function(xhr, status, error) {
			console.log(xhr + "\n" + status + "\n" + error);
		}
	});
}
