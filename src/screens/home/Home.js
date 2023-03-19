import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Animated } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import shareVarible from './../../AppContext'
//image
import pchome from '../../../assets/home.png'
import pcfood from '../../../assets/user.png'
import pcuser from '../../../assets/foods.png'
import pcsalenumber from '../../../assets/salenumber.png'
import pctablebar from '../../../assets/table_bar.png'
import pclogout from '../../../assets/logout.png'
import pcsetting from '../../../assets/setting.png'
//menu
import pcmenu from '../../../assets/menu.png'
import pcclose from '../../../assets/colse.png'

const Home = () => {
  const [curentTab, setcurentab] = useState("Home");
  const [showmenu, setshowmenu] = useState(false)
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;


  ///getData
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(shareVarible.URLink + '/category/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <SafeAreaView style={styles.boss}>
      <View style={{
        justifyContent: "flex-start",
        padding: 20,
      }}>
        <View style={{
          flexGrow: 1
        }}>
          {tabButton(curentTab, setcurentab, "Home", pchome)}
          {tabButton(curentTab, setcurentab, "Table", pctablebar)}
          {tabButton(curentTab, setcurentab, "Foods", pcuser)}
          {tabButton(curentTab, setcurentab, "Users", pcfood)}
          {tabButton(curentTab, setcurentab, "Sale number", pcsalenumber)}
          {tabButton(curentTab, setcurentab, "Setting", pcsetting)}
          {tabButton(curentTab, setcurentab, "Logout", pclogout)}
        </View>

      </View>


      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderRadius: showmenu ? 15 : 0,
          transform: [{
            scale: scaleValue
          },
          {
            translateX: offsetValue
          }]
        }}>
        {

        }
        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity
            onPress={() => {
              Animated.timing(scaleValue, {
                toValue: showmenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true
              }).start()

              Animated.timing(offsetValue, {
                toValue: showmenu ? 0 : 170,
                duration: 300,
                useNativeDriver: true
              }).start()

              Animated.timing(closeButtonOffset, {
                toValue: !showmenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true
              }).start()
              setshowmenu(!showmenu)
            }}


          >
            <Image
              style={{
                height: 40,
                width: 40,
                tintColor: 'black',
                marginTop: 20
              }}
              source={showmenu ? pcclose : pcmenu} />
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',

              }}
            >{curentTab}</Text>
            <View>
              {
                 data.map(item => (
                  // <Text key={item._id}>{item.name}</Text>
                  // <Image key={item._id} source= {item.image}/>
                  console.log(data)
                ))
              }
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  )
}

export default Home

const tabButton = (curentTab, setcurentab, title, image) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setcurentab(title)
      }}
    >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: curentTab == title ? 'white' : 'transparent',
        width: 150,
        height: 70,
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 40,
        marginTop: 15
      }}>
        <Image source={image}
          style={{
            width: 25,
            height: 25,
            marginLeft: 5
          }}
        />
        <Text
          style={{
            paddingLeft: 10,
            fontSize: 15,
            fontWeight: 'bold',
          }}
        >{title}</Text>
      </View>
    </TouchableOpacity>);

}

const styles = StyleSheet.create({
  boss: {
    flex: 1,
    backgroundColor: "#EDF6D8",
    alignItems: 'flex-start',
    justifyContent: 'flex-start'

  }
})