// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import Subscribe from './src/components/Subscribe/Subscribe';
import Publish from './src/components/Publish/Publish';
import DashboardScreen, { DashboardScreenProps } from './src/components/Dashboard/Dashboard';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type ParamListBase = {
  Dashboard: { subscribedTopic?: string };
};

const App = () => {
  const [subscribedTopic, setSubscribedTopic] = useState('');

  console.log(subscribedTopic)

  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} initialParams={{ subscribedTopic }} />
        <Tab.Screen name="Inscrever">
          {(props) => (
            <Subscribe
              {...props} 
              setSubscribedTopic={setSubscribedTopic}
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