import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SettingsScreen() {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [database, setDatabase] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('dbSettings');
      if (settings) {
        const parsed = JSON.parse(settings);
        setHost(parsed.host);
        setPort(parsed.port.toString());
        setDatabase(parsed.database);
        setUsername(parsed.username);
        setPassword(parsed.password);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as configurações');
    }
  };

  const saveSettings = async () => {
    try {
      const settings = {
        host,
        port: parseInt(port),
        database,
        username,
        password
      };
      await AsyncStorage.setItem('dbSettings', JSON.stringify(settings));
      Alert.alert('Sucesso', 'Configurações salvas com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as configurações');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações do Banco de Dados</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Host</Text>
        <TextInput
          style={styles.input}
          value={host}
          onChangeText={setHost}
          placeholder="Ex: 192.168.1.100"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Porta</Text>
        <TextInput
          style={styles.input}
          value={port}
          onChangeText={setPort}
          keyboardType="numeric"
          placeholder="Ex: 5432"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Banco de Dados</Text>
        <TextInput
          style={styles.input}
          value={database}
          onChangeText={setDatabase}
          placeholder="Nome do banco de dados"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Usuário do banco"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Senha do banco"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={saveSettings}>
        <Text style={styles.buttonText}>Salvar Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});