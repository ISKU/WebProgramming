/* Global Variable */
var map;	// 하나의 지도 사용
var marker;	
var markerIndex = 0;	// 메모의 개수
var currentMarkerIndex;
var placeLatLng;
var userMemoDateList;	// 날짜별 메모 리스트
var markers = new Array();	// 메모 개수
var timeMarkers = new Array();
var memoMarkers = new Array();

/* 유저의 저장된 메모의 날짜 리스트 반환 */
function getUserMemoDateList() {
	$.ajax({
		type: "POST",
		url: "./server/getSortedUserMemo.jsp",
		dataType: "JSON",
		success: function(data) {
			userMemoDateList = data;	// 메모 날짜별 리스트를 저장
		},
		error: function(xhr, status, error) {
			console.log(xhr + "\n" + status + "\n" + error);
		}
	});
}

/* 유저의 메모중 가장 최근에 저장된 메모의 날짜 반환 */
function getRecentlyUserMemoDate() {
	$.ajax({
		type: "POST",
		url: "./server/getSortedUserMemo.jsp",
		dataType: "JSON",
		success: function(data) {
			if ($.isEmptyObject(data))
				changeDate(undefined);
			else {
				changeDate(data[0].name);	// 최근의 날짜로 변경
				getAllUserMemo(data[0].name);
				// 최근 날짜의 유저의 모든 메모를 불러온다
			}
		},
		error: function(xhr, status, error) {
			console.log(xhr + "\n" + status + "\n" + error);
		}
	});
}

function getAllUserMemo(recentlyDate) {
	$.ajax({
		type: "POST",
		url: "./server/getAllUserMemo.jsp",
		data: ({date: recentlyDate}), // 현재 날짜에 저장된 메모를 요청
		dataType: "JSON",
		success: function(data) {
			for (var i=0; i<data.length; i++) { // 지도에 모든 메모의 마커 생성
				var time = data[i].time;
				var lat = data[i].lat;
				var lng = data[i].lng;
				var memo = data[i].memo;
				newMarker(new google.maps.LatLng(lat, lng), time, memo);
				// 각 메모의 마커를 생성
			}
		},
		error: function(xhr, status, error) {
			console.log(xhr + "\n" + status + "\n" + error);
		}
	});
}

/* load map */
function initialize()
{
	$("#down").css("display", "inline-block");
	var mapProp = {
		zoom: 15,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};	
	map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
	// 지도 생성

	// double click on map event
	google.maps.event.addListener(map, 'dblclick', function(event) {
		placeNewMarker(event.latLng);
	});
	
	getUserMemoDateList();	// 유저 메모의 날짜리스트 관리
	getRecentlyUserMemoDate();
	 // 저장된 유저의 메모중 가장 최근의 날짜로 변경과 모든 메모를 가져온다.
}

/* load map */
function loadScript()
{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyAN1eZtSlGJ8DnTIEtbXPWBAWQsd3HvHOs&sensor=false&callback=initialize";
	document.body.appendChild(script);
	// google Key를 받아 지도를 비동기적으로 웹에 띄운다.
}

/* 유저가 선택한 지역에 새로운 메모를 작성 */
function clickPlaceCompleteMemo() {
	var userLatitude = placeLatLng.lat();
	var userLongitude = placeLatLng.lng();
	var upMemo = document.getElementsByName("placeMemo")[0].value;
	var upTime = getCurrentTime();
	var upDate = document.getElementById("date").innerHTML;

	$.ajax({
		type: "POST",
		url: "./server/writeMemo.jsp",
		data: ({date: upDate, 
			time: upTime, 
			memo: upMemo, 
			lat: userLatitude,
			lng: userLongitude}),
		dataType: "JSON",
		success: function(data) {
			if (data[0].value == "ACK") {	// 서버에 작성한 메모를 저장하고 나서 지도에 마커 생성
				document.getElementsByName("placeMemo")[0].value = "";	
				$("#down").css("display", "inline-block");
				$("#placeNewMemoArea").fadeOut();
				newMarker(new google.maps.LatLng(userLatitude, userLongitude), upTime, upMemo);
				// 새로 작성한 메모를 해당 지역에 마커 생성
			} else
				window.alert(data[0].value);
		},
		error: function(xhr, status, error) {
			console.log(xhr + "\n" + status + "\n" + error);
		}
	});
}

