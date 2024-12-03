import { useTheme } from '@/Theme/ThemeProvider'
import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

const Settings = () => {
    const {isShowModal, setHiddenModal, theme, setFontSize, fontSize, themes, setTheme} = useTheme();
    const [selectedThemeIndex, setSelectedThemeIndex] = useState(0); // Выбранная тема по индексу

    const handleSelectTheme = (index: number) => {
        console.log('121')
        setSelectedThemeIndex(index - 1);
        setTheme(index - 1);
    }
    
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={isShowModal}
        onRequestClose={() => setHiddenModal()}
    >
        <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, {backgroundColor: theme.backgroundColor}]}>
                <View style={{width: '100%', gap: 10, paddingVertical: 10}}>
                    <Text style={{color: theme.textColor}}>Размер текста: </Text>
                    <Slider
                        minimumValue={8}
                        maximumValue={30}
                        onValueChange={setFontSize}
                        value={fontSize}
                        style={{width: '100%'}}
                        thumbTintColor={theme.buttonColor}
                        minimumTrackTintColor={theme.fieldColor}
                        
                    />
                </View>
                
                <View style={{width: '100%'}}>
                    <Picker
                        selectedValue={selectedThemeIndex}
                        onValueChange={(itemValue) => {handleSelectTheme(itemValue); console.log('5501')}}
                        style={{ color: theme.textColor, width: '100%' }}
                        dropdownIconColor={theme.textColor}
                    >
                        {themes.map((theme, index) => (
                            <Picker.Item key={theme.name} label={theme.name} value={index + 1} />
                        ))}
                    </Picker>
                </View>
                
                <Pressable
                    style={[styles.closeButton, {backgroundColor: theme.buttonColor}]}
                    onPress={() => setHiddenModal()}
                >
                    <Text style={styles.closeButtonText}>Закрыть</Text>
                </Pressable>
            </View>
        </View>
    </Modal>
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
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    openButton: {
        backgroundColor: '#F194FF',
        padding: 10,
        borderRadius: 5,
        margin: 20,
        alignSelf: 'center',
    },
    openButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Settings
