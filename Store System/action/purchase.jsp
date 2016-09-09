<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>

<%	
	request.setCharacterEncoding("UTF-8");
	String filePath = (String) session.getAttribute("filePathArticle");
	String filePathUser = (String) session.getAttribute("filePathUser");
	String filePathUserUsage = (String) session.getAttribute("filePathUserUsage");
	String currentPoint = (String) session.getAttribute("point");

	if (request.getParameter("index") != null) {
		String index = String.valueOf(Integer.parseInt(request.getParameter("index")) + 1);
		String name = request.getParameter("name");
		String price = request.getParameter("price");
		String stock = request.getParameter("stock");
		String filePathArticle = filePath + "product" + index + ".txt";
		int resultPoint = Integer.parseInt(currentPoint) - Integer.parseInt(price);
		String sendValue = "";

		if (resultPoint < 0) {
			response.sendRedirect("../store.jsp?result=" + URLEncoder.encode("포인트가 부족합니다.", "utf-8"));
		} else {
			try {
				BufferedReader articleReader = new BufferedReader(new FileReader(filePathArticle));		
				String dummy = articleReader.readLine() + "\r\n";
				dummy += articleReader.readLine() + "\r\n";
				articleReader.readLine();

				FileWriter articleWriter = new FileWriter(new File(filePathArticle));
				String resultStock = String.valueOf(Integer.parseInt(stock) - 1);
				dummy += resultStock + "\r\n";
				dummy += articleReader.readLine() + "\r\n";

				articleReader.close();
				articleWriter.write(dummy);
				articleWriter.close();

				BufferedReader userReader = new BufferedReader(new FileReader(filePathUser));
				String userDummy = userReader.readLine() + "\r\n";
				userReader.close();

				FileWriter userWriter = new FileWriter(new File(filePathUser));
				userDummy += (resultPoint + "\r\n");		
				userWriter.write(userDummy);
				userWriter.close();
				session.setAttribute("point", String.valueOf(resultPoint));

				String usageDummy = "";
				String line = null;
				int count = 1;
				BufferedReader usageReader = new BufferedReader(new FileReader(filePathUserUsage));
				while ( (line = usageReader.readLine()) != null) {
					usageDummy += line + "\r\n";
					count++;
				}
				usageReader.close();

				FileWriter usageWriter = new FileWriter(new File(filePathUserUsage));	
				usageDummy += count + "|"
						+ name + "|" 
						+ price + "|" 
						+ new SimpleDateFormat("yyyyMMdd").format(new Date(System.currentTimeMillis()))
						+ "|구매"
						+ "\r\n";
				usageWriter.write(usageDummy);
				usageWriter.close();
			}
			catch (Exception error) {
				sendValue = error.toString();
			}
			finally {
				if (sendValue.equals(""))
					response.sendRedirect("../store.jsp?result=" + URLEncoder.encode("구매 완료", "utf-8"));
				else
					response.sendRedirect("../store.jsp?result=" + URLEncoder.encode(sendValue, "utf-8"));
			}
		}
	}
%>		
