import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useSelector, useDispatch } from 'react-redux';
const ListInvoice = ({ navigation }) => {
    const [selected, setSelected] = useState("");
    const [showCaclendar, setShowCaclendar] = useState(false)
    const [datalistinvoice, SetDataListInvoice] = useState(null)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [itemBill, setItemBill] = useState(null)
    const [labelChart, setLabelChart] = useState(null);
    const [dataInChart, setDataInChart] = useState([null]);
    const [data, setData] = useState(null)
    const invoices = useSelector(state => state.invoiceReducer.invoices)
    const dispatch = useDispatch();
    const [hourRanges, setHourRanges] = useState({
        "0-3": 0,
        "3-6": 0,
        "6-9": 0,
        "9-12": 0,
        "12-15": 0,
        "15-18": 0,
        "18-21": 0,
        "21-24": 0,
    });
    useFocusEffect(
        React.useCallback(() => {
         fetchData();
          dispatch({ type: "GET_INVOICES" });
        }, [])
      );
    const fetchData = () => {
        fetch(shareVarible.URLink + '/invoices/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                SetDataListInvoice(data)
            },
            )
            .catch(error => console.log(error));
    };

    //Delete Invoice
    const AlertDeteleInvoice = (item) => {
        Alert.alert('Delete', 'Delete this invoice ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () =>
                    DeteleInvoice(item)
            },
        ]);
    }
    const DeteleInvoice = () => {
        fetch(shareVarible.URLink + '/invoice/delete/' + `${itemBill}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: "GET_INVOICES" });
            })
            .catch(error => {
                console.error('Error', error);
            }
            )
    }

    const dataChart = () => {
        const newHourRanges = {
            "0-3": 0,
            "3-6": 0,
            "6-9": 0,
            "9-12": 0,
            "12-15": 0,
            "15-18": 0,
            "18-21": 0,
            "21-24": 0,
        };
        fetch(shareVarible.URLink + '/invoices/' + `${selected.day}/` + `${selected.month}/` + `${selected.year}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => { 
                const numberOfElements = data.length;
                data.forEach(element => {
                if (element.hour >= 0 && element.hour < 3) {
                    newHourRanges["0-3"] += element.total;
                } else if (element.hour >= 3 && element.hour < 6) {
                    newHourRanges["3-6"] += element.total;
                } else if (element.hour >= 6 && element.hour < 9) {
                    newHourRanges["6-9"] += element.total;
                }
                else if (element.hour >= 9 && element.hour < 12) {
                    newHourRanges["9-12"] += element.total;
                }
                else if (element.hour >= 12 && element.hour < 15) {
                    newHourRanges["12-15"] += element.total;
                } else if (element.hour >= 15 && element.hour < 18) {
                    newHourRanges["15-18"] += element.total;
                }
                else if (element.hour >= 18 && element.hour < 21) {
                    newHourRanges["18-21"] += element.total;
                } else if (element.hour >= 21 && element.hour < 24) {
                    newHourRanges["21-24"] += element.total;
                }
            });
            navigation.navigate("ChartofInvoice", { selected , newHourRanges, numberOfElements})
        })
        .catch(error => console.log(error));
    }

    //Design FatList
    const renderlist = ((item) => {
        if (selected == "") {
            return (
                <View>
                    <TouchableOpacity style={styles.V1} onPress={() => navigation.navigate('ListProductInInvoice', { item })}>
                        <View style={styles.V11}>
                            <Text style={{ fontSize: 18 }}>
                                Ngày lập: {item.day.toString().padStart(2, '0')}/{item.month.toString().padStart(2, '0')}/{item.year}({item.minute.toString().padStart(2, '0')}:{item.hour.toString().padStart(2, '0')})
                            </Text>
                            <Text style={{ fontSize: 18 }}>Tên bàn: {item.name}</Text>
                            <Text style={{ fontSize: 18 }}>Tổng tiền: {item.total}$</Text>
                        </View>
                        <View style={styles.V13}>
                            <TouchableOpacity onPress={() => {
                                setItemBill(item._id)
                                setShowConfirmDelete(true)
                            }}>
                                <Ionicons name='remove-circle-sharp' size={35} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            if (item.day === selected.day && item.month === selected.month && item.year === selected.year) {
                return (
                    <View>
                        <TouchableOpacity style={styles.V1} onPress={() => navigation.navigate('ListProductInInvoice', { item })}>
                            <View style={styles.V11}>
                                <Text style={{ fontSize: 18 }}>
                                    ngày lập: {item.day.toString().padStart(2, '0')}/{item.month.toString().padStart(2, '0')}/{item.year}({item.minute.toString().padStart(2, '0')}:{item.hour.toString().padStart(2, '0')})
                                </Text>
                                <Text style={{ fontSize: 18 }}>Tên Bàn: {item.name}</Text>
                                <Text style={{ fontSize: 18 }}>Tổng tiền: {item.total}$</Text>
                            </View>
                            <View style={styles.V13}>
                                <TouchableOpacity onPress={() => {
                                    setItemBill(item._id)
                                    setShowConfirmDelete(true)
                                }}>
                                    <Ionicons name='remove-circle-sharp' size={35} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return null; // Không in ra item không phù hợp
            }
        }
    })
    return (
        <View style={styles.V12}>
            <Modal
                transparent={true}
                visible={showConfirmDelete}
                animationType='fade'
            >
                <View style={styles.centeredView}>
                    <View style={{
                        height: 70,
                        width: 300,
                        backgroundColor: "#FDD736",
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Ionicons name='help' size={70} color="white" style={{ marginTop: 3, position: 'absolute' }} />
                        <Ionicons name='cloudy-outline' size={30} color="white" style={{ marginRight: 140 }} />
                        <Ionicons name='cloudy-outline' size={30} color="white" style={{ marginLeft: 140 }} />
                    </View>
                    <View style={{
                        height: 150,
                        width: 300,
                        backgroundColor: "white",
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{ fontSize: 22, fontWeight: '900', marginTop: -10 }}>Xóa hóa đơn này?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', height: '40%', alignItems: 'flex-end' }}>
                            <TouchableOpacity
                                onPress={() => { setShowConfirmDelete(false) }}
                                style={[styles.styButton, { backgroundColor: '#D85261' }]}>
                                <Text style={{ fontSize: 18, fontWeight: '600' }}>hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowConfirmDelete(false)
                                    DeteleInvoice()
                                }}
                                style={[styles.styButton, { backgroundColor: '#038857' }]}>
                                <Text style={{ fontSize: 18, fontWeight: '600' }}>đồng ý</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingHorizontal: 15 }}>
                <TouchableOpacity
                    onPress={() => { setShowCaclendar(!showCaclendar) }}
                >
                    <Ionicons name='calendar-outline' size={35} />
                </TouchableOpacity>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                <Text style={{ fontSize: 16, fontWeight: "700" }}>Danh sách hóa đơn</Text>
                {
                    selected == "" 
                    ? <Text style={{ fontSize: 16, fontWeight: "700" }}>toàn bộ</Text>
                    :<Text style={{ fontSize: 16, fontWeight: "700" }}>{selected.day}/{selected.month}/{selected.year}</Text>
                }
                </View>
                {selected == "" ? <Text></Text> : <TouchableOpacity
                    onPress={() => dataChart()}
                >
                    <Ionicons name='bar-chart-outline' size={35} />
                </TouchableOpacity>}
            </View>

            {
                (showCaclendar == true)
                    ? <Calendar
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                            height: 100,
                            width: "100%",
                            top: 100
                        }}
                        onDayPress={day => {
                            setSelected(day);
                        }}
                        markedDates={{
                            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
                            [new Date()]: { selected: true, disableTouchEvent: true, selectedDotColor: 'green' }
                        }}
                    /> : null
            }

            <FlatList
                data={invoices}
                style={{ marginTop: 20 }}
                renderItem={({ item }) => {
                    return renderlist(item)
                }}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default ListInvoice
const styles = StyleSheet.create({
    V1: {
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        backgroundColor: '#EDF6D8',
        paddingLeft: 10,
        borderWidth: 1
    },
    V11: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    V12: {
        paddingTop: 40,
        paddingHorizontal: 10,
        backgroundColor: '#EDF6D8',
        height: '100%',
    },
    V13: {

        flexDirection: 'column',
        marginLeft: 40, marginTop: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    styButton: {
        height: 45, width: 100,
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }

})