// DashboardScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import MQTTService from '../../services/mqttService';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type ParamListBase = {
  Dashboard: { subscribedTopic?: string };
};

export type DashboardScreenProps = {
  route: RouteProp<ParamListBase, 'Dashboard'>;
};

const DashboardScreen = () => {
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [mqttService] = useState(new MQTTService());

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  /* useEffect(
    React.useCallback(() => {
      const connectAndSubscribe = async () => {
        console.log(route.params?.subscribedTopic)

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
    }, [mqttService, route.params?.subscribedTopic]), [route.params?.subscribedTopic]
  );

  const updateReceivedMessages = (message: string) => {
    setReceivedMessages((prevMessages) => [...prevMessages, message]);
  }; */

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '100%', height: '80%' }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </View>
    </View>
  );
};

export default DashboardScreen;