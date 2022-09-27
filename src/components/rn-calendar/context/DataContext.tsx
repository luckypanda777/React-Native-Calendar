import React, { createContext, useContext, useState } from 'react'

interface DataContextTypes  {
  cellLayouts:any
  updateCellLayout:Function
  scrollYOffset:number
  setScrollYOffset:Function
  isDragging:boolean
  setIsDragging:Function
  calendarHeight: number
  setCalendarHeight: Function
};

export const DataContext = createContext({} as DataContextTypes)

export const DataContextProvider = React.memo(({ children }) => {

  const [cellLayouts, setCellLayouts] = useState({});
  const [scrollYOffset, setScrollYOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [calendarHeight, setCalendarHeight] = useState(0)

  const updateCellLayout = (cell, layout) => {
    if (!cell || !layout) return;
    layout.pageY += scrollYOffset;
    //console.log("updateCellLayout",layout,cell);
    setCellLayouts(prev => {
      prev[cell] = layout;
      return prev;
    })
  }

  return (
    <DataContext.Provider
      value={{
        cellLayouts,
        updateCellLayout,
        scrollYOffset,
        setScrollYOffset,
        isDragging,
        setIsDragging,
        calendarHeight,
        setCalendarHeight,
      }}>
      {children}
    </DataContext.Provider>
  )
}
)

