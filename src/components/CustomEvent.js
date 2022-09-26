import dayjs from 'dayjs'
import React, { useState } from 'react'
import { 
    RecursiveArray, 
    Text, 
    TouchableOpacity, 
    View, 
    ViewStyle, 
} from 'react-native'

import { formatStartEnd } from 'react-native-big-calendar'
import Draggable from 'react-native-draggable'

export const CustomEventRenderer = (
  event,
  touchableOpacityProps,
) => {
    // console.log(touchableOpacityProps)

    const [longPress, setLongPress] = useState(false)

    return (
        <TouchableOpacity
            {...touchableOpacityProps}
            style={[
                ...touchableOpacityProps.style,
                {
                    backgroundColor: 'white',
                    borderWidth: 1,
                    // borderColor: 'black',
                    borderLeftColor: event.color ? event.color : 'green',
                    borderLeftWidth: 10,
                    borderStyle: 'solid',
                    borderRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            ]}
        >
                {dayjs(event.end).diff(event.start, 'minute') < 32 ? (
                    <Text style={[{ color: 'black' }]}>
                       {event.title},
                    <Text style={[{ color: 'black' }]}>{dayjs(event.start).format('HH:mm')}</Text>
                    </Text>
                ) : (
                    <>
                        <Text style={[{ color: 'black' }]}>{event.title}</Text>
                        <Text style={[{ color: 'black' }]}>
                            {formatStartEnd(event.start, event.end, 'HH:mm')}
                        </Text>
                        {event.children && event.children}
                    </>
                )}
        </TouchableOpacity>
    )
}