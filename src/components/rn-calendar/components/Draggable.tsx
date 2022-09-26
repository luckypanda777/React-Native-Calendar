import dayjs from 'dayjs'
import * as React from 'react'
import { TouchableWithoutFeedback, TouchableOpacity, View, Dimensions } from 'react-native'
import Draggable from './RNDraggable';

import { useTheme } from '../theme/ThemeContext'
import { DataContext } from '../context/DataContext'


interface DraggableProps {
    style?: any
    onPress?: () => void,
    children?: any,
    event?: any,
    onDragComplete?: (event:any,date:Date) => void,
    mode:string
}


const _Draggable = ({
    style,
    onPress,
    children,
    event,
    onDragComplete,
    mode="month"
}: DraggableProps) => {

    const theme = useTheme()
    const { monthCellLayouts, hourCellLayouts, scrollValue } = React.useContext(DataContext);
    const [ highlightedStyle, setHighlightedStyle ] = React.useState({ });
    const [layout, setLayout] = React.useState(null);

    const onDragRelease = (e ,f) => {
        let x = e.nativeEvent.pageX;
        let y = e.nativeEvent.pageY;
        const cellLayouts = mode === 'month' ? monthCellLayouts : hourCellLayouts
        if (x && y) {
            for (const [key, value] of Object.entries(cellLayouts)) {
                let startX = value?.pageX;
                let endX = value?.pageX + value?.width;
                let startY = value?.pageY;
                let endY = value?.pageY + value?.height; 
                let layoutMode = value.mode;

                const ysc = y
                if(mode !== 'month') ysc = ysc + scrollValue;

                if (x > startX && x < endX && ysc > startY && ysc < endY && mode == layoutMode) { 
                    onDragComplete(key,event);
                }
            }
        }
    }
    const onLongPress = () => {
    }
    const onDrag = (e, gestureState) => {
    }
    const styles = style.length? style:[style];
    return (
        <View style={[ ...styles,{ marginTop: 2, width: '100%', elevation:0, backgroundColor:'transparent', overflow: 'visible' }]} onLayout={(event) => setLayout(event.nativeEvent.layout)}>
            <Draggable x={0} y={0} z={1000}
                onDragRelease={onDragRelease}
                onLongPress={onLongPress}
                onShortPressRelease={() => { console.log('press drag'); onPress() }}
                onPressIn={() => console.log('in press')}
                onPressOut={() => { console.log('out press') }}
                animatedViewProps={{ height:100, width: layout?.width ? layout?.width : '100%', zIndex: 500 }}
                touchableOpacityProps={{ onPress: () => { console.log('on press'); onPress() } }}
                onDrag={onDrag}
                shouldReverse
            >
                {children}
            </Draggable >
        </View >
    )
}

export const DraggableComponent = React.memo(_Draggable)