import paho.mqtt.client as mqtt
import time

def on_message(client, userdata, message):
    print("Recieved message: ", str(message.payload.decode("utf-8")))

mqttBroker = "mqtt.eclipseprojects.io"
client = mqtt.Client("smart_plug")
client.connect(mqttBroker)

client.loop_start()

client.subscribe("Current_Status")
client.on_message = on_message
time.sleep(5)
client.loop_stop()