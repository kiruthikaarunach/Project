package spellingchecking.EditDistance;

public class EditDistance {
    public static int editDistance(String word1,String word2) {

        int len1=word1.length();
        int len2=word2.length();

        int[][]dp=new int[len1+1][len2+1];

        for(int i=len1;i>=0;i--) {
            dp[i][len2]=len1-i;
        }

        for(int j=len2;j>=0;j--) {
            dp[len1][j]=len2-j;
        }

        for(int i=len1-1;i>=0;i--) {
            char c1=word1.charAt(i);
            //System.out.println(c1);
            for(int j=len2-1;j>=0;j--) {
                char c2=word2.charAt(j);
                //System.out.println(c2);

                if(c1==c2) {
                    dp[i][j]=dp[i+1][j+1];
                }else {
                    dp[i][j]=Math.min(dp[i][j+1]+1, Math.min(dp[i+1][j]+1, dp[i+1][j+1])+1);
                }

            }
        }

        //drawMatrix(dp, word1, word2);
        return dp[0][0];

    }

    public static void drawMatrix(int[][] dp,String word1,String word2) {
        int rows=dp.length;
        int cols=dp[0].length;

        System.out.printf("\t ");
        for (char c : word2.toCharArray()) {
            System.out.printf("%c\t", c);
        }
        System.out.println();

        for (int i = 0; i < rows; i++) {
            if(i<rows-1)
                System.out.printf("%c\t ", word1.charAt(i));
            else
                System.out.printf("\t ");
            for (int j = 0; j < cols; j++) {
                System.out.print(dp[i][j] + "\t");
            }
            System.out.println();
        }
    }
    public static void main(String[] args) {
       int editDistance= editDistance("bananal", "cahamal");
        System.out.println("Edit Distance is "+editDistance);
    }
}
