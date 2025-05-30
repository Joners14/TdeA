/*import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

const Register = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureText, setSecureText] = useState(true);

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Por favor, ingresa un correo y contraseña");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert("Éxito", "Usuario registrado correctamente");
            navigation.navigate("Login"); // Redirige a login después del registro
        } catch (error) {
            Alert.alert("Error", "No se pudo registrar el usuario");
        }
    };

    return (
        <View style={styles.container}>
            {/* Botón para regresar */ /*
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
                <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>

            <Text style={styles.title}>Crear una cuenta</Text>

            <TextInput
                label="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={secureText}
                right={
                    <TextInput.Icon
                        icon={secureText ? "eye-off" : "eye"}
                        onPress={() => setSecureText(!secureText)}
                    />
                }
                style={styles.input}
            />

            <Button mode="contained" onPress={handleRegister} style={styles.button}>
                Registrarse
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6200ee", // Color de fondo morado vibrante
        padding: 20,
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 20,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: 10,
        borderRadius: 50,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "white",
        marginBottom: 30,
    },
    input: {
        width: "100%",
        marginBottom: 15,
        backgroundColor: "white",
    },
    button: {
        width: "100%",
        padding: 5,
        backgroundColor: "#ff9800",
    },
    loginText: {
        marginTop: 20,
        color: "white",
        fontSize: 16,
    },
});

export default Register;

*/

import React, { useState } from "react";
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

const Register = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureText, setSecureText] = useState(true);

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Por favor, ingresa un correo y contraseña");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert("Éxito", "Usuario registrado correctamente");
            navigation.navigate("Iniciar Sesion");
        } catch (error) {
            Alert.alert("Error", "No se pudo registrar el usuario");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("Iniciar Sesion")}
                >
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.title}>Crear una cuenta</Text>

                <TextInput
                    label="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    theme={{ colors: { primary: "#6200ee" } }}
                />

                <TextInput
                    label="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    secureTextEntry={secureText}
                    right={
                        <TextInput.Icon
                            icon={secureText ? "eye-off" : "eye"}
                            onPress={() => setSecureText(!secureText)}
                        />
                    }
                    style={styles.input}
                    theme={{ colors: { primary: "#6200ee" } }}
                />

                <Button
                    mode="contained"
                    onPress={handleRegister}
                    style={styles.button}
                    labelStyle={styles.buttonText}
                >
                    Registrarse
                </Button>

                <TouchableOpacity onPress={() => navigation.navigate("Iniciar Sesion")}>
                    <Text style={styles.loginText}>
                        ¿Ya tienes cuenta? Inicia sesión
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 20,
        backgroundColor: "#6200ee",
        padding: 8,
        borderRadius: 30,
        zIndex: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        width: "100%",
        marginBottom: 15,
        backgroundColor: "white",
    },
    button: {
        width: "100%",
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#6200ee",
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    loginText: {
        marginTop: 25,
        fontSize: 16,
        color: "#6200ee",
        textDecorationLine: "underline",
    },
});

export default Register;
