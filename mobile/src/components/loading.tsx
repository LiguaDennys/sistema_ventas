import { View, ActivityIndicator, Text } from "react-native";

type Props = {
  text?: string; // Texto opcional
  size?: "small" | "large"; // Tamaño del spinner
};

export default function Loading({ text = "Cargando...", size = "large" }: Props) {
  return (
    <View className="absolute inset-0 z-50 items-center justify-center flex-1 bg-black/30">
      <View className="flex-row items-center p-6 bg-white shadow-lg rounded-2xl">
        <ActivityIndicator size={size} color="#2563EB" className="mr-4" />
        <Text className="font-medium text-blue-600">{text}</Text>
      </View>
    </View>
  );
}
