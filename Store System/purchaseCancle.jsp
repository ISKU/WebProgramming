<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.io.*"%>

<%	
	request.setCharacterEncoding("UTF-8");
	String filePath = (String) session.getAttribute("filePathArticle");
	String filePathUser = (String) session.getAttribute("filePathUser");
	String filePathUserUsage = (String) session.getAttribute("filePathUserUsage");
	String filePathArticle = "";

	String currentPoint = (String) session.getAttribute("point");
	String count = request.getParameter("count");
	String name = request.getParameter("name");
	String price = request.getParameter("price");
	String date = request.getParameter("date");
	String sendValue = "";

	for (int i=1; i<=4; i++) {
		String checkProduct = (String) session.getAttribute("productName" + i);
		if (checkProduct.equals(name)) {
			filePathArticle = filePath + "product" + i + ".txt";
			break;
		}
	}

	try {
		BufferedReader articleReader = new BufferedReader(new FileReader(filePathArticle));
		String dummy = articleReader.readLine() + "\r\n";
		dummy += articleReader.readLine() + "\r\n";
		String stock = articleReader.readLine();

		FileWriter articleWriter = new FileWriter(new File(filePathArticle));
		String resultStock = String.valueOf(Integer.parseInt(stock) + 1);
		dummy += resultStock + "\r\n";
		dummy += articleReader.readLine() + "\r\n";

		articleReader.close();
		articleWriter.write(dummy);
		articleWriter.close();

		BufferedReader userReader = new BufferedReader(new FileReader(filePathUser));
		String userDummy = userReader.readLine() + "\r\n";
		userReader.close();
		int resultPoint = Integer.parseInt(currentPoint) + Integer.parseInt(price);
	
		FileWriter userWriter = new FileWriter(new File(filePathUser));
		userDummy += (resultPoint + "\r\n");		
		userWriter.write(userDummy);
		userWriter.close();
		session.setAttribute("point", String.valueOf(resultPoint));

		String usageDummy = "";
		String line = null;
		BufferedReader usageReader = new BufferedReader(new FileReader(filePathUserUsage));
		for(int i=1; i<Integer.parseInt(count); i++) {
			usageDummy += usageReader.readLine() + "\r\n";
		}
		usageReader.readLine();

		usageDummy += count + "|"
				+ name + "|" 
				+ price + "|" 
				+ date
				+ "|취소" 
				+ "\r\n";

		while ((line = usageReader.readLine()) != null) {
			usageDummy += line + "\r\n";
		}
		usageReader.close();

		FileWriter usageWriter = new FileWriter(new File(filePathUserUsage));
		usageWriter.write(usageDummy);
		usageWriter.close();
	}
	catch (Exception error) {
		sendValue = error.toString();
	}
	finally {
		if (sendValue.equals(""))
			response.sendRedirect("../usage.jsp?");
		else
			response.sendRedirect("../usage.jsp?result=" + URLEncoder.encode(sendValue, "utf-8"));
	}
%>
