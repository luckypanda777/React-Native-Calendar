import React,{ createContext, useContext, useState, useEffect } from 'react'

export const DataContext = createContext({})

export const DataContextProvider  = React.memo(({children}) => {
	
    const [hourCellLayouts, setHourCellLayouts] = useState({});
    const [monthCellLayouts, setMonthCellLayouts] = useState({});
    const [scrollValue, setScrollValue] = useState(0);

    const updateCellLayout  = (cell,layout, mode)=>{
        if(!cell || !layout) return;
        if(mode === 'month') {
          setMonthCellLayouts(prev=>{
              prev[cell] = layout;
              return prev;
          })
        } else if( mode === 'hour' ) {
          setHourCellLayouts(prev=>{
              prev[cell] = layout;
              return prev;
          })
        }
    }
    
    return (
      <DataContext.Provider
        value={{
          monthCellLayouts,
          hourCellLayouts,
          updateCellLayout,
          scrollValue,
          setScrollValue
        }}>
        {children}
      </DataContext.Provider>
    )
  }
  )