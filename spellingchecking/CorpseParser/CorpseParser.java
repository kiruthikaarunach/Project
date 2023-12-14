package spellingchecking.CorpseParser;

import org.json.JSONObject;
import org.json.JSONException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;
public class CorpseParser {
    public static JSONObject parseJsonFile(String filePath) {
        try {
            // Read the JSON file content as a string
            String jsonContent = new String(Files.readAllBytes(Paths.get(filePath)));

            // Parse the JSON string into a JSONObject
            JSONObject jsonObject = new JSONObject(jsonContent);

            return jsonObject;
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return null;
    }


}
