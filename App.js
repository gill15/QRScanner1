import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import QRScanner from './QRScanner'; // Import from your QRScanner file
import Settings from './Settings'; // Import from your Settings file

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="QRScanner">
        <Drawer.Screen name="QRScanner" component={QRScanner} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
