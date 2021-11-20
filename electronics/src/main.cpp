#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
 
const char* ssid = "Robotika";
const char* password =  "Robotika2121";
const char* mqttServer = "192.168.100.13";
const int mqttPort = 1883;
void callback(char* topic, byte* payload, unsigned int length);
WiFiClient espClient;
PubSubClient client(espClient);
int relay = 15;

void setup() {
  
  pinMode(relay, OUTPUT);
  Serial.begin(115200);
 
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
 
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
 
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
 
    if (client.connect("mqttjs_esp")) {
 
      Serial.println("connected");  
 
    } else {
 
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
 
    }
  }
 
 
}
 
void callback(char* topic, byte* payload, unsigned int length) {
 
  Serial.print("Message arrived in topic: ");
  // Serial.println(topic);
  digitalWrite(relay, HIGH);
  Serial.println("Current not Flowing");
  
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
   }

   if (payload[0] == '1'){
    digitalWrite(relay, HIGH);
    client.publish("current/status", "RELAY is ON");
   }

   else if (payload[0] == '0'){
    digitalWrite(relay, LOW);
    client.publish("current/status", "RELAY is OFF");
   }
 
  Serial.println();
  Serial.println("-----------------------");
 
}
 
void loop() {
  client.loop();
  client.subscribe("current/change");
  
}