<%@page contentType="text/html; charset=utf-8"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.io.*"%>
<%
	request.setCharacterEncoding("utf-8");
	String id = (String) session.getAttribute("id");
	String point = (String) session.getAttribute("point");
	String filePathUserUsage = (String) session.getAttribute("filePathUserUsage");
	
	try {
		BufferedReader checkReader = new BufferedReader(new FileReader(filePathUserUsage));
		if (checkReader.readLine() == null) {
			checkReader.close();
			response.sendRedirect("store.jsp?result=" + URLEncoder.encode("이용내역이 존재하지 않습니다", "utf-8"));
		}
	} catch (NullPointerException error) {
		response.sendRedirect("login.jsp?value=" + URLEncoder.encode("로그인 후에 이용해주세요", "utf-8"));
	} catch (Exception error) {
		response.sendRedirect("login.jsp?value=" + URLEncoder.encode(error.getMessage(), "utf-8"));
	}
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
	<link rel="stylesheet" type="text/css" href="./css/usage.css">	
	<link rel="stylesheet" type="text/css" href="./css/logArea.css">
</head>

<body>
		
<%	if (request.getParameter("result") != null) { %>
		<script> window.alert(" <%= request.getParameter("result") %> "); </script>
<% 	}
%>

	<!-- HEADER LAYOUT -->
	<header>
		<h1><a id="headerLink" href="./usage.jsp" target="_self">Online Store</a></h1>
	</header>
	
	<!-- USAGE LAYOUT -->
	<main id="content">
		<table id="tableUsage">
			<tr>
				<th>No.</th>
				<th>물품명</th>
				<th>가격</th>
				<th>날짜</th>
				<th>기타</th>
			</tr>
		</table>
	</main>
	
	<!-- LOG LAYOUT -->
	<aside>
		<div id="userInformation">
			<b>Information</b><br />
			<b>ID: <%= id %></b><br />
			<b>POINT: <%= point %></b><br />
			<form action="./store.jsp" method="POST"><input type="submit" value="상점으로 이동" /></form>
			<form action="./action/logout.jsp" method="POST"><input type="submit" value="로그아웃" /></form>	
		</div>	
	</aside>
		
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
	<script src="./js/usage.js"></script>
<%	
	try {
		BufferedReader usageReader = new BufferedReader(new FileReader(filePathUserUsage));
		String line;
		while ((line = usageReader.readLine()) != null) {
			%><script> addUsage("<%=line%>"); </script><%
		}
		usageReader.close();
	}
	catch (Exception error) {
%>		<script> window.alert(" Page Error: <%= error.toString() %> "); </script>		
<%	}
%>
</body>
</html>
