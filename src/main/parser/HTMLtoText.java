package src.main.parser;

import java.io.*;
import javax.swing.text.html.*;
import javax.swing.text.html.parser.*;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

public class HTMLtoText extends HTMLEditorKit.ParserCallback {
 StringBuffer s;

	static Hashtable<String, String> URLList1 = new Hashtable<String, String>();

 public HTMLtoText() {}

 public void parse(Reader in) throws IOException {
   s = new StringBuffer();
   ParserDelegator delegator = new ParserDelegator();
   // the third parameter is TRUE to ignore charset directive
   delegator.parse(in, this, Boolean.TRUE);
 }

 public void handleText(char[] text, int pos) {
   s.append(text);
 }

 public String getText() {
   return s.toString();
 }

 /*public static void main (String[] args) {
	 
	 //parse_files_in_folder(".src/main/resources//htmlFiles");
	 String folderPath = ".src/main/resources//htmlFiles";
	 parseFilesInFolder(folderPath);
	 Hashtable<String, String> URLList = Parser.getURLList();
 }*/

 /*public static void parse_files_in_folder(String folder)
{
	   try {
		   
		   List<String> fileNames= GetFileNames(folder);
		   for(String file : fileNames) {
			   parse(file); //testHtml.html
		   }
	     
	   }
	   catch (Exception e) {
	     e.printStackTrace();
	   }
}*/
 
 public static void parse(String html_file) {
	 
	 try {
		 
		 if(!html_file.endsWith(".html"))
		 {
			 throw new Exception("File should end with .html");
		 }
		 
		 String input_file= "D:/idea/idea workspace/acc-final-project/src/resources/htmlFiles/" +html_file;
		 System.out.println("Reading html file: " +input_file);
		 
		 FileReader in = new FileReader(input_file);
	     HTMLtoText parser = new HTMLtoText();
	     parser.parse(in);
	     in.close();
	     String textHTML = parser.getText();
	     //System.out.println(textHTML);
	     
	     System.out.println("Writting text to file");
	     String text_file= "D:/idea/idea workspace/acc-final-project/src/resources/text_files/"+ html_file+".txt";
	     String textName = html_file+".txt";
		 URLList1.put(textName,html_file);
	     BufferedWriter writerTxt = new BufferedWriter(new FileWriter(text_file));
	     writerTxt.write(textHTML);
	     writerTxt.close();
	     System.out.println("Output text file written:  "+ text_file ); 
		 
	 }
	 catch(Exception e) {
		 System.out.println("Exception occured: ");
		  e.printStackTrace();
	 };
 }

 public static List<String> GetFileNames (String folderPath) {
		
		File folder = new File(folderPath);
		
		File[] listOfFiles = folder.listFiles();
		   List<String> files = new ArrayList<>();

		for (int i = 0; i < listOfFiles.length; i++) {
		  if (listOfFiles[i].isFile()) {
			  String fileName=listOfFiles[i].getName();
		    System.out.println("File " + fileName);
		    files.add(fileName);
		  } else if (listOfFiles[i].isDirectory()) {
		    System.out.println("Directory " + listOfFiles[i].getName());
		  }
		}
		return files;
	}

	public static void parseFilesInFolder(String folder) {
		try {
			List<String> fileNames = GetFileNames(folder);
			for (String file : fileNames) {
				parse(file);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}