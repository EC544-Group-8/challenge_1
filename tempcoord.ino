
#include <SoftwareSerial.h>
SoftwareSerial xbeeSerial(2, 3);
int arrayLen = 25;
float t1[25];
float t2[25];


void setup(void) {
  Serial.begin(9600);
  xbeeSerial.begin(9600);
}


void loop() {
  for (int i = 1; i < (arrayLen); i++) {
    delay(200);
    xbeeSerial.write("1");
    delay(2000);
    if (xbeeSerial.available() > 0) {
      
      char b1 = (char) xbeeSerial.read();
      Serial.print("char 1 ");
      Serial.println(b1);

      char b2 = (char) xbeeSerial.read();
      Serial.print("char 2 ");
      Serial.println(b2);
       String inString = "";
      //if the transmission is from 1
      if ((b1 == '1') && (b2 == ' ')) {
        while (xbeeSerial.available() > 0) {
          int inChar = xbeeSerial.read();
         
          if (inChar != '\n') {
            // Serial.print("inChar ");
            //  Serial.println(inChar);
            
            // As long as the incoming byte
            // is not a newline,
            // convert the incoming byte to a char
            // and add it to the string
            inString = inString + (char)inChar;
            //inString += (char)inChar;
           // Serial.print("inString ");
             //Serial.println(inString);
          }
          // if you get a newline, print the string,
          // then the string's value as a float:
          else {
             Serial.print("inString ");
             Serial.println(inString);
            Serial.print("Temp: ");
            Serial.println( inString.toFloat());

            t1[i] = inString.toFloat();
           
            inString = ""; // clear the string for new input:
            xbeeSerial.end();    // Ends the serial communication once all data is received
            xbeeSerial.begin(9600);  // Re-establishes serial communication , this causes deletion of anything previously stored
          }
        }
      }
    }
    Serial.print("i= ");
    Serial.println(i);
    Serial.print("t1[i]=");
    Serial.println(t1[i]);
  }
  // put your main code here, to run repeatedly:

}
