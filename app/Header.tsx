import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Feather from '@expo/vector-icons/Feather';
import { useTheme } from "@/Theme/ThemeProvider";

interface HeaderProps {
    options: BottomTabNavigationOptions
}
const Header: React.FC<HeaderProps> = ({options}) => {
    const {theme} = useTheme();

    return (
        <View style={[styles.container, {backgroundColor: theme.headerColor}]}>
            <Text style={{fontSize: 20, width: '50%', color: theme.textColor}}>{options.title}</Text>
            
            <TouchableOpacity>
                <Feather name="settings" size={24} color={theme.textColor} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

export default Header