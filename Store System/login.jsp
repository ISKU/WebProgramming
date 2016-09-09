<%@page contentType="text/html; charset=utf-8"%>
<% request.setCharacterEncoding("utf-8"); %>
<%
	if (session.getAttribute("id") != null)
		response.sendRedirect("store.jsp");
%>
	

<!DOCTYPE html>
<html>
<head>
	<!-- META -->
	<meta charset="utf-8" />
	<meta name="author" content="김민호" />
	<meta name="description" content="Online Store" />
	<meta name="data" content="2016/05/29" />
	
	<!-- TITLE -->
	<title>Online Store</title>
	
	<!-- External Style Sheet -->
	<link rel="stylesheet" type="text/css" href="./css/index.css">
</head>

<body>
<%
	if (request.getParameter("value") != null) {
%>		<script> window.alert(" <%= request.getParameter("value") %> "); </script>
<% 	}
%>
		
	<!-- HEADER LAYOUT -->
	<header>
		<h1><a id="headerLink" href="./login.jsp" target="_self">Online Store</a></h1>
	</header>
	
	<!-- LOGIN LAYOUT -->
	<section id="login">
		<div id="loginForm">
		<form action="./action/checkLogin.jsp" method="POST">
			<h3>LOGIN</h3>
			<table>
				<tr>
					<td><b>ID:</b></td>
					<td><input type="text" name="id" pattern="[A-Za-z]{1,12}" required /></td>
				</tr>
				<tr>
					<td><b>PW:</b></td>
					<td><input type="password" name="pw" required /></td>
				</tr>
				<tr>
					<td colspan="2">
						<input type="submit" value="로그인" />
						<input type="button" value="회원가입" onclick="join()" />
					</td>
				</tr>
			</table>
		</form>
		</div>
	</section>
	
	<!-- JOIN LAYOUT -->
	<section id="join">
		<div id="joinForm">
		<form action="./action/join.jsp" method="POST">
			<h3>Guide to Joining</h3>
			<table>
				<tr>
					<td>
						<b>사용할 ID를 입력해주세요</b><br />
						<input type="text" name="id" pattern="[A-Za-z]{1,12}" required />
					</td>
				</tr>
				<tr>
					<td>
						<b>PASSWORD를 설정해주세요</b><br />
						<input type="text" name="pw" required />
					</td>
				</tr>
				<tr>
					<td>
						<input type="submit" value="완료"/>
						<input type="button" value="취소" onclick="cancleJoin()"/>
					</td>
				</tr>
			</table>
		</form>
		</div>
	</section>
	
	<!-- FOOTER LAYOUT -->
	<footer>
		<!-- 충남대학교 로고 -->
		<a id="footerLogo" href="http://computer.cnu.ac.kr" target="_blank">
			<img src="./img/symbol.png" alt="충남대학교 로고" />
			<span>충남대학교 컴퓨터공학과</span><br />
			<span>Department of Computer Science & Engineering</span><br />
		</a>
			
		<!-- Copylight -->
		<strong id="footerCopylight">Copyright &copy; 2016. 김민호. All Rights Reserved.</strong>
	</footer>	
	
	<!-- External Javascripts -->
	<script src="./js/join.js"></script>
</body>
</html>
