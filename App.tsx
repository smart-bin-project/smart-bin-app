// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import Subscribe from './src/components/Subscribe/Subscribe';
import Publish from './src/components/Publish/Publish';
import DashboardScreen from './src/components/Dashboard/Dashboard';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type ParamListBase = {
  Dashboard: { subscribedTopic?: string };
};

const App = () => {
  const [subscribedTopic, setSubscribedTopic] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard">
          {() => (
            <DashboardScreen
              subscribedTopic={subscribedTopic}
              receivedMessages={receivedMessages}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Inscrever">
          {(props) => (
            <Subscribe
              {...props}
              setSubscribedTopic={setSubscribedTopic}
              setReceivedMessages={setReceivedMessages}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Publicar" component={Publish} />
        {/* Add more screens or tabs as needed */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
