import dayjs from 'dayjs'
import * as React from 'react'

import { OVERLAP_OFFSET, u } from '../commonStyles'
import { useCalendarTouchableOpacityProps } from '../hooks/useCalendarTouchableOpacityProps'
import { EventCellStyle, EventRenderer, ICalendarEventBase } from '../interfaces'
import { useTheme } from '../theme/ThemeContext'
import { DAY_MINUTES, getRelativeTopInDay, getStyleForOverlappingEvent, typedMemo } from '../utils'
import { DefaultCalendarEventRenderer } from './DefaultCalendarEventRenderer'
import { DraggableComponent } from '../components/Draggable';
import { DataContext } from '../context/DataContext'

interface CalendarEventProps<T extends ICalendarEventBase> {
  event: T
  onPressEvent?: (event: T) => void
  eventCellStyle?: EventCellStyle<T>
  showTime: boolean
  eventCount?: number
  eventOrder?: number
  overlapOffset?: number
  renderEvent?: EventRenderer<T>
  ampm: boolean
  draggableEvent?: boolean
  onDragComplete?: (event: T, date: Date) => void
  mode:string
}

function _CalendarEvent<T extends ICalendarEventBase>({
  event,
  onPressEvent,
  eventCellStyle,
  showTime,
  eventCount = 1,
  eventOrder = 0,
  overlapOffset = OVERLAP_OFFSET,
  renderEvent,
  ampm,
  draggableEvent,
  onDragComplete,
  mode
}: CalendarEventProps<T>) {
  const theme = useTheme()

  const palettes = React.useMemo(
    () => [theme.palette.primary, ...theme.eventCellOverlappings],
    [theme],
  )
  const { calendarHeight } = React.useContext(DataContext)
  
  const getEventCellPositionStyle = (start: Date, end: Date) => {
    const relativeHeight = 100 * (1 / DAY_MINUTES) * dayjs(end).diff(start, 'minute')
    const relativeTop = getRelativeTopInDay(dayjs(start))
    return {
      height: `${relativeHeight}%`,
      top: `${relativeTop}%`
    }
  }

  const getEventCellPositionDraggableStyle = (start: Date, end: Date) => {
    console.log('date-diff', start, dayjs(end).diff(start, 'minute'))
    console.log('start_top', dayjs(start))
    const relativeHeight = 100 * (1 / DAY_MINUTES) * dayjs(end).diff(start, 'minute')
    const relativeTop = getRelativeTopInDay(dayjs(start))
    console.log(relativeTop * (calendarHeight * 24 - 5) / 100)
    return {
      height: relativeHeight * ( calendarHeight * 24 - 5 ) / 100,
    }
  }

  const touchableOpacityProps = useCalendarTouchableOpacityProps({
    event,
    eventCellStyle,
    onPressEvent,
    injectedStyles: [
      getEventCellPositionStyle(event.start, event.end),
      getStyleForOverlappingEvent(eventOrder, overlapOffset, palettes),
      u['absolute'],
      u['mt-2'],
      u['mx-3'],
    ],
  })

  const textColor = React.useMemo(() => {
    const fgColors = palettes.map((p) => p.contrastText)
    return fgColors[eventCount % fgColors.length] || fgColors[0]
  }, [eventCount, palettes])
  
  const dragableTouchableProps =  useCalendarTouchableOpacityProps({
    event,
    eventCellStyle,
    injectedStyles: [
      getEventCellPositionDraggableStyle(event.start, event.end),
      getStyleForOverlappingEvent(eventOrder, overlapOffset, palettes),
      {zIndex:1000}
    ],
  })

  if (draggableEvent)
    return (
      <DraggableComponent
        event={event}
        mode={mode}
        onDragComplete={onDragComplete}
        {...touchableOpacityProps}
      >
        {
          renderEvent ?
            renderEvent(event, touchableOpacityProps)
            :
            <DefaultCalendarEventRenderer
              event={event}
              showTime={showTime}
              ampm={ampm}
              touchableOpacityProps={dragableTouchableProps}
              textColor={textColor}
            />
      }
      </DraggableComponent>
    )

  return (
    <>
      {
        renderEvent ?
          renderEvent(event, touchableOpacityProps)
          :
          <DefaultCalendarEventRenderer
            event={event}
            showTime={showTime}
            ampm={ampm}
            touchableOpacityProps={touchableOpacityProps}
            textColor={textColor}
          />
      }
    </>


  )
}

export const CalendarEvent = typedMemo(_CalendarEvent)
