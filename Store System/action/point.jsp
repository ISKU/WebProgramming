<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.io.*"%>

<%		
	request.setCharacterEncoding("UTF-8");
	String plusPoint = request.getParameter("point");
	String oldPoint = (String) session.getAttribute("point");
	String filePathUser = (String) session.getAttribute("filePathUser");
		
	String sendValue = null;
	String resultPoint = null;
	try {
		BufferedReader userReader = new BufferedReader(new FileReader(filePathUser));
		String dummy = userReader.readLine() + "\r\n";
		userReader.close();

		FileWriter userWriter = new FileWriter(new File(filePathUser));				
		resultPoint = String.valueOf(Integer.parseInt(plusPoint) + Integer.parseInt(oldPoint));
		dummy += (resultPoint + "\r\n");		
		userWriter.write(dummy);
		userWriter.close();
		
		sendValue = resultPoint;
		session.setAttribute("point", resultPoint);
	}
	catch (Exception error) {
		sendValue = "포인트를 추가할 수 없습니다.";
	}
	finally {
		if (sendValue.equals(resultPoint))
			response.sendRedirect("../store.jsp");
		else
			response.sendRedirect("../store.jsp?result=" + URLEncoder.encode(sendValue, "utf-8"));
	}
%>	
