var checkCalendar = false;

/* new memo, complete memo button click */
function clickCompleteMemo() {
	var upMemo = document.getElementsByName("memo")[0].value;
	var upDate = getCurrentDate();
	var upTime = getCurrentTime();

	getLocation();	// 사용자 현재 위치를 가져온다
	if (userLatitude != undefined && userLongitude != undefined) {
		$.ajax({
			type: "POST",
			url: "./server/writeMemo.jsp",
			data: ({date: upDate, 
				time: upTime, 
				memo: upMemo, 
				lat: userLatitude,
				lng: userLongitude}),
			dataType: "JSON",
			success: function(data) {	// 새로운 메모를 서버에 저장한다
				if (data[0].value == "ACK") {
					document.getElementsByName("memo")[0].value = "";
					$("#newMemoArea").fadeOut();
					removeAllMarkers();
					changeDate(upDate);
					getAllUserMemo(upDate);
					newMarker(new google.maps.LatLng(userLatitude, userLongitude), upTime, upMemo);
					// 새로 작성한 메모의 마커를 생성하고 현재 보여지는 지도를 갱신한다.
					// 동적으로 지도에 메모를 보여주기 위함
				} else
					window.alert(data[0].value);
			},
			error: function(xhr, status, error) {
				console.log(xhr + "\n" + status + "\n" + error);
			}
		});
	} else 
		window.alert("Location information is unavailable.");

	memo = "";
}

/* new memo, gancle memo button click */
function clickCancleMemo() {
	document.getElementsByName("memo")[0].value = "";
	$("#newMemoArea").fadeOut();	
}

/* menu, new memo button click */
function clickNewMemo() {
	$("#newMemoArea").fadeIn("slow");
}

/* 메뉴의 날짜별 메모 분류 버튼 클릭 */
function clickCalendar() {
	if (checkCalendar) {
		$("#datePicker").slideUp();
		checkCalendar = false;
	} else {
		$("#datePicker").slideDown();
		checkCalendar = true;
	}
}

/* 달력에서 선택한 날짜가 변경될 때 지도를 새롭게 갱신 */
function changeDatePicker() {
	var date = document.getElementById("datePicker").value;
	changeDate(date);
	removeAllMarkers();
	getAllUserMemo(date);
}

/* menu, logout button click */
function clickLogout() {
	var userAnswer = window.confirm("로그아웃 하시겠습니까?");
	if (userAnswer)
		window.location.href = "./server/logout.jsp";
}
