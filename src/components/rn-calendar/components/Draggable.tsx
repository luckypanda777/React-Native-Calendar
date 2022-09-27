import dayjs from 'dayjs'
import * as React from 'react'
import { TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native'
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
    const { cellLayouts, scrollYOffset,setIsDragging } = React.useContext(DataContext);
    const [ highlightedStyle, setHighlightedStyle ] = React.useState({ });
    const [layout, setLayout] = React.useState(null);

    const onDragRelease = (e ,f) => {
        //console.log('cellLayouts,',cellLayouts)
        setIsDragging(false);
        let x = e.nativeEvent.pageX;
        let y = e.nativeEvent.pageY;
        //console.log('onDragRelease', x, y, e.nativeEvent)
        if (x && y) {
            for (const [key, value] of Object.entries<any>(cellLayouts)) {
                //console.log(`${key}: ${value}`);
                let startX = value?.pageX;
                let endX = startX + value?.width;
                let startY = value?.pageY - scrollYOffset;
                let endY = startY + value?.height;
                let layoutMode = value.mode;
                
                if (x > startX && x < endX && y > startY && y < endY && mode == layoutMode) { 
                    //console.log('onDrag Matched cell',  'x:'+x,  'y:'+y,  'startX:'+startX, 'startY:'+startY, 'scrollOffset:'+scrollYOffset, "time:"+key);
                    onDragComplete(key,event);
                }
            }
        }
    }
    const onLongPress = () => {
        console.log('onLongPress');
    }
    const onDrag = (e, gestureState) => {
    }
    const styles = style.length? style:[style];
    return (
        <View style={[ ...styles,{ marginTop: 2, width: '100%', elevation:0, backgroundColor:'transparent', overflow: 'visible' }]} onLayout={(event) => setLayout(event.nativeEvent.layout)}>
            <Draggable x={0} y={0} z={1000}
                onDragRelease={onDragRelease}
                onLongPress={onLongPress}
                onShortPressRelease={() => { /*console.log('press drag');*/ onPress() }}
                onPressIn={() => {console.log('in press'); setIsDragging(true)}}
                onPressOut={() => { console.log('out press'); }}
                animatedViewProps={{ height:100, width: layout?.width ? layout?.width : '100%', zIndex: 500 }}
                touchableOpacityProps={{ onPress: () => { /*console.log('on press');*/ onPress() } }}
                onDrag={onDrag}
                shouldReverse
            >
                {children}
            </Draggable >
        </View >
    )
}

export const DraggableComponent = React.memo(_Draggable)