

import { View, Text, TouchableOpacity } from "react-native";
import { useUserStore } from "../store/userStore";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import type { RootStackParamList } from "../../App";

export default function HomeScreen() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    logout(); // limpia usuario en Zustand
    navigation.navigate("Login"); // vuelve a Login
  };

  return (
    <View className="justify-center flex-1 px-6 bg-gray-100">
      {/* Card central */}
      <View className="items-center p-6 bg-white shadow-md rounded-2xl">
        <Text className="mb-4 text-3xl font-bold text-center text-gray-800">
          Bienvenido
        </Text>

        <Text className="mb-6 text-xl text-center text-gray-700">
          {user?.username || "Usuario"}
        </Text>

        <TouchableOpacity
          className="w-full p-4 bg-red-500 rounded-xl"
          onPress={handleLogout}
        >
          <Text className="text-lg font-semibold text-center text-white">
            Cerrar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
