import "./global.css"


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegistroScreen from "./src/screens/RegistroScreen";
import HomeScreen from "./src/screens/HomeScreen";


// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Registro" component={RegistroScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


// import Toast from "react-native-toast-message";

// export type RootStackParamList = {
//   Login: undefined;
//   Registro: { modo: string };
//   Home: undefined;
// };

// const Stack = createStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator >
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Registro" component={RegistroScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }  } />
//       </Stack.Navigator>
//       <Toast /> 
//     </NavigationContainer>
//   );
// }

import React from "react";

import Toast from "react-native-toast-message";


// Define los tipos de rutas
export type RootStackParamList = {
  Login: undefined;
  Registro: { modo: string };
  Home: undefined;
};

// Crea el stack navigator
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registro"
          component={RegistroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {/* Toast global */}
      <Toast />
    </NavigationContainer>
  );
}
