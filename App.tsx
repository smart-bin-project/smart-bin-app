import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import Subscribe from './src/components/Subscribe/Subscribe';
import Publish from './src/components/Publish/Publish';
import DashboardScreen from './src/components/Dashboard/Dashboard';
import {AntDesign, FontAwesome} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  const [subscribedTopic, setSubscribedTopic] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard"
        options={{
          tabBarIcon: ({}) => (
            <AntDesign name="linechart" size={24} color="black" />)
        }}>
          {(props) => (
            <DashboardScreen
              {...props}
              subscribedTopic={'node-red/test'}
              receivedMessages={receivedMessages}
            />
          )}
        
        </Tab.Screen>
        <Tab.Screen name="Publicar" 
        options={{
          tabBarIcon: ({}) => (
            <AntDesign name="upload" size={24} color="black" />)
        }}
        component={Publish} />
        {/* Add more screens or tabs as needed */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
