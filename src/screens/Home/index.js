import { ScrollView, ImageBackground, View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header'
import { blurImg, whiteImg } from '../utils'
import Icon from 'react-native-vector-icons/AntDesign'
// import DailyScheduler from './DailyScheduler';
import { Calendar } from '../../components/rn-calendar'
import SelectDropdown from 'react-native-select-dropdown'
import { Switch, TextInput } from 'react-native-paper';
import AnimatedModal from '../../components/AnimatedModal'
import { BlurView } from "@react-native-community/blur";
import moment from 'moment'
import AddAppointment from './AddAppointment';
import Draggable from 'react-native-draggable'

const SCREENHEIGHT = Dimensions.get('window').height;
const SCREENWIDTH = Dimensions.get('window').width;
let theme = 'light';

const Home = () => {

  const [searchInput, setSearchInput] = useState('')

  const [mode, setMode] = useState('week')
  const [selectDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'))
  const fullModes = ['DAY', 'WEEK', 'MONTH']
  const [lightStyle, setTheme] = useState(false)
  const [showEventSetter, setShowEventSetter] = useState(false)

  const [editEventSetter, setEditEventSetter] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editStart, setEditStart] = useState(new Date())
  const [editEnd, setEditEnd] = useState(new Date())
  const [editSummary, setEditSummary] = useState('')

  const [events, setEvents] = useState([
    {
      id:1,
      title: 'Coffee break',
      start: new Date('2022-9-25T05:00'),
      end: new Date('2022-9-25T09:00'),
      color: 'red',
    },
    {
      id:2,
      title: 'Meeting',
      start: new Date('2022-9-26T01:00'),
      end: new Date('2022-9-26T03:30'),
    },
    {
      id:3,
      title: 'Coffee break',
      start: new Date('2022-9-27T06:45'),
      end: new Date('2022-9-27T07:30'),
    },
    {
      id:4,
      title: 'Morning Meeting',
      start: new Date('2022-9-28T08:00'),
      end: new Date('2022-9-28T09:00'),
    },
    {
      id:5,
      title: 'Meeting',
      start: new Date('2022-9-29T02:00'),
      end: new Date('2022-9-29T04:30'),
    },
    {
      id:6,
      title: 'Meeting',
      start: new Date('2022-9-30T06:00'),
      end: new Date('2022-9-30T06:30'),
    },
    {
      id:7,
      title: 'Meeting',
      start: new Date('2022-9-31T05:45'),
      end: new Date('2022-9-31T08:30'),
    },
  ])

  const addEvent = (title, start, end) => {
    let eventes = [...events]
    eventes.push({ title, start, end })
    setEvents(eventes)
    setShowEventSetter(false)
  }

  const editEvent = (title, start, end) => {
    let eventes = [...events]
    const result = eventes.findIndex((item) => {
      if(item.title === editTitle && item.start.toISOString() === editStart.toISOString() && item.end.toISOString() === editEnd.toISOString() ) {
        return 1
      } else {
        return 0;
      }
    })
    eventes.splice(result, 1, {title, start, end})
    setEvents(eventes)
    setEditEventSetter(false)
  }

  const removeEvent = () => {
    let eventes = [...events]
    const result = eventes.findIndex((item) => {
      if(item.title === editTitle && item.start.toISOString() === editStart.toISOString() && item.end.toISOString() === editEnd.toISOString() ) {
        return 1
      } else {
        return 0;
      }
    })
    eventes.splice(result, 1)
    setEvents(eventes)
    setEditEventSetter(false)

  }
  const onDragComplete = (toDate,event) => {
    console.log("onDragComplete",event, toDate);
    let events_ = events?.filter(e => e.id !== event.id);
    let updatedEvent = mode=="month" ?
        {
          ...event,
          start: moment(toDate * 1000)
              .set({ hour: moment(event.start).hours(), minute: moment(event.start).minutes() })
              .toDate(),
          end: moment(toDate * 1000)
              .set({ hour: moment(event.end).hours(), minute: moment(event.end).minutes() })
              .toDate()
        }
        :
        {
          ...event,
          start: moment(toDate * 1000).toDate(),
          end: moment(toDate * 1000).add( moment(event.end).unix() - moment(event.start).unix() ,'seconds').toDate()
        }
    events_.push(updatedEvent);
    setEvents([...events_])
  }


   return (
    <View style={styles.container}>

      <ImageBackground source={ lightStyle === true ? require('../../assets/images/white_back.jpg') : require('../../assets/images/main_blur.jpg') } blurRadius={40} resizeMode="cover" style={styles.image}>
        <Header 
          title='Appointments' 
          search={searchInput} 
          addEventButton={true}
          handleSearch={setSearchInput} 
          showEventSetter={() => setShowEventSetter(true)}
        />

        <View style={styles.hStyle}>
          <View style={styles.swicher}>
            <Switch value={lightStyle} onValueChange={() => {
              setTheme(!lightStyle)
              theme = lightStyle === true ? 'light' : 'dark'
            }} />
            <Text style={{color: 'white'}}> {
                lightStyle === true ? 
                  'Light' : 'Dark'
              } 
            </Text>
          </View>

          <SelectDropdown
            data={fullModes}
            defaultButtonText={mode.toUpperCase()}
            buttonStyle={styles.pickerButtonStyle}
            buttonTextStyle={styles.pickerTextStyle}
            dropdownStyle={styles.pickerStyle}
            rowStyle={styles.rowStyle}
            rowTextStyle={styles.rowTextStyle}
            onSelect={(selectedItem, index) => {
              // console.log(selectedItem, index)
              setMode(selectedItem.toLowerCase())
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
            renderDropdownIcon={() => {
              return(
                <Icon name='downcircleo' size={20} color='white'></Icon>
              )
            }}
            dropdownIconPosition='right'
          />
        </View>
        <Calendar 
          events={events} 
          height={500}
          mode={mode}
          theme={lightStyle === true ? lightTheme : darkTheme}
          showTime={true}
          showAdjacentMonths={true}
          sortedMonthView={true}
          //renderEvent={CustomEventRenderer}
          onPressCell={(date) => {
            setSelectedDate(moment(date).format('YYYY-MM-DD'))
            setMode('day')
          }}
          onPressEvent={(event) => {
            setEditTitle(event.title)
            setEditStart(new Date(event.start))
            setEditEnd(new Date(event.end))
            setEditEventSetter(true)
          }}
          
          date={selectDate}
          draggableEvent={true}
          onDragComplete={onDragComplete}
        />
        {
          showEventSetter || editEventSetter === true ?  
            <BlurView
              style={{ width: SCREENWIDTH, height: 1 }}
              blurType="dark"
              blurAmount={10}
            />
          : <></>
        }
      </ImageBackground>
      {
        showEventSetter &&
        <AnimatedModal
          style={styles.modalView}
          visible={showEventSetter} 
          update={true}
          title='Add appointments'
          onClose={ () => setShowEventSetter(false) }
        >
          <AddAppointment 
            style={[styles.modalContainer, {backgroundColor: lightStyle ? 'white' : '#222222'}]}
            theme={lightStyle === true ? 'light' : 'dark'}
            onSubmit={addEvent}
            onCancel={ () => setShowEventSetter(false) }
          />
        </AnimatedModal>
      }
      {
        editEventSetter &&
        <AnimatedModal
          style={styles.modalView}
          visible={editEventSetter} 
          update={true}
          title='Edit Appointment'
          onClose={ () => setEditEventSetter(false) }
        >
          <AddAppointment 
            style={[styles.modalContainer, {backgroundColor: lightStyle ? 'white' : '#222222'}]}
            start={editStart}
            end={editEnd}  
            title={editTitle}
            summary={editSummary}
            theme={lightStyle === true ? 'light' : 'dark'}
            onSubmit={editEvent}
            onRemove={removeEvent}
            onCancel={ () => setEditEventSetter(false) }
          />
        </AnimatedModal>
      }
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
      height: SCREENHEIGHT,
      width: SCREENWIDTH,
      // paddingBottom: 73,
      zIndex: 1,
  },
  lowerback: {
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
  },
  modalContainer: {
    width: SCREENWIDTH,
  },
  modalView: {
    position: 'absolute',
    bottom: 63,
    left: 0,
    zIndex: 999,
  },

  header: {
    fontFamily: 'AlongSansExtraBold',
    color: 'white',
    fontSize: 30,
  }, 
  pickerButtonStyle: {
    width: SCREENWIDTH / 3.5,
    height: 30,
    // backgroundColor: '#6185D0',
    backgroundColor: '#36C15E',
    // borderColor: 'white',
    // borderWidth: 1,
    padding: 0,
    margin: 0,
  },
  pickerTextStyle: {
    color: 'white',
  },
  pickerStyle: {
    height: 90,
  },
  rowStyle: {
    height: 30,
  },
  rowTextStyle: {
    color: '#36C15E'
  },
  image: {
    flex: 1,
    marginBottom: 73,
  },
  hStyle: {
    backgroundColor: '#36C15E',
    width: SCREENWIDTH, 
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  swicher: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
})

const darkTheme = {
  palette: {
    primary: {
      main: '#6185d0',
      contrastText: '#000',
    },
    gray: {
      '100': '#333',
      '200': '#666',
      '300': '#888',
      '500': '#aaa',
      '800': '#ccc',
    },
  },
}

const lightTheme = {
  palette: {
    primary: {
      main: '#6185d0',
      contrastText: '#fff',
    },
    gray: {
      '100': '#f3f3f3',
      '200': '#eee',
      '300': '#ccc',
      '500': '#aaa',
      '800': '#333',
    },
  },
}