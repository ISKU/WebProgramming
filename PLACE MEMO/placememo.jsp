<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html>
<head>
	<!-- META -->
	<meta charset="utf-8" />
	<meta name="author" content="김민호" />
	<meta name="description" content="PLACE MEMO" />
		
	<!-- TITLE -->
	<title>PLACE MEMO</title>
		
	<!-- External Style Sheet -->
	<link rel="stylesheet" type="text/css" href="./css/index.css" />	
	<link rel="stylesheet" type="text/css" href="./css/login.css" />
	<link rel="stylesheet" type="text/css" href="./css/menu.css" />
	<link rel="stylesheet" type="text/css" href="./css/map.css" />
	<!-- JQuery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	<!-- External Javascripts -->
	<script type="text/javascript" src="./js/index.js"></script>
	<script type="text/javascript" src="./js/login.js"></script>
	<script type="text/javascript" src="./js/menu.js"></script>
</head>

<body>	
	<!-- Header Area -->
	<header>
		<div id="down">
			<img src="./icon/down.png" alt="down" width="100%" height="100%"/>
		</div>
		<!-- New Memo Area -->
		<div id="newMemoArea" class="newMemoArea">
			<div class="writeMemoImage">
				<img src="./img/memo.png" alt="memo" width="100%" height="100%" />	
				<div style="float: right;">
					<button onclick="clickCompleteMemo()">완료</button>
					<button onclick="clickCancleMemo()">취소</button>
				</div>
			</div>
			<div class="writeMemoArea">
				<textarea name="memo" placeholder="Take a Memo" rows="10" cols="33" autofocus></textarea>
			</div>
		</div>
		<!-- Place New Memo Area -->
		<div id="placeNewMemoArea" class="newMemoArea">
			<div class="writeMemoImage">
				<img src="./img/memo.png" alt="memo" width="100%" height="100%" />	
				<div style="float: right;">
					<button onclick="clickPlaceCompleteMemo()">완료</button>
					<button onclick="clickPlaceCancleMemo()">취소</button>
				</div>
			</div>
			<div class="writeMemoArea">
				<textarea name="placeMemo" placeholder="Take a Memo" rows="10" cols="33" autofocus></textarea>
			</div>
		</div>
		<!-- Modify Memo Area -->
		<div id="modifyMemoArea" class="newMemoArea">
			<div class="writeMemoImage">
				<img src="./img/memo.png" alt="memo" width="100%" height="100%" />	
				<div style="float: right;">
					<button onclick="clickModifyCompleteMemo()">수정</button>
					<button onclick="clickModifyCancleMemo()">취소</button>
				</div>
			</div>
			<div class="writeMemoArea">
				<textarea name="modifyMemo" rows="10" cols="33" autofocus></textarea>
			</div>
		</div>
		<br />
		<div class="line" onclick="clickMenu()"></div>
		<!-- Menu Area -->
		<div id="menu">
			<img src="./icon/left.png" alt="left side" onclick="clickLeft()" />
			<img src="./icon/new.png" alt="new" onclick="clickNewMemo()" />	
			<img src="./icon/calendar.png" alt="calendar" onclick="clickCalendar()" />
			<img src="./icon/logout.png" alt="logout" onclick="clickLogout()" />
			<img src="./icon/right.png" alt="right side" onclick="clickRight()" />	
			<!-- Date Picker Area -->
			<div>
				<input type="date" id="datePicker" onchange="changeDatePicker()"/>
			</div>
		</div>
	</header>

	<!-- Main Area -->
	<main>
		<!-- Date -->
		<span id="date"></span>
		
		<!-- Login Area -->
		<div id="loginArea" class="shadow">
			<form>
				<table id="tableLogin">
					<tr>
						<th></th><th>L O G I N</th>
					</tr>
					<tr>
						<td><b>ID:</b></td>
						<td><input type="text" name="id" pattern="[A-Za-z]{1,12}" required /></td>
					</tr>
					<tr>
						<td><b>PW:</b></td>
						<td><input type="password" name="pw" required /></td>
					</tr>
					<tr>
						<td></td>
						<td>
							<input type="button" value="로그인" onclick="checkLogin()" />
							<input type="button" value="회원가입" onclick="checkJoin()" />
						</td>
					</tr>
				</table>
			</form>
		</div>

		<!-- Join Area -->
		<div id="joinArea" class="shadow">
			<form>
				<table id="tableJoin">
					<tr>
						<td>
							<b>사용 할 ID를 입력해주세요</b><br />
							<input type="text" name="joinid" pattern="[A-Za-z]{1,12}" required />
						</td>
					</tr>
					<tr>
						<td>
							<b>PASSWORD를 설정해주세요</b><br />
							<input type="text" name="joinpw" required />
						</td>
					</tr>
					<tr>
						<td>
							<input type="button" value="완료" onclick="completeJoin()"/>
							<input type="button" value="취소" onclick="cancleJoin()"/>
						</td>
					</tr>
				</table>
			</form>
		</div>
		
		<!-- Map Area -->
		<div id="googleMap" class="shadow"></div>		
		<br /><br />
	</main>

	<!-- Footer Area -->
	<footer>
		<div class="line"></div>
		<!-- Copyright -->
		<h2>&copy; Kim Min-Ho</h2>
	</footer>
	
	<!-- External Javascripts -->
	<script type="text/javascript" src="./js/map.js"></script>
	
	<% 
		/* 현재 로그인이 되어 있을 경우 로그인 유지 */
		request.setCharacterEncoding("UTF-8");
		String id = (String) session.getAttribute("id");
		if (id != null) {
			%><script>
				$("#loginArea").css("display", "none");
				$("#googleMap").fadeIn(2500);
				loadScript();		// 지도 생성
			</script><%
		}
	%>
</body>
</html>
