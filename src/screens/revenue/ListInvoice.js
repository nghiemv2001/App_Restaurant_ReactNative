import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useSelector, useDispatch } from 'react-redux';
const ListInvoice = ({ navigation }) => {
    const [selected, setSelected] = useState("");
    const totalPriceByMonthArray = Array.from({ length: 12 }, () => ({ total: 0 }));
    const [showCaclendar, setShowCaclendar] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [itemBill, setItemBill] = useState(null)
    const invoices = useSelector(state => state.invoiceReducer.invoices)
    const dispatch = useDispatch();
    useFocusEffect(
        React.useCallback(() => {
            dispatch({ type: "GET_INVOICES" });
        }, [])
    );
    //Delete Invoice
    const DeteleInvoice = () => {
        fetch(shareVarible.URLink + '/invoice/delete/' + `${itemBill}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => { dispatch({ type: "GET_INVOICES" }); })
            .catch(error => { console.error('Error', error); })
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
        invoices.forEach(item => {
            const monthIndex = item.month - 1;
            totalPriceByMonthArray[monthIndex].total += item.total;
        });
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
                navigation.navigate("ChartofInvoice", { selected, newHourRanges, numberOfElements, totalPriceByMonthArray, data, invoices })
            })
            .catch(error => console.log(error));
    }

    //Design FatList
    const renderlist = ((item) => {
        const currentHour = item.hour;
        const hour12Format = currentHour >= 12 ? 'PM' : 'AM';
        const hourIn12HourFormat = currentHour % 12 || 12;
        const formattedHour = `${hourIn12HourFormat.toString().padStart(2, '0')}${hour12Format}`;
        if (selected == "") {
            return (
                <View>
                    <TouchableOpacity style={styles.V1} onPress={() => navigation.navigate('ListProductInInvoice', { item })}>
                        <View style={styles.V11}>
                            <Text style={{ fontSize: 18 }}>
                                Ngày lập: {item.day.toString().padStart(2, '0')}/{item.month.toString().padStart(2, '0')}/{item.year} ({formattedHour}:{item.minute.toString().padStart(2, '0')})
                            </Text>
                            <Text style={{ fontSize: 18 }}>Tên bàn: {item.name}</Text>
                            <Text style={{ fontSize: 18 }}>Tổng tiền: {item.total}$</Text>
                            <Text style={{ fontSize: 18 }}>Nhân viên: {item.nhan_vien}</Text>
                        </View>
                        <View style={styles.V13}>
                            <TouchableOpacity onPress={() => {
                                setItemBill(item._id)
                                setShowConfirmDelete(true)
                            }}>
                                <Ionicons name='remove-circle-sharp' size={35} color={"#940000"} />
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
                                    ngày lập: {item.day.toString().padStart(2, '0')}/{item.month.toString().padStart(2, '0')}/{item.year} ({formattedHour}:{item.minute.toString().padStart(2, '0')})
                                </Text>
                                <Text style={{ fontSize: 18 }}>Tên Bàn: {item.name}</Text>
                                <Text style={{ fontSize: 18 }}>Tổng tiền: {item.total}$</Text>
                                <Text style={{ fontSize: 18 }}>Nhân viên: {item.nhan_vien}</Text>
                            </View>
                            <View style={styles.V13}>
                                <TouchableOpacity onPress={() => {
                                    setItemBill(item._id)
                                    setShowConfirmDelete(true)
                                }}>
                                    <Ionicons name='remove-circle-sharp' size={35} color={"#940000"} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return null;
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
                        height: 300,
                        width: 300,
                        backgroundColor: "white",
                        borderRadius: 40,
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}>

                        <View style={{ height: 90, width: 90, backgroundColor: '#F6D3B3', borderRadius: 70, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='alert' size={60} color={"#FFFCFF"} />
                        </View>
                        <Text style={{ fontSize: 22, fontWeight: "700", color: 'black' }}>
                            XÓA HÓA ĐƠN
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowConfirmDelete(false)
                                DeteleInvoice()
                            }}
                            style={{ height: 40, width: 140, backgroundColor: '#3085D6', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                            <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Chấp nhận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setShowConfirmDelete(false) }}
                            style={{ height: 40, width: 140, backgroundColor: '#D03737', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                            <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingHorizontal: 15 }}>
                <TouchableOpacity
                    onPress={() => { setShowCaclendar(!showCaclendar) }}
                >
                    <Ionicons name='calendar-outline' size={35} color={'#172969'} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={{ fontSize: 19, fontWeight: "700" }}>Danh sách hóa đơn</Text>
                    {
                        selected == ""
                            ? <Text style={{ fontSize: 16, fontWeight: "700" }}>toàn bộ</Text>
                            : <Text style={{ fontSize: 16, fontWeight: "700" }}>{selected.day}/{selected.month}/{selected.year}</Text>
                    }
                </View>
                {selected == "" ? <Text></Text> : <TouchableOpacity
                    onPress={() => dataChart()}
                >
                    <Ionicons name='bar-chart-outline' size={35} color={"#EF8F1C"} />
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
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        backgroundColor: '#EDF6D8',
        paddingLeft: 10,
        borderWidth: 2
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