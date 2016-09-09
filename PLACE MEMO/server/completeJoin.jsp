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
		File newUserDirectory = new File(filePath + id + "/");
		if (newUserDirectory.exists()) {	// 파일의 존재여부로 중복된 id 체크
			json = new JSONObject();
			json.put("value", "존재하는 ID입니다");
			returnData.add(json);
			throw new Exception();
		}
		newUserDirectory.mkdirs();	
		// id가 중복되지 않을 경우 새로운 유저디렉토리 생성

		File newUser = new File(filePathUser);
		newUser.createNewFile();
		FileWriter writer = new FileWriter(filePathUser);	
		writer.write(pw + "\n");
		writer.close();
		// 유저 정보를 새로운 파일에 쓰고 저장		
		
		json = new JSONObject();
		json.put("value", "회원가입 완료");
		returnData.add(json);
	}
	catch (Exception error) {
		json = new JSONObject();
		json.put("value", error.toString());
		returnData.add(json);
	} 
	finally {	// 회원가입 여부 정보 반환
		printWriter.print(returnData);
		printWriter.flush();
		printWriter.close();
	}		
%>
	
