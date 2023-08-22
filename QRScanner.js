import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { TouchableOpacity } from 'react-native';





export default function QRScanner() {
 

    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);

    const toggleFlashMode = () => {
      if (flashMode === Camera.Constants.FlashMode.off) {
        setFlashMode(Camera.Constants.FlashMode.torch);
      } else {
        setFlashMode(Camera.Constants.FlashMode.off);
      }
    };
    



  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`QR code has been scanned!\n\nType: ${type}\nData: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    
     <View style={styles.container}>
      <Camera flashMode={flashMode}
        style={styles.camera}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      ><TouchableOpacity
      style={styles.flashButton}
      onPress={toggleFlashMode}
    >
      <Text>{flashMode === Camera.Constants.FlashMode.off ? "Torch Off" : "Torch On"}</Text>
    </TouchableOpacity>
    




        {scanned && <Button title={'Scan again'} onPress={() => setScanned(false)} />}
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  flashButtonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    margin: 10,
  },
  flashButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 5,
  },
});
