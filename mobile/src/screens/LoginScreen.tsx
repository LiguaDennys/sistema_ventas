import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { useUserStore } from "../store/userStore"; // 👈 Zustand
import Toast from "react-native-toast-message";
import type { RootStackParamList } from "../../App";

// type RootStackParamList = {
//   Login: undefined;
//   Registro: { modo: string };
//   Home: undefined;
// };

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const setUser = useUserStore((state) => state.setUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Función para hacer login
  const handleLogin = async () => {
    if(!username || !password){
      Toast.show({
        type: "error",
        text1: "Campos vacíos",
        text2: "Por favor, Debes ingresar usuario y contraseña",
      });
      return;
    }
    
    try {
      const response = await fetch("http://192.168.100.11:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Error al iniciar sesión:", data.message);
        Toast.show({
          type: "error",
          text1: "Error al iniciar sesión",
          text2: data.message || "Por favor, inténtelo de nuevo más tarde.",
        });
        return;
      }

      // Guardamos usuario en Zustand
      setUser(data.user);

      // console.log("Bienvenido", data.user.username);
      Toast.show({
        type: "success",
        text1: "Inicio de sesión exitoso",
        text2: `Bienvenido, ${data.user.username}!`,
      });

      // Navegamos a Home
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error de conexión con el servidor", error);
    }
  };

  // Navegar a Registro
  const handleRegistrarse = () => {
    navigation.navigate("Registro", { modo: "registro" });
  };

  return (
    <View className="justify-center flex-1 px-6 bg-gray-100">
      {/* Logo */}
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
        }}
        style={{ width: 100, height: 100, alignSelf: "center", marginBottom: 20 }}
      />

      {/* Card */}
      <View className="p-6 bg-white shadow-md rounded-2xl">
        <Text className="mb-6 text-3xl font-bold text-center text-gray-800">
          Iniciar Sesión
        </Text>

        <Text className="mb-2 text-xl text-gray-800">Usuario</Text>
        <TextInput
          placeholder="Ingrese su nombre"
          className="p-4 mb-4 bg-gray-100 border border-gray-300 rounded-xl"
          value={username}
          onChangeText={setUsername}
        />

        <Text className="mb-2 text-xl text-gray-800">Contraseña</Text>
        <TextInput
          placeholder="Ingrese su contraseña"
          secureTextEntry
          className="p-4 mb-6 bg-gray-100 border border-gray-300 rounded-xl"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          className="p-4 bg-blue-600 rounded-xl active:bg-blue-700"
          onPress={handleLogin}
        >
          <Text className="text-lg font-semibold text-center text-white">
            Entrar
          </Text>
        </TouchableOpacity>

        <View className="items-center mt-4">
          <Text className="text-gray-600">
            ¿No tienes cuenta?
            <Text
              className="font-semibold text-blue-600"
              onPress={() => navigation.navigate("Registro", { modo: "registro" })}
            >
              {" "}Regístrate aquí
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
