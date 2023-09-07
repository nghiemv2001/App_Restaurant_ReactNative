import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

const QuantityDialog = ({ isVisible, onClose, onQuantityChange }) => {
  const [quantity, setQuantity] = useState('1'); // Số lượng mặc định là 1

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleSave = () => {
    onQuantityChange(quantity);
    onClose();
  };

  return (
    <Modal isVisible={isVisible}>
      <View>
        <Text>Chỉnh sửa số lượng</Text>
        <TextInput
          keyboardType="numeric"
          value={quantity.toString()}
          onChangeText={handleQuantityChange}
        />
        <Button title="Lưu" onPress={handleSave} />
        <Button title="Hủy" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default QuantityDialog;