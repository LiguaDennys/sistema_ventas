import { View, Text,Image,  TouchableOpacity, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { useUserStore } from "../store/userStore"; // 👈 Zustand
import Toast from "react-native-toast-message";
import type { RootStackParamList } from "../../App";
import { Ionicons } from "@expo/vector-icons";



export default function RegistroScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const setUser = useUserStore((state) => state.setUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userFocused, setUserFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleRegistrarse = async () => {
    if(!username || !password){
      Toast.show({
        type: "error",
        text1: "Campos vacíos",
        text2: "Por favor, Debes ingresar usuario y contraseña",
      });
      return;
    }
    try {
      const response = await fetch("http://192.168.100.11:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Error al registrarse",
          text2: data.message || "No se pudo completar el registro.",
        });
        console.log("Error al registrarse:", data.message);
        return;
      }

      // Guardamos usuario en Zustand
      setUser(data.user);

      Toast.show({
        type: "success",
        text1: "Registro exitoso",
        text2: `Usuario ${data.user.username} registrado correctamente!`,
      });

      console.log("Registro exitoso", data.user.username);

      // Navegamos a Login
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error de conexión con el servidor", error);
    }
  };
  
  return (
    <View className="justify-center flex-1 px-6 bg-gray-100">
      {/* Logo */}
      <Image
        source={{ uri: "https://img.icons8.com/color/96/add-user-male.png" }}
        style={{ width: 100, height: 100, alignSelf: "center", marginBottom: 20 }}
      />

      {/* Card */}
      <View className="p-6 bg-white shadow-md rounded-2xl">
        <Text className="mb-6 text-3xl font-bold text-center text-gray-800">
          Registro
        </Text>
        
        <View className={`flex-row items-center bg-gray-50 border ${userFocused ? 'border-blue-600' : 'border-gray-300'} rounded-xl  p-2 mb-4`}>
          <Ionicons name="person-outline" size={24} className= "mr-4 text-gray-400"/>
          <TextInput
            placeholder="Ingrese su nombre"
            className="flex-1 text-base "
            value={username}
            onChangeText={setUsername}
            onFocus={() => setUserFocused(true)}
            onBlur={() => setUserFocused(false)}
          />
          
        </View>

      

        <View className={`flex-row items-center bg-gray-50 border ${passFocused ? 'border-blue-600' : 'border-gray-300'} rounded-xl  p-2 mb-4`}>
          <Ionicons name="lock-closed-outline" size={24} className= "mr-4 text-gray-400"/>
          <TextInput
            placeholder="Ingrese su contraseña"
            className="flex-1 text-base "
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPassFocused(true)}
            onBlur={() => setPassFocused(false)}
            secureTextEntry={!passwordVisible}
          />
          <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons name={passwordVisible ? "eye-off-outline" : "eye-outline"} size={24} className="text-gray-400" />
          </Pressable>
        </View>

        
        <TouchableOpacity
          className="p-4 bg-green-600 rounded-xl active:bg-green-700"
          onPress={handleRegistrarse}
        >
          <Text className="text-lg font-semibold text-center text-white">
            Registrarse
          </Text>
        </TouchableOpacity>

        <View className="items-center mt-4">
          <Text className="text-gray-600">
            ¿Ya tienes cuenta?
            <Text
              className="font-semibold text-blue-600"
              onPress={() => navigation.navigate("Login")}
            >
              {" "}Inicia sesión
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
 
}
