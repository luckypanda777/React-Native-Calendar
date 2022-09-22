import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import moment from 'moment';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

const Scheduler = () => {
    const [items, setItems] = React.useState(
        {
            '2022-09-20': [
                {
                    start: '22:30:00',
                    end: '23:30:00',
                    title: 'Dr. Mariana Joseph',
                    summary: '3412 Piedmont Rd NE, GA 3032',
                }
            ],
            '2022-09-10': [
                {
                    start: '00:30:00',
                    end: '01:30:00',
                    title: 'Dr. Mariana Joseph',
                    summary: '3412 Piedmont Rd NE, GA 3032',
                },
                {
                    start: '01:30:00', 
                    end: '02:20:00',
                    title: 'Dr. Mariana Joseph',
                    summary: '3412 Piedmont Rd NE, GA 3032',
                },
                {
                    start: ' 04:10:00',
                    end: '04:40:00',
                    title: 'Dr. Mariana Joseph',
                    summary: '3412 Piedmont Rd NE, GA 3032',
                },
                {
                    start: '14:30:00',
                    end: '16:30:00',
                    title: 'Dr. Mariana Joseph',
                    summary: '3412 Piedmont Rd NE, GA 3032',      
                }
            ],
            '2022-09-14' : [
              {
                start: '01:20:00',
                end: '02:20:00',
                title: 'Dr. Mariana Joseph',
                summary: '3412 Piedmont Rd NE, GA 3032',
              },
              {
                start: '04:10:00',
                end: '04:40:00',
                title: 'Dr. Mariana Joseph',
                summary: '3412 Piedmont Rd NE, GA 3032',
              },
              {
                start: '00:45:00',
                end: '01:45:00',
                title: 'Dr. Mariana Joseph',
                summary: '3412 Piedmont Rd NE, GA 3032',
              },
              {
                start: '11:30:00',
                end: '12:30:00',
                title: 'Dr. Mariana Joseph',
                summary: '3412 Piedmont Rd NE, GA 3032',
              },
            ],
            '2022-09-15': [
                {
                    start: '01:30:00',
                    end: '02:00:00',
                    title: 'Dr. Mariana Joseph',
                    summary: '3412 Piedmont Rd NE, GA 3032',
                },
                {
                    start: '03:10:00',
                    end: '03:40:00',
                    title: 'Dr. Mariana Joseph',
                    summary: '3412 Piedmont Rd NE, GA 3032',
                },
                {
                    start: '00:10:00',
                    end: '01:45:00',
                    title: 'Dr. Mariana Joseph',
                    summary: '3412 Piedmont Rd NE, GA 3032',
                },    
            ],
            '2022-09-16': [
                {
                    start: '12:10:00',
                    end: '13:45:00',
                    title: 'Dr. Mariana Joseph',
                    summary: '3412 Piedmont Rd NE, GA 3032',
                },        
            ],
            '2022-09-18': [
                {
                    start: '12:10:00',
                    end: '13:45:00',
                    title: 'Dr. Mariana Joseph',
                    summary: '3412 Piedmont Rd NE, GA 3032',
                },
            ],
            '2022-09-1': [
                {
                    start: '12:10:00',
                    end: '13:45:00',
                    title: 'Dr. Mariana Joseph',
                    summary: '3412 Piedmont Rd NE, GA 3032',
                },
            ]
        }
    );

    const loadItems = (day) => {

        // setTimeout(() => {
        //     for (let i = 0; i < 10; i++) {
        //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        //         const strTime = timeToString(time);

        //         if (!items[strTime]) {
        //             items[strTime] = [];

        //             const numItems = Math.floor(Math.random() * 3 + 1);
        //             for (let j = 0; j < numItems; j++) {
        //                 items[strTime].push({
        //                     name: 'Item for ' + strTime + ' #' + j,
        //                     height: Math.max(10, Math.floor(Math.random() * 150)),
        //                     day: strTime
        //                 });
        //             }
        //         }
        //     }
        //     const newItems = {};
        //     Object.keys(items).forEach(key => {
        //         console.log(`${key}\n`)
        //         newItems[key] = items[key];
        //     });
        //     setItems(newItems);
        // }, 1000);
        for (let i = -7; i < 7; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);

            if (!items[strTime]) {
                items[strTime] = [];
            }
        }
        const newItems = {};
        Object.keys(items).forEach(key => {
            newItems[key] = items[key];
        });
        setItems(newItems);
    }

    const dateSort = () => {
    }

    useEffect(() => {
        dateSort()
    }, [])

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item}>
                <Card>
                    <Card.Content>
                        <View>
                            <Text> {item.start} - {item.end} </Text>
                            <Text> {item.title} </Text>
                            <Text> {item.summary} </Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={moment().format('YYYY-MM-DD')} // YYYY-MM-DD
                refreshControl={null}
                showClosingKnob={true}
                refreshing={true}
                renderItem={renderItem}
            />
            <StatusBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
});

export default Scheduler;