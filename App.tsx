// No arquivo App.js ou em algum outro arquivo principal
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './src/components/Dashboard/Dashboard';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        {/* Adicione mais telas ou abas conforme necessário */}
      </Tab.Navigator>
    </NavigationContainer>
  );

};

export default App;
