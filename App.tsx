import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NhostClient, NhostReactProvider } from "@nhost/react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text } from "./src/components/Themed";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";

import { StreamChat } from "stream-chat";
import { SetStateAction, useEffect, useState } from "react";
import {
  OverlayProvider,
  Chat,
  ChannelList,
  Channel,
  MessageList,
  DeepPartial,
  Theme,
} from "stream-chat-expo";
import AuthContext from "./src/context/AuthContext";
import { StreamColors } from "./src/constants/Colors";

const API_KEY = "kz2qdnrtyh4e";
const client = StreamChat.getInstance(API_KEY);
const theme: DeepPartial<Theme> = {
  colors: StreamColors,
};

const nhost = new NhostClient({
  backendUrl: "https://rxmaecrgmhgpuwofcnuq.nhost.run",
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // this is done when component mounts
    return () => {
      // this is done when component unmounts
      client.disconnectUser();
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext>
          <NhostReactProvider nhost={nhost}>
            <OverlayProvider value={{ style: theme }}>
              <Chat client={client}>
                <Navigation colorScheme={"dark"} />
              </Chat>
            </OverlayProvider>
          </NhostReactProvider>
        </AuthContext>
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
}
