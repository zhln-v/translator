// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";

import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabNavigation from "./src/navigation/TabNavigation";

const App = () => {
  return (
    <NavigationContainer>
        <SafeAreaProvider>
          <TabNavigation />
        </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;