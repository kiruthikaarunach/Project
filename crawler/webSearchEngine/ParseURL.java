package webSearchEngine;

import java.io.File;
import java.io.FileWriter;
import java.io.PrintWriter;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class ParseURL {

    /**
     * this method will save the html file into system
     * @param document
     * @param url
     */

    public static void saveDoc(Document document, String url) {

        try {

            PrintWriter html = new PrintWriter(
            		new FileWriter(Path.htmlDirectoryPath + document.title().replace('/', '_') + ".html"));

            html.write(document.toString());
            html.close();

        } catch (Exception e) {

        }
 
    }

}