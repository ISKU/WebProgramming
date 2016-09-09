<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.io.*"%>
<% 
	request.setCharacterEncoding("UTF-8");
	String id = (String) session.getAttribute("id");
	if (id == null) {
		response.sendRedirect("login.jsp?value="+ URLEncoder.encode("로그인 후에 이용해주세요", "utf-8"));
	}
	String point = (String) session.getAttribute("point");
	String filePathUser = (String) session.getAttribute("filePathUser");
	String filePathUserUsage = (String) session.getAttribute("filePathUserUsage");
	String filePathArticle = request.getRealPath("/product/");
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
	<link rel="stylesheet" type="text/css" href="./css/store.css">
	<link rel="stylesheet" type="text/css" href="./css/logArea.css">
</head>

<body>	

<%	if (request.getParameter("result") != null) { %>
		<script> window.alert(" <%= request.getParameter("result") %> "); </script>
<% 	}
%>
		
	<!-- HEADER LAYOUT -->
	<header>
		<h1><a id="headerLink" href="./store.jsp" target="_self">Online Store</a></h1>
	</header>
	
	<!-- SOTRE LAYOUT -->
	<main id="content">
		<table id="tableArticle">
			<tr>
				<td class="article">
					<div class="infoArticle"></div>
				</td>
				<td class="article">
					<div class="infoArticle"></div>
				</td>
			</tr>
			<tr>
				<td class="article">
					<div class="infoArticle"></div>
				</td>
				<td class="article">
					<div class="infoArticle"></div>
				</td>
			</tr>
		</table>
	</main>

	<!-- LOG LAYOUT -->
	<aside>
		<div id="userInformation">
			<b>Information</b><br />
			<b>ID: <%= id %></b><br />
			<b>POINT: <%= point %></b><br />
			<form action="./usage.jsp" method= "POST"><input type="submit" value="이용내역 확인" /></form>
			<form action="./action/logout.jsp" method="POST"><input type="submit" value="로그아웃" /></form>	
		</div>
		<div id="plusPoint">
			<b>Plus Point</b><br />
			<form action="./action/point.jsp" method="POST">
				<input type="number" name="point" min="1" required />
				<input type="submit" value="Plus Point" />
			</form>
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
	
	<!-- External JavaScripts -->
	<script src="./js/store.js"></script>	
<%
	try {
		for(int i=1; i<=4; i++) {
			BufferedReader articleReader = new BufferedReader(new FileReader(filePathArticle+"product"+i+".txt"));
			String articleName = articleReader.readLine();	
			session.setAttribute("productName" + i, articleName);	
			String articlePrice = articleReader.readLine();
			String articleStock = articleReader.readLine();
			String articleImage = articleReader.readLine();
			%><script> 
				addArticle("<%=articleName%>", "<%=articlePrice%>", "<%=articleStock%>", "<%=articleImage%>", "<%=i-1%>");
			</script><%
			articleReader.close();
		}
	}
	catch (Exception error) {
%>		<script> window.alert(" Page Error: <%= error.toString() %> "); </script>		
<%	}
%>
</body>
</html>
