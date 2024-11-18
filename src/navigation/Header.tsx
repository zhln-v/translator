import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import THEME from "../theme/theme";

const theme = THEME['purple'];

const Header: React.FC<BottomTabHeaderProps> = (props) => {
    const insets = useSafeAreaInsets();
  
    return(
      <View style={[styles.container, {paddingTop: insets.top}]}>
        <View style={styles.header}>
          <Text style={styles.nameScreen}>{props.options.tabBarLabel?.toString()}</Text>
          <TouchableOpacity style={styles.button}>
            <Icon name="settings" size={30} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    nameScreen: {
      color: theme.color,
      fontSize: 22,
      fontWeight: 500,
      letterSpacing: 1.2,
      paddingLeft: 15
    },
    button: {
      padding: 10
    },
    icon: {
        color: theme.color
    }
})

export default Header;