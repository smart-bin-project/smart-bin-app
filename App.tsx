import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import Subscribe from './src/components/Subscribe/Subscribe';
import Publish from './src/components/Publish/Publish';
import DashboardScreen from './src/components/Dashboard/Dashboard';

const Tab = createBottomTabNavigator();

const App = () => {
  const [subscribedTopic, setSubscribedTopic] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard">
          {(props) => (
            <DashboardScreen
              {...props}
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
