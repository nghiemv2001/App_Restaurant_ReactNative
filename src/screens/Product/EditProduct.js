import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import Reac, { useState, useEffect } from 'react'
import mainpicture from '../../../assets/mainpicture.png'
import { AutoComplete } from 'react-native-element-textinput';
import iconImage from '../../../assets/iconimage2.png'
import iconCamera from '../../../assets/iccamera.png'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import uploadimge from '../../../assets/2.png'
import shareVarible from './../../AppContext'
import * as ImagePicker from 'expo-image-picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const EditProduct = ({ navigation, route }) => {
    const [isFocus, setIsFocus] = useState(false);
    const [isFocus1, setIsFocus2] = useState(false);
    const [valuename, setValueName] = useState([]);
    const [valueprice, setValuePrice] = useState([]);
    const [value, setValue] = useState(null);
    const [data, setData] = useState(null)
    const [dataapi, SetDataApi] = useState([]);
    const [image, setImage] = useState(null);
    const [errormgs, setErrormgs] = useState(null)
    const [setRadio, SetRadio] = useState(null)
    //get data from route
    const getDetails = (type) => {
        if (route.params.item) {
            switch (type) {
                case "id":
                    return route.params.item._id
                case "name":
                    return route.params.item.name
                case "status":
                    return route.params.item.status
                case "category":
                    return route.params.item.category
                case "price":
                    return route.params.item.price
                case "image":
                    return route.params.item.image
            }
        }
        return ""
    }
    //set fdata
    const [fdata, setFdata] = useState({
        id: getDetails("id"),
        name: getDetails("name"),
        status: getDetails("status"),
        category: getDetails("category"),
        price: getDetails("price"),
        image: getDetails("image"),
    })
    // take list category 
    const fetchData = () => {
        fetch(shareVarible.URLink + '/category/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => SetDataApi(data),
            )
            .catch(error => console.log(error));
    };
    useEffect(() => {
        fetchData();
    }, []);
    //
    //radio data
    var radio_props = [
        { label: 'available', value: 1 },
        { label: 'inavailable', value: 0 }
    ];
    //upload image from drive to cloudinary 
  const handleUpload = (image) => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'restaurant')
    data.append("cloud_name", "dmsgfvp0y")
    fetch("https://api.cloudinary.com/v1_1/dmsgfvp0y/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        setImage(data.secure_url)
        setFdata({ ...fdata, image: data.secure_url })
      }).catch(err => {
        Alert.alert("An Error Occured While Uploading")
        console.log(err)
      })
  }
    //take image from camera
    const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            let newfile = {
                uri: result.assets[0].uri,
                type: `test/${result.assets[0].uri.split(".")[1]}`,
                name: `test.${result.assets[0].uri.split(".")[1]}`
            }
            handleUpload(newfile)
            setImage(result.assets[0].uri);
        }
        else {
            setImage(null);
        }
    };

    //take image from libary
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            let newfile = {
                uri: result.assets[0].uri,
                type: `test/${result.assets[0].uri.split(".")[1]}`,
                name: `test.${result.assets[0].uri.split(".")[1]}`
            }
            handleUpload(newfile)
            setImage(result.assets[0].uri);
        }
        else {
            setImage(null);
        }
    };
    //sentobackend
    const SendtoBackend=async()=>{
        if(fdata.category ==''){
            setErrormgs("Warning ! Category not null?")
            return;
          }
          if (fdata.name == '' || fdata.price == '') {
            setErrormgs('All filed are required!!!!');
            return;
          }
          if (fdata.image == '') {
            setErrormgs('Image not foud!!!')
            return;
          }
           const updates =  {
            name : fdata.name,
            price : fdata.price,
            status : fdata.status,
            image : fdata.image,
            category : fdata.category
          };
          const response = await fetch(shareVarible.URLink + '/product/update/'+`${fdata.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
          }).then(res => res.json()).then(
            data => {
              if (data.error) {
                setErrormgs(data.error);
                alert(data.error);
              }
              else {
                alert('Edit Food successfully');
                fetchData()
                navigation.navigate('HomeAdmin');
              }
            }
          )
    }
    return (
        <View style={styles.viewmain}>
            <Image
                style={styles.stylemainpicture}
                source={mainpicture}
            />
            <View style={{ flexDirection: 'row', marginTop: 150, marginLeft: 20 }}>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataapi}
                    search
                    value={fdata.category}
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
            <View style={{ marginTop: 30, alignItems: 'center' }}>
                <TextInput
                      value={`${fdata.name}`}
                    style={styles.TIPpeoples}
                    //   keyboardType='number-pad'
                    onPressIn={() => setErrormgs(null)}
                    onChangeText={(text) => setFdata({ ...fdata, name: text })}
                    placeholder='Enter name food'>
                </TextInput>
                <TextInput
                     value={`${fdata.price}`}  
                    style={styles.TIPpeoples}
                    
                    keyboardType='number-pad'
                    onPressIn={() => setErrormgs(null)}
                    onChangeText={(text) => setFdata({ ...fdata, price: text })}
                    placeholder='Enter price food'>
                </TextInput>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: fdata.image }} style={styles.uploadimge} />
                {/* {image && <Image source={{ uri: image }} style={styles.uploadimge} />} */}
                <RadioForm
                    style={{ marginLeft: 290, marginTop: 70 }}
                    radio_props={radio_props}
                    onPress={(value) => {
                        setFdata({ ...fdata, status: value })
                    }}
                />
            </View>
            <View style={{ flexDirection: 'row', marginTop : 0, justifyContent : 'space-evenly', marginLeft : -100, paddingHorizontal : 50 }}>
                <TouchableOpacity onPress={takeImage}>
                    <Image source={iconCamera} style={styles.iconimage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={iconImage} style={styles.iconimage} />
                </TouchableOpacity>

            </View>
            <TouchableOpacity 
            onPress={SendtoBackend}
            >
          <View
            style={{
              flexDirection: 'row',
              marginTop: 90,
              borderWidth: 1,
              borderRadius: 30,
              width: 150,
              backgroundColor: '#fff',
              height: 55,
              marginLeft: 144,
              backgroundColor: '#6AF597',
              justifyContent: 'center',
              alignItems: 'center',
              position : 'absolute'
            }}
          >
            <Ionicons name='md-checkmark-sharp' size={31}
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
    stylemainpicture: {
        position: 'absolute',
        resizeMode: 'stretch',
        height: 450,
        width: 280,
        marginTop: -180,
        marginLeft: 60
    },
    container: {
        padding: 16,
        marginTop: 40,
        width: '90%',
        marginLeft: 10
    },
    containerprice: {
        padding: 16,
        marginTop: -20,
        width: '90%',
        marginLeft: 10
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
        height: 170,
        width: 220,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 45,
        backgroundColor: 'white',
        marginTop: 20
    },
    iconimage: {
        height: 40,
        width: 40,
        borderWidth: 1,
        borderColor: 'black',
        zIndex: 1,
        borderRadius: 30
    },
    dropdown: {
        height: 40,
        width: 180,
        backgroundColor: 'white',
        borderRadius: 50,
        marginLeft: 150
    },
    TIPpeoples: {
        height: 40,
        width: 250,
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: -10,
        marginBottom: 20,
        paddingLeft: 5,
        borderWidth: 1,
    },
})