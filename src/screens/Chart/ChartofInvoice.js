import { View, Text, TouchableOpacity } from 'react-native'
import { LineChart } from 'react-native-chart-kit';
import React from 'react'
import { Dimensions } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';

const ChartofInvoice = ({ navigation, route }) => {
  const [dataChart, setDataChart] = useState(
    route.params)
  const totalArray = dataChart.datalistinvoice.map((item) => item.total);
  const dayArray = dataChart.datalistinvoice.map((item) => (item.day));
  const dayMonthArray = dataChart.datalistinvoice.map((item) => ({ day: item.day, month: item.month }));
  const NewArryMonth = dayMonthArray.map(({ day, month }) => `${day}/${month+1}`);
  console.log(NewArryMonth)
  const data = {
    labels: dayArray,
    datasets: [
      {
        data: totalArray,
      },
    ],
  };

  let total = 0;
  for (let i = 0; i < dataChart.datalistinvoice.length; i++) {
    total += dataChart.datalistinvoice[i].total;
  }

  console.log(dataChart.datalistinvoice.length)
  return (
    <View>
      <TouchableOpacity
        style={{ marginLeft: 10, marginTop: 10 }}
        onPress={() => navigation.navigate('HomeAdmin')}
      >
        <Ionicons name='arrow-back-sharp' size={35} />
      </TouchableOpacity>
      <LineChart
        data={data}
        width={Dimensions.get('window').width}
        height={500}
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
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

      <View style={{
        height: '24%',
        width: "100%",
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        marginHorizontal: 5,
        alignItems: 'center',
        borderWidth: 2
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -30 }}>
          <Ionicons name='newspaper' size={45} style={{ paddingLeft: 50, marginTop: 10 }} />

          <Text style={{ fontSize: 30 }}>{dataChart.datalistinvoice.length}</Text>

        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -30 , marginLeft : -5}}>
          <Ionicons name='logo-bitcoin' size={45} style={{ paddingLeft: 50, marginTop: 10 }} />
          <Text style={{ fontSize: 25, marginTop : -15 }}>{total}$</Text>
        </View>

      </View>
    </View>
  )
}

export default ChartofInvoice