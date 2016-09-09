<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.io.*"%>

<%		
	request.setCharacterEncoding("UTF-8");
	String id = request.getParameter("id");
	String pw = request.getParameter("pw");

	String fileName = id + ".txt";
	String filePath = request.getRealPath("/user/");
	String filePathUser = filePath + fileName;
 	String filePathUsage = filePath + id + "_이용내역.txt";
	
	String sendValue = null;
	try {
		File newUser = new File(filePathUser);
		File newUserUsage = new File(filePathUsage);

		if (newUser.exists())
			throw new Exception("이미 존재하는 ID입니다.");
		
		newUser.createNewFile();
		newUserUsage.createNewFile();

		FileWriter writer = new FileWriter(filePathUser);
		writer.write(pw + "\n");
		writer.write(0 + "\n");
		writer.close();

		sendValue = "회원가입 완료";
	}
	catch (Exception error) {
		sendValue = error.getMessage();
	}
	finally {
		response.sendRedirect("../login.jsp?value=" + URLEncoder.encode(sendValue, "utf-8"));
	}
%>
