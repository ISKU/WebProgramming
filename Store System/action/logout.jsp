<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.net.URLEncoder"%>
<% 
	request.setCharacterEncoding("UTF-8");	
	session.invalidate();
	response.sendRedirect("../login.jsp?value=" + URLEncoder.encode("로그아웃 되었습니다.", "utf-8"));
%>
