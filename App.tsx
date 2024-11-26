import { NavigationContainer } from "@react-navigation/native";

import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabNavigation from "./src/navigation/TabNavigation";
import { ModalProvider } from "./src/screens/Settings";
import { AppSettingsProvider } from "./src/theme/ThemeProvider";

const App = () => {
  return (
    <AppSettingsProvider>
      <NavigationContainer>
          <SafeAreaProvider>
            <ModalProvider>
              <TabNavigation />
            </ModalProvider>
          </SafeAreaProvider>
      </NavigationContainer>
    </AppSettingsProvider>
  );
}

export default App;