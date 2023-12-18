import * as ImagePicker from 'expo-image-picker';

export const upLoadImageCloundinary = ({ image }) => {
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

export const pickImage = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      let newfile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split('.')[1]}`,
        name: `test.${result.assets[0].uri.split('.')[1]}`,
      };
      const uploadedImageUrl = await upLoadImageCloundinary({ image: newfile });
      return uploadedImageUrl.url;
    } else {
      console.log('Bỏ chọn ảnh:');
      return '';
    }
  } catch (error) {
    console.error('Lỗi chọn hình ảnh:', error);
    throw error;
  }
};

export const takeImage = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    let newfile = {
      uri: result.assets[0].uri,
      type: `test/${result.assets[0].uri.split('.')[1]}`,
      name: `test.${result.assets[0].uri.split('.')[1]}`,
    };
    const uploadedImageUrl = await upLoadImageCloundinary({ image: newfile });
    return uploadedImageUrl.url;
  } else {
    console.log('Bỏ chọn ảnh:');
    return '';
  }
};