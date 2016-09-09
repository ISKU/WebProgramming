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
	String directoryPath = request.getRealPath("/user/"+ id + "/" + date + "/");
	File directoryPathUser = new File(directoryPath);
	File[] fileList = directoryPathUser.listFiles();
	Arrays.sort(fileList, new Comparator<File>() {		// 최근의 메모를 가져오기 위해 정렬
		@Override
		public int compare(File fileX, File fileY) {
			String compareX = fileX.getName();
			String compareY = fileY.getName();
			return compareY.compareTo(compareX);
		}
	});

	/* return json data */
	JSONArray returnData = new JSONArray();
	JSONObject json;
	PrintWriter printWriter = response.getWriter();

	BufferedReader reader = null;
 	try { 
		for(File tempFile : fileList) {
			if(tempFile.isFile() &&  tempFile.getName().endsWith(".txt")) {
				reader = new BufferedReader(new FileReader(directoryPath + tempFile.getName()));
				String[] time = (tempFile.getName()).split("[.]");
				json = new JSONObject();
				json.put("time", time[0]);
				json.put("lat", reader.readLine());
				json.put("lng", reader.readLine());
				json.put("memo", reader.readLine());
				returnData.add(json);
				// 메모 정보를 반환
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
