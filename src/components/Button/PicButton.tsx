import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useAppSettings } from '../../theme/ThemeProvider';
import THEME from '../../theme/theme';

interface PicButtonProps {
    name: string;
    onPress?: () => void;
    color?: string;
    size?: number;
}

const PicButton: React.FC<PicButtonProps> = ({name, onPress, color, size = 24}) => {
    const { appTheme } = useAppSettings();

    color = color ? color : THEME[appTheme].color;
    
    return (
        <TouchableOpacity onPress={onPress}>
            <Icon name={name} color={color} size={size} />
        </TouchableOpacity>
    )
}

export default PicButton
