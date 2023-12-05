import { View, Text, TouchableOpacity } from 'react-native'
import { LineChart } from 'react-native-chart-kit';
import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons'
import shareVarible from '../../AppContext'
const ChartofInvoice = ({ navigation, route }) => {
  const hourRangesValues = Object.values(route.params.newHourRanges);
  const sum = hourRangesValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const formattedTotal = formatNumberWithCommas(sum);
  const hourRangesKeys = Object.keys(route.params.newHourRanges);
  const data = {
    labels: hourRangesKeys,
    datasets: [
      {
        data: hourRangesValues,
        color: (opacity = 1) => `rgba(0, 0, 0, 1)`,
        strokeWidth: 1
      }
    ],
  };
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ marginLeft: 10, marginTop: 30 }}
          onPress={() => navigation.navigate('HomeAdmin')}
        >
          <Ionicons name='arrow-back-sharp' size={35} />
        </TouchableOpacity>
        <View style={{ marginLeft: 60, alignItems: 'center', marginTop: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>Biểu đồ thu nhập trong ngày</Text>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>{route.params.selected.day}/{route.params.selected.month}/{route.params.selected.year}</Text>
        </View>
      </View>
      <LineChart
        data={data}
        width={Dimensions.get('window').width}
        height={500}
        yAxisSuffix="$"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 0,
          color: () => `rgba(0, 0, 0, 1)`,
          labelColor: () => `rgba(0, 0, 0, 1)`,
          style: {
            borderRadius: 1,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40}}>
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize: 22, color:"#989898", fontWeight: '500'}}>Doanh thu</Text>
          <Text style={{fontSize: 22, color:"#9CE6A9", fontWeight: 'bold'}}>{formattedTotal} đ</Text>
        </View>
        <View style={{alignItems:'center'}}>
        <Text style={{fontSize: 22, color:"#989898", fontWeight: '500', alignItems:'center'}}>Tổng số hóa đơn</Text>
          <Text style={{fontSize: 22, fontWeight : 'bold', color:'#F5504F'}}>{route.params.numberOfElements}</Text>
        </View>
      </View>
    </View>
  )
}

export default ChartofInvoice