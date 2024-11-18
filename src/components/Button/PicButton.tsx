import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface PicButtonProps {
    name: string;
    onPress?: () => void;
    color?: string;
    size?: number;
}

const PicButton: React.FC<PicButtonProps> = ({name, onPress, color = '#fff', size = 24}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Icon name={name} color={color} size={size} />
        </TouchableOpacity>
    )
}

export default PicButton
