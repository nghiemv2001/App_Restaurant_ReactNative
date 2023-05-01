import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import Reac, { useState, useEffect } from 'react'
import mainpicture from '../../../assets/mainpicture.png'
import { AutoComplete } from 'react-native-element-textinput';
import iconImage from '../../../assets/iconimage2.png'
import iconCamera from '../../../assets/iccamera.png'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'

const EditProduct = ({ navigation , route}) => {
    const [valuename, setValueName] = useState([]);
    const [valueprice, setValuePrice] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);
    const [dataapi, SetDataApi] = useState([]);
    const [image, setImage] = useState(null);
    const [errormgs, setErrormgs] = useState(null)
    // read data object table form screen listable
    
    console.log(route.params.data)
    const getDetails =(type)=>{
        if(route.params.data.items){
          switch(type){
            case "id":
              return route.params.data.item._id
            case "name":
              return route.params.data.item.name
            case "peoples":
              return route.params.data.item.price
          }
        }
        return ""
      }
    //   const [fdata, setFdata] = useState({
    //     id : getDetails("id"),
    //     name : getDetails("name"),
    //     peoples :getDetails("price"),
    //   })

    //set dropdown
    const dropdown = [
        { label: 'Còn trống', value: '0' },
        { label: 'Đã đặt', value: '1' },
    ];

    return (
        <View style={styles.viewmain}>
            <Image
                style={{
                    position: 'absolute',
                    resizeMode: 'stretch',
                    height: 450,
                    width: 280,
                    marginTop: -180,
                    marginLeft: 60
                }}
                source={mainpicture}
            />

            <View style={styles.containerdropdown}>
                {/* {renderLabel()} */}
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataapi}
                    search
                    maxHeight={300}
                    labelField="name"
                    valueField="name"
                    placeholder={!isFocus ? 'Select category' : '...'}
                    searchPlaceholder="Search..."
                    // value={fdata.status}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.name);

                        setFdata({ ...fdata, category: item._id })
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={{
                                marginRight: 10
                            }}
                            color={isFocus ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )} />
            </View>
            <View style={styles.container}>
                <AutoComplete
                    value={valuename}
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    label="Name"
                    placeholder="name of food..."
                    placeholderTextColor="gray"
                    onChangeText={e => {
                        setValueName(e);
                        setFdata({ ...fdata, name: e })
                    }}
                />
            </View>
            <View style={styles.containerprice}>
                <AutoComplete
                    value={valueprice}
                    keyboardType='number-pad'
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    label="Price"
                    placeholder="price of food..."
                    placeholderTextColor="gray"
                    onChangeText={e => {
                        setValuePrice(e);
                        setFdata({ ...fdata, price: e })
                    }}
                />
            </View>
            <Image source={{ uri: image }} style={styles.uploadimge} />
            {/* {image && <Image source={{ uri: image }} style={styles.uploadimge} />} */}
            <View style={{
                height: "8%",
                width: '100%',
                marginTop: 135,
                justifyContent: 'space-evenly',
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft : -20
            }}>
                <TouchableOpacity
                //   onPress={takeImage}
                >
                </TouchableOpacity>
                <TouchableOpacity
                //   onPress={pickImage}
                >
                    <Image source={iconImage} style={styles.iconimage} />
                </TouchableOpacity>
            </View>
            {
                errormgs ? <Text style={{
                    position: 'absolute',
                    marginTop: 575,
                    marginLeft: 130,
                    color: 'red'
                }}>
                    {errormgs}</Text> : null
            }

            <TouchableOpacity >
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 90,
                        borderWidth: 3,
                        borderRadius: 30,
                        width: '55%',
                        backgroundColor: '#fff',
                        height: 55,
                        marginLeft: 94,
                        backgroundColor: '#6AF597',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position : 'absolute'
                    }}
                >
                    <Ionicons name='md-checkmark-sharp' size={31}
                        // onPress={SendtoBackend} 
                        />
                </View>

            </TouchableOpacity>
        </View>
    )
}

export default EditProduct
const styles = StyleSheet.create({
    viewmain: {
        flex: 1,
        backgroundColor: "#EDF6D8",
    },
    container: {
        padding: 16,
        marginTop: 0
    },
    containerprice: {
        padding: 16,
        marginTop: -20
    },
    input: {
        height: 55,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    inputStyle: { fontSize: 16 },
    labelStyle: { fontSize: 14 },
    placeholderStyle: { fontSize: 16 },
    textErrorStyle: { fontSize: 16 },
    uploadimge: {
        position: 'absolute',
        height: 200,
        width: 220,
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 95,
        backgroundColor: 'white',
        marginTop: 350
    },
    iconimage: {
        height: 40,
        width: 40,
        borderWidth: 1,
        borderColor: 'black',
        zIndex: 1,
        borderRadius: 30
    },
    containerdropdown: {
        marginTop: 160,
        height: 40,
        width: "70%",
        backgroundColor: 'white',
        borderRadius: 50,
        marginLeft: 105,
        paddingLeft: 10
    },
})