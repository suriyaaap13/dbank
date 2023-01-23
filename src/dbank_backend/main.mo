import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank{
  stable var currentValue: Float = 300;
  // currentValue := 100;

  stable var startTime = Time.now();
  Debug.print(debug_show(startTime));

  public func topUp(amount: Float){
    currentValue+=amount;
    Debug.print(debug_show(currentValue));
  };

  // Allows users to decrease the currentValue
  public func withDarw(amount: Float){
    let temp: Float = currentValue-amount;
    if(temp>=0){
      currentValue-=amount;
      Debug.print(debug_show(currentValue));
    }else{
      Debug.print("The amount you are trying to withdraw is morethan your balance");
    }
    
  };

  public query func checkBalance(): async Float{
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime-startTime;
    let timeElapsedS = timeElapsedNS/1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
  }

}