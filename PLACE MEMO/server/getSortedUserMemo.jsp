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
	String directoryPath = request.getRealPath("/user/"+ id + "/");
	File directoryPathUser = new File(directoryPath);
	File[] directoryList = directoryPathUser.listFiles();
	Arrays.sort(directoryList, new Comparator<File>() {	// 최근의 날짜를 받아오기 위해 정렬
		@Override
		public int compare(File dirX, File dirY) {
			String compareX = dirX.getName();
			String compareY = dirY.getName();
			return compareY.compareTo(compareX);
		}
	});
	
	/* return json data */
	JSONArray returnData = new JSONArray();
	JSONObject json;
	PrintWriter printWriter = response.getWriter();

 	try { 
		for(File tempFile : directoryList) {
			if (tempFile.isDirectory()) {	// 날짜 반환
				json = new JSONObject();
				json.put("name", tempFile.getName());
				returnData.add(json);
			}
		}
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
