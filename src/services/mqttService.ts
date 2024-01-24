// MQTTService.js
import Paho from 'paho-mqtt';

class MQTTService {
  client: any;
  subscribedTopics: string[];

  constructor() {
    this.client = new Paho.Client('broker.hivemq.com', Number(8000), `mqtt-async-test-${Math.random() * 100}`);
    this.subscribedTopics = [];
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.connect({
        onSuccess: () => {
          console.log('Connected!');
          resolve();
        },
        onFailure: () => {
          console.log('Failed to connect!');
          reject();
        },
      });
    });
  }

  async subscribe(topic: any, onMessageReceived: (arg0: any) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    this.subscribedTopics.push(topic);

    // Set the onMessageArrived callback before connecting
    this.client.onMessageArrived = (message: { destinationName: any; payloadString: any }) => {
      if (this.subscribedTopics.includes(message.destinationName)) {
        console.log(message.payloadString);
        onMessageReceived(message);
      }
    };

    this.client.subscribe(topic, {
      onSuccess: () => {
        console.log(`Subscribed to topic: ${topic}`);
        resolve();
      },
      onFailure: (err: any) => {
        console.log(`Failed to subscribe to topic: ${topic}`, err);
        reject();
      },
    });
  });
}


  async disconnect(): Promise<void> {
    return new Promise((resolve) => {
      this.client.disconnect();
      resolve();
    });
  }
}

export default MQTTService;
