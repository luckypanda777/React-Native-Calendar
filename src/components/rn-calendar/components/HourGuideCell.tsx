import dayjs from 'dayjs'
import * as React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { CalendarCellStyle } from '../interfaces'

import { u } from '../commonStyles'
import { useTheme } from '../theme/ThemeContext'
import { DataContext } from '../context/DataContext'

interface HourGuideCellProps {
  cellHeight: number
  onPress: (d: dayjs.Dayjs) => void
  date: dayjs.Dayjs
  hour: number
  index: number
  calendarCellStyle?: CalendarCellStyle
  mode: string
}

const _HourGuideCell = ({
  cellHeight,
  onPress,
  date,
  hour,
  index,
  calendarCellStyle,
  mode
}: HourGuideCellProps) => {
  const theme = useTheme()

  const getCalendarCellStyle = React.useMemo(
    () => (typeof calendarCellStyle === 'function' ? calendarCellStyle : () => calendarCellStyle),
    [calendarCellStyle],
  )
  
  let cellRef = React.useRef<any>([]);
  const { updateCellLayout } = React.useContext(DataContext);

  const onCellLayout = ({ nativeEvent }, date, hour) => {
    const time=date.hour(hour).minute(0).unix();
    cellRef?.current?.measure((x, y, width, height, pageX, pageY) => {
      //console.log("row pageY", x, y, width, height);
      let layout = { width, height, pageX,  pageY, mode:mode };
      //console.log("onCellLayout:Week",layout,time);
      updateCellLayout(time, layout)
    });
  }

  return (
    <View    
      ref={cellRef}
      onLayout={e => onCellLayout(e, date,hour)}
    >
    <TouchableWithoutFeedback 
      onPress={() => onPress(date.hour(hour).minute(0))} 
    >
      <View
        style={[
          u['border-l'],
          u['border-b'],
          { borderColor: theme.palette.gray['200'] },
          { height: cellHeight },
          { ...getCalendarCellStyle(date.toDate(), index) },
        ]}
      />
    </TouchableWithoutFeedback>
    </View>
  )
}

export const HourGuideCell = React.memo(_HourGuideCell)
