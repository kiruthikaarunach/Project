package spellingchecking.SpellChecking;

import org.json.JSONObject;

import java.util.*;

import static spellingchecking.CorpseParser.CorpseParser.parseJsonFile;
import static spellingchecking.EditDistance.EditDistance.editDistance;


public class SpellChecking {

    public static Map<String, Integer> traverseJsonObject(JSONObject jsonObject, String input) {
        Map<String, Integer> result = new HashMap<>();

        for (String key : jsonObject.keySet()) {

            if(!key.equals("")) {
                //System.out.println(key);
                int editDistance = editDistance(key, input);
                //System.out.println("Key: " + key);
                //System.out.println("Edit Distance: " + editDistance);
                //System.out.println();

                if(editDistance<=3){
                    result.put(key, editDistance);
                }

            }
        }
        return result;
    }

    public static List<Map.Entry<String, Integer>> sortMapByValues(Map<String, Integer> map) {
        List<Map.Entry<String, Integer>> sortedList = new ArrayList<>(map.entrySet());

        Collections.sort(sortedList, new Comparator<Map.Entry<String, Integer>>() {
            @Override
            public int compare(Map.Entry<String, Integer> entry1, Map.Entry<String, Integer> entry2) {
                return entry1.getValue().compareTo(entry2.getValue());
            }
        });

        return sortedList;
    }



    public static void main(String[] args) {
        spellCheck();
    }
    public static void spellCheck() {
        String filePath = "./corpus.json";
        JSONObject jsonObject = parseJsonFile(filePath);

        if (jsonObject != null) {
            Map<String, Integer> matchingStrings = traverseJsonObject(jsonObject, "python");
            List<Map.Entry<String, Integer>> sortedList = sortMapByValues(matchingStrings);

            int i = 0;
            for (Map.Entry<String, Integer> entry : sortedList) {
                String str = entry.getKey();
                int editDistance = entry.getValue();
                if (editDistance != 0) {
                    i++;
                    if (i <= 10) {
                        System.out.println("Key: " + str);
                        System.out.println("Edit Distance: " + editDistance);
                        System.out.println();
                    }
                }
            }
        } else {
            System.out.println("Failed to parse the JSON file.");
        }
    }

}
