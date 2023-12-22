import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createAPI, getAPI } from '../../component/callAPI';
import { pickImage, takeImage } from '../../component/Cloudinary';
import { ConfirmDialog, ErrorDialog, SuccessDialog } from '../../component/CustomerAlert'
const CreateCategoryIngredient = ({ navigation }) => {
    useEffect(() => {
        fetchData();
    }, []);
    const [fCategoryIngredient, setFApiCategoryIngredient] = useState({
        name: "",
        image: ""
    })
    const [isVisibleConfirm, setIsVisibleConfirm] = useState(false)
    const [isVisibleErr, setIsVisibleErr] = useState(false)
    const [message, setMesage] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleConfirmAdjust, setIsVisibleConfirmAdjust] = useState(false)
    const handleAlret = () => {
        setIsVisibleConfirm(false)
        setIsVisibleConfirmAdjust(false)
        setIsVisible(false)
        setIsVisibleErr(false)
    }
    const [statusButton, setStatusButton] = useState(false)
    const [apiCategoryIngredient, setApiCategoryIngredient] = useState({});
    const [image, setImage] = useState(null);
    const [errormgs, setErrormgs] = useState(null)
    const [item, setItem] = useState(null)
    const createCategoryIngredient = () => {
        if (statusButton) {
            if (fCategoryIngredient.name === '') {
                setMesage('Thiếu thông tin')
                setIsVisibleErr(true)
                return;
            }
            else { setErrormgs(null); }
            const updates = {
                name: fCategoryIngredient.name,
                image: image
            };
            editAPI({ URLink: shareVarible.URLink + '/categoryIngredient/update/' + `${item._id}`, updates: updates })
                .then(data => {
                    setFApiCategoryIngredient({ ...fCategoryIngredient, name: "" })
                    setImage(null);
                    fetchData()
                    setIsVisible(true)
                })
                .catch(error => { console.error('Lỗi khi cập nhật nguyên liệu trong bếp :', error); });
            setStatusButton(false)
        }
        else {
            if (fCategoryIngredient.name === '') {
                setMesage('Thiếu thông tin')
                setIsVisibleErr(true)
                return;
            }
            if (fCategoryIngredient.image === '') {
                setMesage('Ảnh đang được tải lên')
                setIsVisibleErr(true)
                return;
            }
            createAPI({ URLink: shareVarible.URLink + '/categoryIngredient/create', fdata: fCategoryIngredient })
                .then(data => {
                    setFApiCategoryIngredient({ ...fCategoryIngredient, name: "", describe: "" })
                    setImage(null);
                    fetchData();
                    setIsVisible(true)
                }).catch(error => { console.error('Lỗi tạo nguyên liệu:', error); })
        }
    };
    const fetchData = () => {
        getAPI({ linkURL: shareVarible.URLink + '/categoryIngredient/' }).then(data => {
            setApiCategoryIngredient(data)
        }).catch(error => {
            console.log("Lỗi láy danh sách loại nguyên liệu: ", error)
        });
    };
    const handlePickImage = async () => {
        try {
            const imageUrl = await pickImage();
            setFdata({ ...fdata, image: imageUrl })
            setImage(imageUrl)
        } catch (error) {
            console.error('Lỗi tải ảnh: ', error);
        }
    };
    const handleTakeImage = async () => {
        try {
            const imageUrl = await takeImage();
            setFdata({ ...fdata, image: imageUrl })
            setImage(imageUrl)
        } catch (error) {
            console.error('Lỗi tải ảnh: ', error);
        }
    };
    const DeteleIngedient = () => {
        DeteleAPI({ URLink: shareVarible.URLink + '/categoryIngredient/delete/' + `${item._id}` }).then(data => {
            setIsVisible(true)
            fetchData();
        })
    }
    const EditIngedient = () => {
        setFApiCategoryIngredient({ ...fCategoryIngredient, name: item.name })
        setImage(item.image)
    }
    const renderlist = ((item) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '70%', flexDirection: 'row' }}>
                    <Image style={styles.styimageFlagist} source={{ uri: item.image }} />

                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>{item.name}</Text>
                        <Text>{item.describe}</Text>
                    </View>
                </View>
                <View style={styles.styView1}>
                    <TouchableOpacity onPress={() => {
                        setIsVisibleConfirmAdjust(true)
                        setItem(item)
                        setStatusButton(true)
                    }}>
                        <Ionicons name='pencil' size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setIsVisibleConfirm(true)
                        setItem(item)
                    }}>
                        <Ionicons name='remove-circle-sharp' size={35} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    })
    return (
        <View style={styles.v1}>
            <TouchableOpacity
                style={{ position: 'absolute', zIndex: 1, top: 30, left: 20 }}
                onPress={() => navigation.navigate('HomeChef')}>
                <Ionicons name='arrow-undo-circle-sharp' size={42} />
            </TouchableOpacity>
            <ConfirmDialog
                isVisible={isVisibleConfirm}
                message={"Xác nhận xóa"}
                onClose={handleAlret}
                funtionHandle={DeteleIngedient} />
            <ConfirmDialog
                isVisible={isVisibleConfirmAdjust}
                message={"Điều chỉnh"}
                onClose={handleAlret}
                funtionHandle={EditIngedient} />
            <SuccessDialog
                isVisible={isVisible}
                message={"Thành công"}
                onClose={handleAlret} />
            <ErrorDialog
                isVisible={isVisibleErr}
                message={message}
                onClose={handleAlret} />
            <View style={styles.V11}>
                <TextInput
                    onPressIn={() => setErrormgs(null)}
                    onChangeText={(text) => setFApiCategoryIngredient({ ...fCategoryIngredient, name: text })}
                    style={styles.inputname}
                    value={fCategoryIngredient.name}
                    placeholder="Loại nguyên liệu"
                />
                {
                    image == null ? <View style={[styles.uploadimge, { justifyContent: 'center', alignItems: 'center' }]}><Ionicons name="camera-outline" size={50} /></View> : image && <Image source={{ uri: image }} style={styles.uploadimge} />
                }
                <View style={styles.styView2}>
                    <Text style={styles.styTextImage}
                        onPress={handlePickImage}>Chụp ảnh</Text>
                    <Text style={styles.styTextImageLibary}
                        onPress={handleTakeImage}>Thư viện</Text>
                </View>
                <View style={{ marginTop: 40 }}>
                    <TouchableOpacity
                        onPress={createCategoryIngredient}
                        style={styles.styButtonCreate}>
                        <Ionicons name='md-checkmark-sharp' size={31} />
                    </TouchableOpacity>
                </View>
                {
                    errormgs ? <Text style={styles.styTextError}>
                        {errormgs}</Text> : null}
            </View>
            <View style={styles.V12}>
                <FlatList
                    data={apiCategoryIngredient}
                    renderItem={({ item }) => {
                        return renderlist(item)
                    }}
                    keyExtractor={item => item._id} />
            </View>
        </View>
    )
}

