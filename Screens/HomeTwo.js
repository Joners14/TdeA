import React, { useState, useEffect } from "react";
import { 
    View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const HomeTwo = () => {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);
    const [properties, setProperties] = useState([]); // Estado para almacenar propiedades

    const handleLogout = () => {
        // Lógica para cerrar sesión (agregar la función de logout de Firebase si es necesario)
        navigation.navigate("Home");
    };
    const handleReturn = () =>{
        navigation.navigate("MyPublic");
    };
    const handleStatitic = () =>{
        navigation.navigate("Statictics");

    };

    const handleSchedule =() =>{
        navigation.navigate("Appointments");
    };

    useFocusEffect(
        React.useCallback(() => {
            const loadProperties = async () => {
                try {
                    const storedData = await AsyncStorage.getItem('inmuebles');
                    if (storedData) {
                        setProperties(JSON.parse(storedData));
                    }
                } catch (error) {
                    console.log('Error cargando propiedades:', error);
                    Alert.alert('Error', 'No se pudieron cargar las propiedades.');
                }
            };
    
            loadProperties();
        }, [])
    );
     // Se ejecuta solo cuando el componente se monta

    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                <Text style={styles.title}>Bienvenido Inmobiliaria Centenario</Text>
                <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                    <MaterialIcons name="settings" size={28} color="white" />
                </TouchableOpacity>
            </View>

            {/* Menú desplegable */}
            {menuVisible && (
                <View style={styles.menu}>
                    <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
                        <MaterialIcons name="logout" size={24} color="#333" />
                        <Text style={styles.menuText}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleReturn} style={styles.menuItem}>
                        <MaterialIcons name="business" size={24} color="#333" />
                        <Text>Mis propiedades</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleStatitic} style={styles.menuItem}>
                        <MaterialIcons name="insert-chart" size={24} color="#333" />
                        <Text>Mis Estadisticas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSchedule} style={styles.menuItem}>
                        <MaterialIcons name="Schedule" size={24} color="#333"/>
                        <Text>Agenda</Text>
                    </TouchableOpacity>
                </View>
                
            )}

            {/* Botón para publicar propiedad */}
            <View>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate("RegisterProperty")}
                >
                    <Text style={styles.addButtonText}>+ Publicar Propiedad</Text>
                </TouchableOpacity>
            </View>

            {/* Lista de propiedades */}
            <ScrollView contentContainerStyle={styles.propertyGrid}>
                {properties.length > 0 ? (
                    properties.map((item) => (
                        <View key={item.id} style={styles.card}>
                            {/* Mostrar la imagen de la propiedad */}
                            {item.imagenURI ? (
                                <Image source={{ uri: item.imagenURI }} style={styles.image} />
                            ) : (
                                <Image source={require("../Constant/DataBase/Apartamento1.jpg")} style={styles.image} />
                            )}
                            <View style={styles.info}>
                                <Text style={styles.propertyName}>{item.titulo}</Text>
                                <Text style={styles.propertyPrice}>${item.precio.toLocaleString()} COP</Text>
                                <Text style={styles.propertyLocation}>{item.ciudad}</Text>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Ver Detalles</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: "#6200ee", padding: 10, borderRadius: 5, marginTop: 15 }}
                                    onPress={() => navigation.navigate("Schedule", { property: item })} // envía los datos del inmueble
                                >
                                    <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Agendar</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>No hay propiedades registradas</Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 35, // Espacio para que el encabezado no esté pegado arriba
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#6200ee",
        paddingVertical: 15,
        paddingHorizontal: 20,
        elevation: 5, // Sombra en Android
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
    },
    menu: {
        position: "absolute",
        top: 75, // Se coloca debajo del header
        right: 20,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        zIndex: 10, // Asegura que esté sobre las imágenes
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    menuText: {
        fontSize: 16,
        marginLeft: 10,
        color: "#333",
    },
    propertyGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    card: {
        width: "45%",
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 15,
        overflow: "hidden",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    image: {
        width: "100%",
        height: 120,
    },
    info: {
        padding: 10,
    },
    propertyName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    propertyPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#6200ee",
        marginTop: 5,
    },
    propertyLocation: {
        fontSize: 12,
        color: "#666",
        marginVertical: 5,
    },
    button: {
        backgroundColor: "#6200ee",
        paddingVertical: 8,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    addButton: {
        backgroundColor: "#6200ee",
        padding: 12,
        margin: 15,
        borderRadius: 8,
        alignItems: "center",
        elevation: 3,
    },
    addButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default HomeTwo;
