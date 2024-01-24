import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import {View, Text, StyleSheet, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Subscribe from './src/components/Subscribe/Subscribe';
import Publish from './src/components/Publish/Publish';
import DashboardScreen from './src/components/Dashboard/Dashboard';

const Tab = createBottomTabNavigator();

const App = () => {
  const [topic, setTopic] = useState('');

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Inscrever" component={Subscribe} />
        <Tab.Screen name="Publicar" component={Publish} />
        {/* Adicione mais telas ou abas conforme necessário */}
      </Tab.Navigator>
    </NavigationContainer>

  )};

export default App;