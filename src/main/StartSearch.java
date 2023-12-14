package src.main;

import src.main.crawler.Crawler;
import src.main.crawler.SearchEngine;
import src.main.parser.HTMLtoText;

public class StartSearch {

    public static void main (String[]args){
        SearchEngine searchEngine = new SearchEngine();

        try {
            searchEngine.webSearchEngine();


        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
