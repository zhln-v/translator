import React from 'react'
import { Text, View } from 'react-native'
import Slider from "@react-native-community/slider"

interface RangeProps {
    title: string;
    value: number;
    setValue: (val: number) => void
    visibleValue?: boolean
}

const Range: React.FC<RangeProps> = ({title, value, setValue, visibleValue}) => {
  return (
    <View style={{width: '100%'}}>
        <Text style={{padding: 10}}>{title}{visibleValue ? `: ${value}` : ''}</Text>
        <Slider
            minimumValue={10}
            maximumValue={26}
            vertical
            step={1}
            // value={value}
            onValueChange={ setValue }
        />
    </View>
  )
}

export default Range
