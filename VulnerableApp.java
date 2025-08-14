// VulnerableApp.java
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class VulnerableApp {
    public static void main(String[] args) {
        if (args.length < 1) {
            System.out.println("Usage: java VulnerableApp <command>");
            return;
        }

        String command = args[0];
        try {
            // BAD: OS command injection vulnerability
            Process process = Runtime.getRuntime().exec(command);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
