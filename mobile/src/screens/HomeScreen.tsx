

// import { View, Text, TouchableOpacity } from "react-native";
// import { useUserStore } from "../store/userStore";
// import { useNavigation } from "@react-navigation/native";
// import type { StackNavigationProp } from "@react-navigation/stack";

// type RootStackParamList = {
//   Login: undefined;
//   Registro: { modo: string };
//   Home: undefined;
// };

// type HomeScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "Home"
// >;

// export default function HomeScreen() {
//   const { user, logout } = useUserStore();
//   const navigation = useNavigation<HomeScreenNavigationProp>();

//   const handleLogout = () => {
//     logout(); // limpia el usuario en tu store
//     console.log("Sesión cerrada correctamente");
//     navigation.reset({
//       index: 0,
//       routes: [{ name: "Login" }],
//     });
//   };

//   return (
//     <View className="items-center justify-center flex-1 bg-white">
//       <Text className="mb-4 text-2xl font-bold text-gray-800">
//         Bienvenido {user?.username}
//       </Text>

//       <TouchableOpacity
//         className="p-4 bg-red-600 rounded-md"
//         onPress={handleLogout}
//       >
//         <Text className="text-lg font-semibold text-center text-white">
//           Cerrar sesión
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }


// import { View, Text, TouchableOpacity } from "react-native";
// import { useUserStore } from "../store/userStore";
// import { useNavigation } from "@react-navigation/native";
// import type { StackNavigationProp } from "@react-navigation/stack";
// import type { RootStackParamList } from "../../App";

// export default function HomeScreen() {
//   const user = useUserStore((state) => state.user);
//   const setUser = useUserStore((state) => state.setUser);
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

//   const handleLogout = () => {
//     setUser(null);
//     navigation.navigate("Login");
//   };

//   return (
//     <View className="items-center justify-center flex-1 px-6 bg-gray-100">
//       <Text className="mb-4 text-3xl font-bold text-gray-800">
//         Bienvenido {user?.username || "Usuario"}
//       </Text>

//       <TouchableOpacity
//         className="p-4 mt-4 bg-red-500 rounded-xl"
//         onPress={handleLogout}
//       >
//         <Text className="text-lg font-semibold text-center text-white">
//           Cerrar sesión
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

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
