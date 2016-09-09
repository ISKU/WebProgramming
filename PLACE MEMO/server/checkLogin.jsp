<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@page import = "java.io.*" %>
<%@page import = "java.util.*" %>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="java.io.FileNotFoundException"%>
<%
	/* get or post value */
	request.setCharacterEncoding("UTF-8");
	String id = request.getParameter("id");
	String pw = request.getParameter("pw");
	String filePath = request.getRealPath("/user/");
	String filePathUser = filePath + id + ".txt";

	/* return json data */
	JSONArray returnData = new JSONArray();
	JSONObject json;
	PrintWriter printWriter = response.getWriter();

 	try {
		BufferedReader reader = new BufferedReader(new FileReader(filePathUser));

		// 유저 파일에서 작성된 비밀번호를 체크 후 로그인 여부 확인		
		json = new JSONObject();
		if (pw.equals(reader.readLine())) {
			json.put("value", "ACK");
			session.setAttribute("id", id);		// login, start session
			// 유저 id로 session 관리
		}
		else
			json.put("value", "비밀번호가 틀립니다");	// pw fault
		returnData.add(json);
		reader.close();
	}
	catch (Exception error) {
		json = new JSONObject();
		json.put("value", "존재하지 않는 ID입니다");	// id fault
		returnData.add(json);
	}
	finally { // 로그인 정보 반환
		printWriter.print(returnData);
		printWriter.flush();
		printWriter.close();
	}
%>
