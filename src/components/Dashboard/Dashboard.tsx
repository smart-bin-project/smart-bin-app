// DashboardScreen.js
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import MQTTService from '../../services/mqttService';

type ParamListBase = {
  Dashboard: { subscribedTopic?: string };
};

export type DashboardScreenProps = {
  route: RouteProp<ParamListBase, 'Dashboard'>;
};

const DashboardScreen: React.FC<DashboardScreenProps> = ({ route }) => {
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [mqttService] = useState(new MQTTService());

  useFocusEffect(
    React.useCallback(() => {
      const connectAndSubscribe = async () => {
        const subscribedTopic = route.params?.subscribedTopic || '';

        try {
          await mqttService.connect();
          console.log('MQTT Connected!');

          console.log('Subscribed to topic:', subscribedTopic);

          await mqttService.subscribe(subscribedTopic, (message) => {
            console.log('Received message:', message.payloadString);
            updateReceivedMessages(message.payloadString);
          });

          // Display a confirmation message after subscribing
          console.log('Subscribed to topic:', subscribedTopic);

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
    }, [mqttService, route.params?.subscribedTopic])
  );

  const updateReceivedMessages = (message: string) => {
    setReceivedMessages((prevMessages) => [...prevMessages, message]);
  };

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
