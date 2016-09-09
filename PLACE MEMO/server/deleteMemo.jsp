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
	String filePath = request.getRealPath("/user/"+ id + "/" + date + "/");
	String filePathMemo = filePath + time + ".txt";

	/* return json data */
	JSONArray returnData = new JSONArray();
	JSONObject json;
	PrintWriter printWriter = response.getWriter();

 	try { 
		File fileMemo = new File(filePathMemo);
		fileMemo.delete();	// 해당 메모 파일 삭제

		json = new JSONObject();
		json.put("value", "해당 메모가 삭제 되었습니다.");
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
