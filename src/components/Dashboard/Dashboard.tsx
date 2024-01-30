import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MQTTService from '../../services/mqttService';
import { LineChart } from "react-native-gifted-charts";
import SmartBinClient from '../../services/trashDataService'; // Import SmartBinService

const DashboardScreen = ({ subscribedTopic }: { subscribedTopic: string }) => {
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [mqttService] = useState(new MQTTService());
  const [lineData, setLineData] = useState<Array<{ value: number, dataPointText: string }>>([]);
  const [smartBinData, setSmartBinData] = useState<any>(null); // State to store smart bin data
  const smartBinService = new SmartBinClient(); // Create instance of SmartBinService

  useEffect(() => {
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

          // Parse the received message as a number
          const parsedValue = parseFloat(receivedMessage);
          if (!isNaN(parsedValue)) {
            // Update the lineData array
            setLineData((prevData) => {
              // Slice the array to keep only the last 6 elements
              const slicedData = prevData.slice(-6);
              // Add the new value and dataPointText to the end of the slicedData
              const updatedData = [...slicedData, { value: parsedValue, dataPointText: receivedMessage }];
              return updatedData;
            });
          }
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
      // Disconnect when the component unmounts
      mqttService.disconnect();
    };
  }, [mqttService, subscribedTopic]);

  // Load smart bin data when component mounts
  useEffect(() => {
    const loadSmartBinData = async () => {
      try {
        // Call getSmartBinById function with the desired ID
        const data = await smartBinService.getSmartBinById(1);
        setSmartBinData(data);
      } catch (error) {
        console.error('Error fetching smart bin data:', error);
      }
    };

    loadSmartBinData();
  }, []); // Empty dependency array ensures this effect runs only once

  // Default range for the chart
  const defaultRange = [{ value: 0, dataPointText: '0' }];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text style={{ marginBottom: 20, fontSize: 18, fontWeight: 'bold' }}>Volume de lixo (%) x 5 minutos</Text>

      <View style={{ width: 350, backgroundColor: '#e7dfec', borderRadius: 10, padding: 10 }}>
        <LineChart
          data={lineData.length ? lineData : defaultRange} // Use default range if lineData is empty
          height={250}
          showVerticalLines
          spacing={44}
          initialSpacing={15}
          color1="#674fa3"
          textColor1="green"
          dataPointsHeight={6}
          dataPointsWidth={6}
          dataPointsColor1="blue"
          dataPointsColor2="red"
          textShiftY={-7}
          textShiftX={0}
          textFontSize={13}
          isAnimated
        />
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
      <Text style={{fontSize: 18, fontWeight: 'bold' }}>Dados da lixeira inteligente</Text>
      {/* Display smart bin data */}
      {smartBinData && (
        <View style={{ marginTop: 20, backgroundColor: '#e7dfec', justifyContent: 'center', alignItems: 'center', 
        padding: 10, borderRadius: 10}}>
          <Text style={{fontSize: 15, marginBottom: 8}}>Lixeira número {smartBinData.binNumber}</Text>
          <Text style={{fontSize: 15, marginBottom: 8}}>Enchimento mais recente: {smartBinData.fullTime}</Text>
          <Text style={{fontSize: 15, marginBottom: 8}}>Esvaziamento mais recente: {smartBinData.emptyTime}</Text>
        </View>
      )}
      </View>


    </View>
  );
};

export default DashboardScreen;
