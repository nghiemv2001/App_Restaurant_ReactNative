import { View, Text,Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import shareVarible from './AppContext'
const TestScreen = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(shareVarible.URLink + '/category/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
    }, []);


    const [imageData, setImageData] = useState(null);
    const getBase64ImageData = () => {
      console.log(data._id)
      if (data.image) {
        const buffer = Buffer.Buffer.from(imageData, 'binary');
        return `data:image/jpeg;base64,${buffer.toString('base64')}`;
      }
      return null;
    };
    return (
      <View>
        <Text>Hello</Text>
      <Image source ={{ uri: getBase64ImageData() }} style={{ width: 200, height: 200 }} />
    </View>
    );
};

export default TestScreen