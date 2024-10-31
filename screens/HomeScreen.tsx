import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDatabase } from '../context/DatabaseContext';

export function HomeScreen({ navigation }) {
  const [barcode, setBarcode] = useState('');
  const [scanning, setScanning] = useState(false);
  const { searchProduct } = useDatabase();

  const handleSearch = async () => {
    const product = await searchProduct(barcode);
    if (product) {
      navigation.navigate('Product', { product });
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    setBarcode(data);
    setScanning(false);
    handleSearch();
  };

  return (
    <View style={styles.container}>
      {scanning ? (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={barcode}
            onChangeText={setBarcode}
            placeholder="Digite o código de barras"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.scanButton]} 
            onPress={() => setScanning(true)}
          >
            <Text style={styles.buttonText}>Escanear Código</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  scanButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});