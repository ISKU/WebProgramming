<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@page import = "java.io.*" %>
<%@page import = "java.util.*" %>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="java.io.FileNotFoundException"%>
<%
	/* get or post value */
	request.setCharacterEncoding("UTF-8");
	String id = (String) session.getAttribute("id");
	String date = request.getParameter("date");
	String time = request.getParameter("time");
	String memo = request.getParameter("memo");
	String filePath = request.getRealPath("/user/"+ id + "/" + date + "/");
	String filePathMemo = filePath + time + ".txt";

	/* return json data */
	JSONArray returnData = new JSONArray();
	JSONObject json;
	PrintWriter printWriter = response.getWriter();

	String dummy = "";
 	try { 
		BufferedReader reader = new BufferedReader(new FileReader(filePathMemo));
		for (int i=0; i<2; i++)
			dummy += reader.readLine() + "\n";
		dummy += memo + "\n"; 
		reader.close();
		// 메모 부분만 수정하기 위해 현재 파일의 정보 저장
	
		FileWriter writer = new FileWriter(filePathMemo);
		writer.write(dummy);
		writer.close();
		// 메모 부분만을 수정하여 파일 덮어쓰기

		json = new JSONObject();
		json.put("value", "수정 되었습니다.");
		returnData.add(json);
	}
	catch (Exception error) {
		json = new JSONObject();
		json.put("value", error.toString());
		returnData.add(json);
	} 
	finally {
		printWriter.print(returnData);
		printWriter.flush();
		printWriter.close();
	}
%>
