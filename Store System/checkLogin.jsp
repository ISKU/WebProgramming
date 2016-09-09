<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.io.*"%>

<%		
	request.setCharacterEncoding("UTF-8");
	String id = request.getParameter("id");
	String pw = request.getParameter("pw");
	String point = null;

	String fileName = id + ".txt";
	String filePath = request.getRealPath("/user/");
	String filePathUser = filePath + fileName;
	String filePathUserUsage = filePath + id + "_이용내역.txt";
	String filePathArticle = request.getRealPath("/product/");

	String sendValue = null;
	
	try {
		BufferedReader reader = new BufferedReader(new FileReader(filePathUser));
		
		if (pw.equals(reader.readLine()))
			sendValue = id;
		else
			throw new Exception();

		point = reader.readLine();
		reader.close();
	}
	catch (Exception error) {
		sendValue = "존재하지 않는 ID이거나, 비밀번호가 틀립니다.";
	}
	finally {
		if (sendValue.equals(id)) {
			session.setAttribute("id", id);
			session.setAttribute("point", point);
			session.setAttribute("filePathUser", filePathUser);
			session.setAttribute("filePathUserUsage", filePathUserUsage);
			session.setAttribute("filePathArticle", filePathArticle);
			response.sendRedirect("../store.jsp?value=" + URLEncoder.encode(sendValue, "utf-8"));
		}
		else
			response.sendRedirect("../login.jsp?value=" + URLEncoder.encode(sendValue, "utf-8"));
	}
%>
