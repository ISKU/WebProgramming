/* Global Variable */
var stateMenu = true;
var userLatitude = undefined;
var userLongitude = undefined;

/* window onload */
$(document).ready(function(){
	$("main").fadeIn(2000);
});

/* Menu slide Up&Down */
function clickMenu() {
	if (stateMenu) {	// 메뉴 오픈
		$("#menu").slideDown("slow");
		$("#down").fadeOut("slow");
		stateMenu = false;
	} else {		// 메뉴 클로즈
		$("#menu").fadeOut("slow");
		$("#down").css("display", "inline-block");
		stateMenu = true;
	}
}

/* 오늘 날짜를 반환 */
function getCurrentDate() {
	var today = new Date();
	var month = today.getMonth() + 1;
	var day = today.getDate();
	
	if (parseInt(month) <= 9)
		month = "0" + month;
	if (parseInt(day) <= 9)
		day = "0" + day;

	return today.getFullYear() + "-" + month + "-" + day;
}

/* 현재 시간을 반환 */
function getCurrentTime() {
	var today = new Date();
	var hour = today.getHours();
	var minute = today.getMinutes();
	var second = today.getSeconds();

	if (parseInt(hour) <= 9)
		hour = "0" + hour;
	if (parseInt(minute) <= 9)
		minute = "0" + minute;
	if (parseInt(second) <= 9)
		second = "0" + second;

	return hour + ":" + minute + ":" + second;
}

/* 현재 날짜와 시간을 동시에 반환 */
function getToday() {
	return getCurrentDate() + " " + getCurrentTime();
}

/* 사용자의 현재위치를 가져온다  */
function getLocation() {
	if (navigator.geolocation)
		navigator.geolocation.getCurrentPosition(showPosition, showError);
		// 현재위치를 가져온다, 사용자의 동의가 없거나 브라우저가 지원하지 않으면 에러 반환 
	else
		window.alert("Geolocation is not supported by this browser.");
}

/* 위도, 경도에 따라 주소로 반환   */
function getAddress(location) {
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'latLng' : location}, function(results, status){
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1])
				return results[3].formatted_address;	// 도,시,구 까지 반환
			else
				return "알수없음";	// 변환할 수 없을 때
		}
	});
}

/* 사용자의 현재위치에 대한 위도, 경도를 저장 */
function showPosition(position) {
	userLatitude = position.coords.latitude;
	userLongitude = position.coords.longitude;
}

/* 사용자의 현재위치를 가져오지 못할 때 출력하는 에러 */
function showError(error) {
	userLatitude = undefined;
	userLongitude = undefined;

	switch(error.code) {
		case error.PERMISSION_DENIED:
			window.alert("User denied the request for Geolocation.");
            		break;	// 사용자가 위치정보 사용 동의하지 않을 때
		case error.POSITION_UNAVAILABLE:
			window.alert("Location information is unavailable.");
			break;	// 위도,경도 값이 잘못됬을 때
		case error.TIMEOUT:
			window.alert("The request to get user location timed out.");
			break;	// 위치값을 일정시간동안 가져오지 못할 때
		case error.UNKNOWN_ERROR:
			window.alert("An unknown error occurred.");
			break;	// 이외 에러
	}
}
