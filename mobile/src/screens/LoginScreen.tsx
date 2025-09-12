import { View, Text, TouchableOpacity, Image, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { useUserStore } from "../store/userStore"; // 👈 Zustand
import Toast from "react-native-toast-message";
import type { RootStackParamList } from "../../App";
import { Ionicons } from "@expo/vector-icons";
import Loading from "../components/loading"



export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const setUser = useUserStore((state) => state.setUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passFocused, setPassFocused] = useState(false);
  const [userFocused, setUserFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true); // <-- activamos loader
    try {
      const response = await fetch("http://192.168.100.11:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      //  setLoading(false); // <-- desactivamos loader

      if (!response.ok) {
          setTimeout(() => setLoading(false), 1500);
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
      // navigation.navigate("Home");

      // Espera 1.5s antes de ocultar loader y navegar
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("Home");
      }, 1500);
    } catch (error) {
      setLoading(false); // <-- desactivamos loader
      console.log("Error de conexión con el servidor", error);
    }
  };


  return (
    <View className="justify-center flex-1 px-6 bg-gray-100">

       {loading && <Loading text="Iniciando sesión..." />}
      {/* Logo */}
      <Image
        source={{
          uri: "https://img.icons8.com/color/96/enter-2.png",
        }}
        style={{ width: 100, height: 100, alignSelf: "center", marginBottom: 20 }}
      />
      {/* Card */}
      <View className="p-6 bg-white shadow-lg rounded-3xl">
        
        <Text className="mb-6 text-3xl font-bold text-center text-gray-800">
          Iniciar Sesión
        </Text>

          {/* Input Usuario */}
        <View className={`flex-row items-center bg-gray-50 border ${userFocused ?`border-blue-600`: `border-gray-300`} > rounded-xl mb-4 p-2`}>
          <Ionicons name="person-outline" size={20} className="mr-4 text-gray-400"/>
          <TextInput
            placeholder="Ingrese el usuario"
            className="flex-1 text-base "
            value={username}
            onChangeText={setUsername}
            onFocus={() => setUserFocused(true)}
            onBlur={() => setUserFocused(false)}
          />
        </View>

           {/* Input Contrasenia */}
        <View className={`flex-row items-center bg-gray-50 border ${passFocused ?`border-blue-600`: `border-gray-300`} > rounded-xl mb-4 p-2`}>
          <Ionicons name="lock-closed-outline" size={20} className="mr-4 text-gray-400"/>
          <TextInput
            placeholder="Ingrese la contraseña"
            className="flex-1 text-base "
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            onFocus={() => setPassFocused(true)}
            onBlur={() => setPassFocused(false)}
          />
          <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              className="text-gray-400"
            />
          </Pressable>
        </View>
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
