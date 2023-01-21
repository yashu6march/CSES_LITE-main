import java.util.Scanner;  
class Main{
  public static void main(String[] args) {
     Scanner readInput= new Scanner(System.in);  
        int a = readInput.nextInt();  
        int b = readInput.nextInt();  
        readInput.close();               
          //Print the larger number between a and b  
          System.out.print(Math.max(a, b));  
  }
}