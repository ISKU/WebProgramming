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
	String latitude = request.getParameter("lat");
	String longitude = request.getParameter("lng");
	String filePath = request.getRealPath("/user/"+ id + "/" + date + "/");
	String filePathMemo = filePath + time + ".txt";

	/* return json data */
	JSONArray returnData = new JSONArray();
	JSONObject json;
	PrintWriter printWriter = response.getWriter();

 	try { 
		File newMemoDirectory = new File(filePath);
		if (!newMemoDirectory.exists())
			newMemoDirectory.mkdirs();	

		File newMemo = new File(filePathMemo);
		newMemo.createNewFile();
		FileWriter writer = new FileWriter(filePathMemo);
		writer.write(latitude + "\n");
		writer.write(longitude + "\n");
		writer.write(memo + "\n");
		writer.close();
		// 메모정보를 파일에 쓰고 생성한다.
	
		json = new JSONObject();
		json.put("value", "ACK");
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
