package webSearchEngine;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Hashtable;
import java.util.Scanner;
import java.util.Set;
import java.util.regex.Pattern;

public class SearchEngine {
	
	private static Scanner sc = new Scanner(System.in);

	Hashtable<String, String> URLList = new Hashtable<String, String>();

	/**
	 * The main method.
	 *
	 * @param args the arguments
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {
		SearchEngine engine = new SearchEngine();
		String choose = "n";
		System.out.println("\n---------------------------------------------------\n");
		System.out.println("              Welcome to Web Search Engine             ");
		System.out.println("\n---------------------------------------------------\n");
		do {
			System.out.println(" select the option mentioned below");
			System.out.println("---------------------------------------------------");
			System.out.println(" 1) Press 1 to enter the URL");
			System.out.println(" 2) Press 2 for Exit ");
			System.out.println(" 3) Press 3 to Delete html files ");
		
			int option = sc.nextInt();

			switch (option) {
			case 1:
				System.out.println("\n Please enter valid URL for example 'https://www.xyz.com/'");
				String url = sc.next();
				choose = engine.searchWord(url);
				break;

			case 2:
                System.out.println("Exit...");
                choose = "n";
                break;
                
            case 3:
                engine.deleteFiles();
                System.out.println("Deleted");
                choose = "y";
                break;
                
            default:
                System.out.println("Please enter correct option");
                choose = "y";

			}
		} while (choose.equals("y"));

		System.out.println("\n---------------------------------------------------\n");
		System.out.println("		THANK YOU       ");
		System.out.println("\n---------------------------------------------------\n");
	}
	
    public void deleteFiles() {
      File fileshtml = new File(Path.htmlDirectoryPath);
      File[] fileArrayhtml = fileshtml.listFiles();

      for (int i = 0; i < fileArrayhtml.length; i++) {

          fileArrayhtml[i].delete();
      }

  }


	private String searchWord(String url) {

		if(!isValid(url)) {
			System.out.println("The url " + url + " isn't valid");
			System.out.println("Please try again\n");
			return "y";
		}

		System.out.println("The url " + url + " is valid\n");

		System.out.println("Crawling Started...");
		//Crawler.startCrawler(url, 0); //crawling the URL
		Set<String> URL = Crawler.startCrawler(url, 0);
		System.out.println("Crawling Compelted...");
		for (String crawledURL : URL) {
			try{System.out.println("Crawled URL: " + crawledURL);
				saveCrawledHTML(crawledURL);
			}
			catch (Exception e){

			}
		}
		System.out.println("\n Do you want return to main menu(y/n)?");
		return sc.next();
	}


	private String getFileNameFromURL(String url) {
		try {

			Document document = Jsoup.connect(url).get();
			String title = document.title();

			title = title.replaceAll("[\\\\/:*?\"<>|]", "");

			if (!title.endsWith(".html")) {
				title += ".html";
			}
			URLList.put(title,url);

			return title;
		} catch (IOException e) {
			System.out.println("Error occurred while getting the file name from URL.");
			e.printStackTrace();
		}

		return "crawled.html";
	}

	private void saveCrawledHTML(String url) {
		try {
			String fileName = getFileNameFromURL(url);

			HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();

			InputStream inputStream = connection.getInputStream();
			BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);

			FileOutputStream fileOutputStream = new FileOutputStream("D:/idea/idea workspace/acc-final-project/src/webSearchEngine/htmlFiles/" + fileName);

			byte[] buffer = new byte[1024];
			int bytesRead;
			while ((bytesRead = bufferedInputStream.read(buffer)) != -1) {
				fileOutputStream.write(buffer, 0, bytesRead);
			}

			fileOutputStream.close();
			bufferedInputStream.close();
			inputStream.close();

			System.out.println("Crawled HTML saved successfully: " + fileName);
		} catch (IOException e) {
			System.out.println("Error occurred while saving the crawled HTML.");
			e.printStackTrace();
		}
	}
	
	/**
	 * It will validate url entered by user with DNS
	 * @param url
	 * @return
	 */
	public boolean isValid(String url)
    {
        /* Try creating a valid URL */
        try {
        	System.out.println("Validating URL...");
        	URL obj = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) obj.openConnection();
            //Sending the request
            conn.setRequestMethod("GET");
            int response = conn.getResponseCode();
            if(response==200) {
            	 return true;
            }else {
            	return false;
            }
        }
         
        // If there was an Exception
        // while creating URL object
        catch (Exception e) {
            return false;
        }
    }
}
