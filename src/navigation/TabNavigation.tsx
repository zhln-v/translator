import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useState } from 'react'
import Home from '../screens/Home';
import { BottomBarIcon } from '../components/BottomBar/BottomBar';
import Header from './Header';
import Bookmarks from '../screens/Bookmarks';
import { useModal } from '../screens/Settings';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button/Button';
import Range from '../components/Range/Range';
import { useAppSettings } from '../theme/ThemeProvider';
import THEME, { AllThemes } from '../theme/theme';
import { Picker } from '@react-native-picker/picker'

const Tab = createBottomTabNavigator();

const GlobalModal: React.FC = () => {
    const { isModalVisible, hideModal } = useModal();
    const { fontSize, setFontSize, appTheme, setAppTheme } = useAppSettings();
    const [selectedTheme, setSelectedTheme] = useState<AllThemes>(appTheme);
    const [tmpFz, setTmpFz] = useState<number>(fontSize);
  
    const applyTheme = () => {
      setAppTheme(selectedTheme);
      setFontSize(tmpFz);
      hideModal();
    };
  
    return (
      <Modal
        animationType="fade"
        transparent
        visible={isModalVisible}
        onRequestClose={hideModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Регулятор размера текста */}
            <Range title="Размер текста" value={tmpFz} setValue={ (size) => { setTmpFz(size) }} visibleValue />
  
            {/* Выпадающий список для выбора темы */}
            <Text style={styles.label}>Выберите тему:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedTheme}
                onValueChange={(itemValue: any) => setSelectedTheme(itemValue as AllThemes)}
                style={styles.picker}
              >
                {(['purple', 'red', 'pink', 'green', 'blue', 'teal', 'orange', 'yellow', 'gray', 'brown'] as AllThemes[]).map(
                  (theme) => (
                    <Picker.Item
                      key={theme}
                      label={theme.charAt(0).toUpperCase() + theme.slice(1)}
                      value={theme}
                    />
                  )
                )}
              </Picker>
            </View>
  
            {/* Кнопки подтверждения и закрытия */}
            <View style={styles.buttonContainer}>
              <Button title="Применить" onPress={applyTheme} />
              <Button title="Закрыть" onPress={hideModal} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

const TabNavigation = () => {
    const {appTheme} = useAppSettings();
    const theme = THEME[appTheme];
  return (
    <>
    <Tab.Navigator screenOptions={{ tabBarStyle: {backgroundColor: theme.background, height: 65}}}>
        <Tab.Screen name="Home" component={ Home } options={{
            tabBarIcon: (props) => <BottomBarIcon {...props} name="translate" color={theme.color} />,
            tabBarLabel: 'Перевести',
            tabBarLabelStyle: {
                fontSize: 14,
                color: theme.color
            },
            header: (props) => <Header {...props} />
        }} />
        <Tab.Screen name="Bookmarks" component={ Bookmarks } options={{
            tabBarIcon: (props) => <BottomBarIcon {...props} name="bookmark-outline" color={theme.color} />,
            tabBarLabel: 'Закладки',
            tabBarLabelStyle: {
                fontSize: 14,
                color: theme.color
            },
            header: (props) => <Header {...props} />
        }} />
    </Tab.Navigator>
        <GlobalModal />
    </>
  )
}

const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    label: {
      marginTop: 20,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    pickerContainer: {
      width: '100%',
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
    },
    picker: {
      width: '100%',
      height: 60,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      width: '100%',
    },
  });

export default TabNavigation
