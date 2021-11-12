import paho.mqtt.client as mqtt
import time

mqttBroker = "mqtt.eclipseprojects.io"
client = mqtt.Client("Local_Bridge")
client.connect(mqttBroker)

while True:
    client.publish("Current_Status", 1)
    print("Just Published 1 to Topic Current_Status")
    time.sleep(1)