export default CreateCategoryIngredient
const styles = StyleSheet.create({
    v1: {
        height: '100%',
        width: '100%',
    },
    V11: {
        height: '50%',
        width: '100%',
        backgroundColor: '#EDF6D8'
    },
    V12: {
        height: '50%',
        width: '100%',
        backgroundColor: 'white',
    },
    inputname: {
        height: 40,
        width: 190,
        backgroundColor: 'white',
        marginTop: 110,
        marginLeft: 10,
        borderRadius: 10,
        paddingLeft: 10
    },
    inputdescrition: {
        height: 100,
        width: 190,
        marginTop: 20,
        backgroundColor: 'white',
        marginLeft: 10,
        borderRadius: 10,
        paddingLeft: 10,
        paddingBottom: 50
    },
    uploadimge: {
        position: 'absolute',
        height: 170,
        width: 170,
        borderRadius: 1000,
        marginTop: 40,
        marginLeft: 210,
        borderColor: 'black',
        borderWidth: 1
    },
    styimageFlagist: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 15
    },
    styView1: {
        paddingLeft: 50,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    styTextImage: {
        backgroundColor: 'black',
        color: 'white',
        height: 35,
        width: 90,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '900',
        paddingTop: 10
    },
    styTextImageLibary: {
        backgroundColor: 'black',
        color: 'white',
        height: 35,
        width: 90,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '900',
        paddingTop: 10
    },
    styTextError: {
        position: 'absolute',
        marginTop: 20,
        marginLeft: 150,
        color: 'red'
    },
    styView2: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        marginTop: 80,
        marginLeft: 90,
        paddingHorizontal: 80
    },
    styButtonCreate: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 30,
        width: 150,
        height: 55,
        marginLeft: 144,
        backgroundColor: '#6AF597',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -10
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