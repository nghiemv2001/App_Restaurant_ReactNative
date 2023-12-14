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
    function getRandomColorMonth() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 12)];
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
    const newArrayMonth = Object.keys(route.params.billCountByEmployeeIdofMonth).map((key) => {
        return {
            name: route.params.billCountByEmployeeIdofMonth[key].name,
            population: route.params.billCountByEmployeeIdofMonth[key].count,
            color: getRandomColorMonth(),
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        };
    });
    return (
        <View style={{backgroundColor: '#EDF6D8',flex: 1, justifyContent:'space-evenly'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10,paddingTop: 40, paddingHorizontal: 10 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomeAdmin')}
                >
                    <Ionicons name='arrow-back-sharp' size={35} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>Biểu đồ năng suất nhân viên</Text>
                </View>
                <Text></Text>
            </View>

            <PieChart
                style={{ top: 10 }}
                data={newArray}
                width={Dimensions.get('window').width}
                height={240}
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
           <Text style={{ fontSize: 26, fontWeight: "700" , textAlign:'center', paddingBottom: 70}}>Biểu đồ theo ngày</Text>
        
        
           <PieChart
                style={{ top: 10 }}
                data={newArrayMonth}
                width={Dimensions.get('window').width}
                height={240}
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
           <Text style={{ fontSize: 26, fontWeight: "700" , textAlign:'center', paddingBottom: 30}}>Biểu đồ theo tháng</Text>
        </View>
    )
}

export default ChartStaff