import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";

import { StreamChat } from "stream-chat";
import { useEffect } from "react";

const API_KEY = "kz2qdnrtyh4e";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const connectUser = async () => {
    // sign in user with backend and get the user token
    await client.connectUser(
      {
        id: "juarmo",
        name: "juarmo",
        imageUrl: "https://",
      },
      client.devToken("juarmo")
    );
  };
  useEffect(() => {
    connectUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
