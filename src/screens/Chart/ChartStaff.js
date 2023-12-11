import { View, Text, TouchableOpacity } from 'react-native'
import { LineChart, PieChart } from 'react-native-chart-kit';
import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
const ChartStaff = ({ navigation, route }) => {
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const newArray = Object.keys(route.params.billCountByEmployeeId).map((key) => {
        return {
            name: route.params.billCountByEmployeeId[key].name,
            population: route.params.billCountByEmployeeId[key].count,
            color: getRandomColor(),
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        };
    });
    return (
        <View style={{backgroundColor: '#EDF6D8',flex: 1}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 40, paddingBottom: 10, paddingHorizontal: 10 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomeAdmin')}
                >
                    <Ionicons name='arrow-back-sharp' size={35} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>Biểu đồ năng suất nhân viên theo tháng {route.params.month}</Text>
                    {/* <Text style={{ fontSize: 16, fontWeight: "700" }}>{route.params.selected.day}/{route.params.selected.month}/{route.params.selected.year}</Text> */}
                </View>
                <Text></Text>
            </View>

            <PieChart
                style={{ top: 10 }}
                data={newArray}
                width={Dimensions.get('window').width}
                height={220}
                chartConfig={{
                    backgroundColor: 'red',
                    backgroundGradientFrom: 'white',
                    backgroundGradientTo: 'white',
                    decimalPlaces: 0,
                    color: () => `rgba(0, 0, 0, 1)`,
                    labelColor: () => `rgba(0, 0, 0, 1)`,
                }}
                accessor={"population"}
                backgroundColor={"#EDF6D8"}
                paddingLeft={"-30"}
                center={[30,0]}
                absolute
            />
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 22, color: "black", fontWeight: '500' }}>Doanh thu</Text>
        <Text style={{ fontSize: 22, color: "#00BC1C", fontWeight: 'bold' }}>{formattedTotal} đ</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 22, color: "black", fontWeight: '500', alignItems: 'center' }}>Tổng số hóa đơn</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'red' }}>{route.params.numberOfElements}</Text>
      </View>
    </View> */}
        </View>
    )
}

export default ChartStaff