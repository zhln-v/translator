import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useModal } from "../screens/Settings";
import { useAppSettings } from "../theme/ThemeProvider";
import THEME from "../theme/theme";

// const theme = THEME['purple'];

const Header: React.FC<BottomTabHeaderProps> = (props) => {
    const insets = useSafeAreaInsets();
    const { showModal } = useModal();

    const {appTheme} = useAppSettings();
    const theme = THEME[appTheme];
  
    return(
      <View style={[{paddingTop: insets.top, backgroundColor: theme.background}]}>
        <View style={styles.header}>
          <Text style={[styles.nameScreen, {color: theme.color}]}>{props.options.tabBarLabel?.toString()}</Text>
          <TouchableOpacity style={styles.button} onPress={showModal}>
            <Icon name="settings" size={30} style={{color: theme.color      }} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    nameScreen: {
      fontSize: 22,
      fontWeight: 500,
      letterSpacing: 1.2,
      paddingLeft: 15
    },
    button: {
      padding: 10
    }
})

export default Header;