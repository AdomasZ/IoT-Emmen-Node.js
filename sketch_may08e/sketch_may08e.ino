#include <MKRWAN.h>

const char *appEui = "70B3D57ED001BCC1";
const char *appKey = "050A3C7C1D82BBEBA2D56CDBF83459A5";

const int trigPin = 9;
const int echoPin = 10;

float duration, distance;
// Select your region (AS923, AU915, EU868, KR920, IN865, US915, US915_HYBRID)
_lora_band region = EU868;

LoRaModem modem(Serial1);

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
  Serial.begin(115200);

  if (!modem.begin(region)) {
    Serial.println("Failed to start module");
    while (1) {}
  };
  Serial.print("Your device EUI is: ");
  Serial.println(modem.deviceEUI());

  int connected = modem.joinOTAA(appEui, appKey);
  if (!connected) {
    Serial.println("Something went wrong; are you indoor? Move near a window and retry");
    while (1) {}
  }
  Serial.println("Successfully joined the network!");

  Serial.println("Enabling ADR and setting low spreading factor");
  modem.setADR(true);
  modem.dataRate(5);
}

void loop() {

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = (duration*.0343)/2;
  Serial.print("Distance: ");
  Serial.println(String(distance));
  modem.beginPacket();
  modem.print(String(distance));

  int err = modem.endPacket(false);

  if (err > 0) {
    Serial.println("Big success!");
  } else {
    Serial.println("Error");
  }
  delay(200 * 60);
}
