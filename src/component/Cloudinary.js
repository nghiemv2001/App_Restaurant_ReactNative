import * as ImagePicker from 'expo-image-picker';
 //upload image from drive to cloudinary 
 export const upLoadImageCloundinary = ({image}) => {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'restaurant');
    data.append('cloud_name', 'dmsgfvp0y');
    fetch('https://api.cloudinary.com/v1_1/dmsgfvp0y/upload', {
      method: 'POST',
      body: data
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Mạng không ổn định');
      }
      return res.json();
    })
    .then(uploadResponse => {
      resolve(uploadResponse);
    })
    .catch(err => {
      reject(err);
      console.log('Lỗi Upload Cloudinary', err);
    });
  });
  };
  
  //take image from libary
 export const pickImage = async () => {
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
      return result.assets[0].uri;
      setImage(result.assets[0].uri);
    }
    else {
        return "";
    }
  };