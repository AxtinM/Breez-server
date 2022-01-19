#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
 
const char* ssid = "micky";
const char* password =  "12345678";
const char* mqttServer = "192.168.100.82";
const int mqttPort = 1882;
void callback(char* topic, byte* payload, unsigned int length);
WiFiClient espClient;
PubSubClient client(espClient);
// int relay = 3;

void setup() {
  
  pinMode(D3, OUTPUT);
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
  digitalWrite(D3, HIGH);
  Serial.println("Current not Flowing");
  
  Serial.print("Message:");
  for (unsigned int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
   }

   if (payload[0] == '1'){
    digitalWrite(D3, HIGH);
    Serial.println("On");
    client.publish("current/status", "RELAY is ON");
   }

   else if (payload[0] == '0'){
    digitalWrite(D3, LOW);
    Serial.println("Off");
    client.publish("current/status", "RELAY is OFF");
   }
 
  Serial.println();
  Serial.println("-----------------------");
 
}
 
void loop() {
  client.loop();
  client.subscribe("current/change");
  
}