// #include <Arduino.h>
// #include <ESP8266WiFi.h>
// #include <PubSubClient.h>
// #include <ESP8266TrueRandom.h>
 
// const char* ssid = "micky";
// const char* password =  "12345678";
// const char* topic = "status";
// const char* mqttServer = "robotn-cloud-server.robotika.systems";
// const int mqttPort = 1883;
// const char *username = "robotika";
// const char *pass = "robotika";
// int relay = 2;

// byte uuidNumber[16];

// void callback(char* topic, byte* payload, unsigned int length);
// WiFiClient espClient;
// PubSubClient client(espClient);

// void setup() {
  
//   pinMode(relay, OUTPUT);
//   Serial.begin(115200);
//   WiFi.begin(ssid, password);
 
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(2000);
//     Serial.println("Connecting to WiFi..");
//   }
//   Serial.println("Connected to the WiFi network");
  
//   ESP8266TrueRandom.uuid(uuidNumber);
//   String uuidStr = ESP8266TrueRandom.uuidToString(uuidNumber);
//   Serial.println("The UUID number is " + uuidStr);
//   const String clientId = "mqttjs_esp" + uuidStr;

//   client.setServer(mqttServer, mqttPort);
//   client.setCallback(callback);
 
//   while (!client.connected()) {
//     Serial.println("Connecting to MQTT...");

//     if (client.connect(clientId.c_str(), username, pass)) {
 
//       Serial.println("connected");  
 
//     } else {
 
//       Serial.print("failed with state ");
//       Serial.print(client.state());
//       delay(2000);
 
//     }
//   }
 

// }
 
// void callback(char* topic, byte* payload, unsigned int length) {
 
//   Serial.print("Message arrived in topic: ");
  
//   Serial.print("Message:");
//   for (unsigned int i = 0; i < length; i++) {
//     Serial.print((char)payload[i]);
//    }

//    if (payload[0] == '1'){
//     digitalWrite(relay, HIGH);
//     Serial.println("On");
//     client.publish("B", "RELAY is ON");
//    }

//    else if (payload[0] == '0'){
//     digitalWrite(relay, LOW);
//     Serial.println("Off");
//     client.publish("B", "RELAY is OFF");
//    }
 
//   Serial.println();
//   Serial.println("-----------------------");
 
// }
 
// void loop() {
//   client.loop();
//   client.subscribe(topic);
// }