/* 메모 수정 */
function clickModifyCompleteMemo() {
	var upMemo = document.getElementsByName("modifyMemo")[0].value;
	var upTime = timeMarkers[currentMarkerIndex];
	var upDate = document.getElementById("date").innerHTML;			

	$.ajax({
		type: "POST",
		url: "./server/modifyMemo.jsp",
		data: ({date: upDate, 
			time: upTime, 
			memo: upMemo }),
		dataType: "JSON",
		success: function(data) {	// 서버의 메모 파일을 수정한 후 지도에 마커도 적용
			document.getElementsByName("modifyMemo")[0].value = "";	
			$("#down").css("display", "inline-block");
			$("#modifyMemoArea").fadeOut();
			removeAllMarkers();
			getAllUserMemo(upDate);
		},
		error: function(xhr, status, error) {
			console.log(xhr + "\n" + status + "\n" + error);
		}
	});
}

/* double click on map, 해당 지역에 새로운 메모 생성 */
function placeNewMarker(location) {
	var userAnswer = window.confirm("해당 지역에 메모를 작성하시겠습니까?");
	
	if (userAnswer) {
		$("#down").css("display", "none");
		$("#placeNewMemoArea").fadeIn("slow");
		placeLatLng = location;
	}
}


/* place new memo, cancle memo button click */
function clickPlaceCancleMemo() {
	document.getElementsByName("placeMemo")[0].value = "";
	$("#down").css("display", "inline-block");
	$("#placeNewMemoArea").fadeOut();	
}

/* left side button click */
function clickLeft() {
	var previousDate;
	var nextDate;
	var date = document.getElementById("date").innerHTML;

	for (var i=0; i<userMemoDateList.length; i++) {
		if (date == userMemoDateList[i].name) {
			if (i != 0)	// 현재 지도의 날짜의 바로 다음 날짜를 임시 저장
				previousDate = userMemoDateList[i-1].name;
			else
				previousDate = undefined;
			
			// 현재 지도의 날짜의 바로 이전 날짜를 임시 저장
			if (i != userMemoDateList.length - 1)
				nextDate = userMemoDateList[i+1].name;
			else
				nextDate = undefined;

			if (nextDate == undefined)	// 이전 날짜에 저장된 메모가 없음
				window.alert("저장된 메모가 없습니다");
			else {
				removeAllMarkers();
				changeDate(nextDate);
				getAllUserMemo(nextDate);
			}
			// 메모가 있을 경우 지도를 갱신한다.
		}
	}
}

/* right side button click */
function clickRight() {
	var previousDate;
	var nextDate;
	var date = document.getElementById("date").innerHTML;

	for (var i=0; i<userMemoDateList.length; i++) {
		if (date == userMemoDateList[i].name) {
			if (i != 0)	// 현재 지도의 날짜의 바로 다음 날짜를 임시 저장
				previousDate = userMemoDateList[i-1].name;
			else
				previousDate = undefined;
			
			// 현재 지도의 날짜의 바로 이전 날짜를 임시 저장
			if (i != userMemoDateList.length - 1)
				nextDate = userMemoDateList[i+1].name;
			else
				nextDate = undefined;

			if (previousDate == undefined)	// 다음 날짜에 저장된 메모가 없음
				window.alert("저장된 메모가 없습니다");
			else {
				removeAllMarkers();
				changeDate(previousDate);
				getAllUserMemo(previousDate);
			}
			// 메모가 있을 경우 지도 갱신
		}
	}
}

