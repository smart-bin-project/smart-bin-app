// DashboardScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MQTTService from '../../services/mqttService';

interface DashboardScreenProps {
  subscribedTopic: string;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ subscribedTopic }) => {
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [mqttService] = useState(new MQTTService());

  useFocusEffect(
    React.useCallback(() => {
      const connectAndSubscribe = async () => {
        try {
          await mqttService.connect();
          console.log('MQTT Connected!');

          console.log('Subscribed to topic:', subscribedTopic);

          await mqttService.subscribe(subscribedTopic, (message) => {
            const receivedMessage = message.payloadString;
            console.log('Received message:', receivedMessage);

            // Update the received messages state
            setReceivedMessages((prevMessages) => [...prevMessages, receivedMessage]);
          });

          // Display a confirmation message after subscribing
          console.log('Subscribe to topic:', subscribedTopic);

        } catch (error) {
          console.log('Failed to connect to MQTT:', error);
        }
      };

      connectAndSubscribe();

      // Cleanup function
      return () => {
        // Disconnect when the screen is unfocused
        mqttService.disconnect();
      };
    }, [mqttService, subscribedTopic])
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Display received messages */}
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Received Messages:</Text>
        {receivedMessages.map((message, index) => (
          <Text key={index}>{message}</Text>
        ))}
      </View>
    </View>
  );
};

export default DashboardScreen;
