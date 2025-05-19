import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, Image, StyleSheet, ScrollView, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { storage } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function RegisterProperty() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');

  const navigation = useNavigation();
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        setImage(selectedAsset.uri);
      }
    } catch (error) {
      console.log('Error seleccionando imagen:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen.');
    }
  };
  

  const handleUpload = async () => {
    if (!image || !title || !description || !price || !city) {
      alert('Por favor llena todos los campos e incluye una imagen');
      return;
    }

    try {
      // Guardar copia local de la imagen
      const filename = image.split('/').pop();
      const localUri = `${FileSystem.documentDirectory}${filename}`;
      await FileSystem.copyAsync({ from: image, to: localUri });

      // Crear nuevo objeto de propiedad
      const newProperty = {
        id: Date.now().toString(),
        titulo: title,
        descripcion: description,
        precio: parseFloat(price),
        ciudad: city,
        imagenURI: localUri,
        fecha: new Date().toISOString(),
      };

      // Obtener las propiedades almacenadas anteriormente
      const storedData = await AsyncStorage.getItem('inmuebles');
      const existingProperties = storedData ? JSON.parse(storedData) : [];
   
      // Guardar el nuevo
      const updatedProperties = [...existingProperties, newProperty];
      await AsyncStorage.setItem('inmuebles', JSON.stringify(updatedProperties));

      alert('Inmueble registrado exitosamente');

      navigation.navigate("HomeTwo");

      // Limpiar formularios
      setImage(null);
      setTitle('');
      setDescription('');
      setPrice('');
      setCity('');
    } catch (error) {
      console.log('Error guardando propiedad:', error);
      alert('Hubo un error al guardar la propiedad');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput value={description} onChangeText={setDescription} style={styles.input} multiline />

      <Text style={styles.label}>Precio:</Text>
      <TextInput value={price} onChangeText={setPrice} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Ciudad:</Text>
      <TextInput value={city} onChangeText={setCity} style={styles.input} />

      <Button title="Seleccionar imagen" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Button title="Guardar propiedad" onPress={handleUpload} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'stretch',
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
});