/* create new marker and new memo */
function newMarker(location, time, memo) {
	var newMarker = new google.maps.Marker({
		position: location,
		animation: google.maps.Animation.DROP,	
		title: getAddress(location),
		icon: "./icon/marker3.png",
		map: map
	});
	// 새롭게 저장할 메모의 마커를 생성

	var infowindow = new google.maps.InfoWindow({
		content: getContentMemo(time, memo, markerIndex++)
	});
	// 저장할 메모의 정보를 생성

	google.maps.event.addListener(newMarker, "click",  function() { infowindow.open(map, newMarker); });
	newMarker.setMap(map);
	markers.push(newMarker);	// 배열로 메모 마커 관리
	timeMarkers.push(time);		// 배열에 마커의 정보 추가
	memoMarkers.push(memo);
	map.setZoom(15);
	map.setCenter(location);	// 생성한 마커의 위치로 이동
}

/* 마커의 메모정보를 커스텀하여 반환 */
function getContentMemo(time, memo, index) {
	var content = 
		'<div id="windowContent">' +
			'<span id="windowTime" id="windowTime'+index+'">' +
				time +
			'</span><br /><br />' +
			'<span id="windowMemo">' +
				memo +
			'</span><br /><br />' +
			'<div id="windowButton">' +
				'<button onclick="windowModify(' + index + ')">수정</button>' +
				'<button onclick="windowDelete(' + index + ')">삭제</button>' +
			'</div>' +
		'</div>';
	return content;
}

/* 메모 수정 화면 취소 버튼 */
function clickModifyCancleMemo() {
	document.getElementsByName("modifyMemo")[0].value = "";
	$("#down").css("display", "inline-block");
	$("#modifyMemoArea").fadeOut();
}

/* 메모 수정 버튼 클릭 */
function windowModify(index) {
	$("#down").css("display", "none");
	$("#modifyMemoArea").fadeIn("slow");
	document.getElementsByName("modifyMemo")[0].value = memoMarkers[index];
	currentMarkerIndex = index;
}

/* 메모 삭제 버튼 클릭 */
function windowDelete(index) {
	var upTime = timeMarkers[index];
	var upDate = document.getElementById("date").innerHTML;
	deleteMarker(index);

	$.ajax({
		type: "POST",
		url: "./server/deleteMemo.jsp",
		data: ({date: upDate, 
			time: upTime }),
		dataType: "JSON",
		success: function(data) {	// 서버에 해당 메모 파일을 삭제
			window.alert(data[0].value);
		},
		error: function(xhr, status, error) {
			console.log(xhr + "\n" + status + "\n" + error);
		}
	});
}

/* 현재 지도에 배열에 저장된 마커를 모두 보여준다 */
function setAllMarker(map) {
	for (var i = 0; i<markers.length; i++) {
		if(markers[i] == undefined)
			continue;
		markers[i].setMap(map);
	}
}

/* 지도에 있는 모든 마커를 삭제한다 */
function clearAllMarkers() {
	setAllMarker(null);
}

/* 지도에 있는 모든 마커를 삭제한다 */
function removeAllMarkers() {
	clearAllMarkers();
	markerIndex = 0;
	markers = new Array();
	timeMarkers = new Array();
	memoMarkers = new Array();
}

/* 메모를 삭제 한다 */
function deleteMarker(index) {
	clearAllMarkers();
	delete markers[index];
	delete timeMarkers[index];
	delete memoMarkers[index];
	setAllMarker(map);
}

/* change date */
function changeDate(recentlyDate) {
	var date = document.getElementById("date");
	if (recentlyDate == undefined)
		// 저장된 메모가 없을 경우 오늘 날짜로 변경
		date.innerHTML = getCurrentDate();
	else
		// 유저가 작성한 가장 최근의 메모 날짜로 변경
		date.innerHTML = recentlyDate;
}
