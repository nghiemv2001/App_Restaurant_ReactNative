import { View, Text, TouchableOpacity } from 'react-native'
import { LineChart, PieChart } from 'react-native-chart-kit';
import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
const ChartofInvoice = ({ navigation, route }) => {
  const invoices = route.params.invoices
  const invoiceMonth = route.params.data
  //thong ke theo ngay 
  const month = route.params.selected.month
 const billCountByEmployeeId = {}
 const billCountByEmployeeIdofMonth = {}

  invoiceMonth.forEach((bill) => {
    const employeeName = bill.nhan_vien;
    const employeeId = bill.id_nhan_vien;
    if (!billCountByEmployeeId[employeeId]) {
      billCountByEmployeeId[employeeId] = {
        name: employeeName,
        count: 1,
      };
    } else {
      billCountByEmployeeId[employeeId].count++;
    }
  }); 
   //thong ke theo thang
  const filteredInvoices = invoices.filter(invoice => {
    return invoice.month === route.params.selected.month && invoice.year === route.params.selected.year;
  });
  filteredInvoices.forEach((bill) => {
    const employeeName = bill.nhan_vien;
    const employeeId = bill.id_nhan_vien;
    if (!billCountByEmployeeIdofMonth[employeeId]) {
      billCountByEmployeeIdofMonth[employeeId] = {
        name: employeeName,
        count: 1,
      };
    } else {
      billCountByEmployeeIdofMonth[employeeId].count++;
    }
  });
  const hourRangesValues = Object.values(route.params.newHourRanges);
  const totalPriceByMonthArray = route.params.totalPriceByMonthArray;
  const sum = hourRangesValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const formattedTotal = formatNumberWithCommas(sum);
  const hourRangesKeys = Object.keys(route.params.newHourRanges);
  const dataPieChart = [
    {
      name: "Tháng 1",
      population: totalPriceByMonthArray[0].total,
      color: "rgba(91, 157, 218, 1)",
      legendFontColor: "#5B9DDA",
      legendFontSize: 15
    },
    {
      name: "Tháng 2",
      population: totalPriceByMonthArray[1].total,
      color: "rgba(244, 127, 48, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }, {
      name: "Tháng 3",
      population: totalPriceByMonthArray[2].total,
      color: "rgba(169,167,170,1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }, {
      name: "Tháng 4",
      population: totalPriceByMonthArray[3].total,
      color: "rgba(254,196,0,1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }, {
      name: "Tháng 5",
      population: totalPriceByMonthArray[4].total,
      color: "rgba(68,115,203, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }, {
      name: "Tháng 6",
      population: totalPriceByMonthArray[5].total,
      color: "rgba(115,176,73,1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }, {
      name: "Tháng 7",
      population: totalPriceByMonthArray[6].total,
      color: "rgba(26,115,232, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }, {
      name: "Tháng 8",
      population: totalPriceByMonthArray[7].total,
      color: "rgba(154,114,0, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }, {
      name: "Tháng 9",
      population: totalPriceByMonthArray[8].total,
      color: "rgba(38,95,145, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }, {
      name: "Tháng 10",
      population: totalPriceByMonthArray[9].total,
      color: "rgba(159,73,12, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }, {
      name: "Tháng 11",
      population: totalPriceByMonthArray[10].total,
      color: "rgba(102,100,100, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }, {
      name: "Tháng 12",
      population: totalPriceByMonthArray[11].total,
      color: "rgba(36,67,120, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  ];
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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 40, paddingBottom: 10, paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeAdmin')}
        >
          <Ionicons name='arrow-back-sharp' size={35} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>Biểu đồ thu nhập trong ngày</Text>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>{route.params.selected.day}/{route.params.selected.month}/{route.params.selected.year}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChartStaff', { billCountByEmployeeId, billCountByEmployeeIdofMonth, month})}
        >
          <Ionicons name='bar-chart-outline' size={35} color={"#EF8F1C"} />
        </TouchableOpacity>
      </View>
      <LineChart
        data={data}
        width={Dimensions.get('window').width}
        height={400}
        yAxisSuffix=" đ"
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: '#EDF6D8',
          backgroundGradientTo: '#EDF6D8',
          decimalPlaces: 0,
          color: () => `rgba(134, 65, 244, 1)`,
          labelColor: () => `rgba(134, 65, 244, 1)`,
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
      />
      <PieChart
        style={{ top: -30 }}
        data={dataPieChart}
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
        paddingLeft={"-40"}
        center={[40, 0]}
        absolute
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 22, color: "black", fontWeight: '500' }}>Doanh thu</Text>
          <Text style={{ fontSize: 22, color: "#00BC1C", fontWeight: 'bold' }}>{formattedTotal} đ</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 22, color: "black", fontWeight: '500', alignItems: 'center' }}>Tổng số hóa đơn</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'red' }}>{route.params.numberOfElements}</Text>
        </View>
      </View>
    </View>
  )
}

export default ChartofInvoice