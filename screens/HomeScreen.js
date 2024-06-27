import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal } from 'react-native';
import TesseractOcr, { LANG_ENGLISH } from 'react-native-tesseract-ocr';
import CameraComponent from '../components/CameraComponent';

export default function HomeScreen({ navigation }) {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  const handlePictureTaken = async (uri) => {
    console.log('Picture taken with URI:', uri);
    setCameraVisible(false);
    try {
      const text = await TesseractOcr.recognize(uri, LANG_ENGLISH);
      console.log('Recognized text:', text);
      setTextInputValue(text);
    } catch (error) {
      console.error('Error recognizing text:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={cameraVisible} animationType="slide">
        <CameraComponent onPictureTaken={handlePictureTaken} />
      </Modal>
      <View style={styles.upperContainer}>
        <Text style={styles.headerText}>Cosmetic Check</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Please enter the ingredients to be checked."
          multiline={true}
          numberOfLines={4}
          value={textInputValue}
          onChangeText={setTextInputValue}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Scan" onPress={() => {
            console.log('Scan button pressed');
            setCameraVisible(true);
          }} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Submit"
            onPress={() => navigation.navigate('Result', { text: textInputValue })}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  upperContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f6fe5',
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    paddingBottom: 10,
  },
  inputContainer: {
    flex: 5,
    paddingHorizontal: '5%',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#333333',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
});
