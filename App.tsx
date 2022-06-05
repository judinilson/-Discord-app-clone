import { GestureHandlerRootView } from "react-native-gesture-handler";
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
} from "stream-chat-expo";
import AuthContext from "./src/context/AuthContext";

const API_KEY = "kz2qdnrtyh4e";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    // this is done when component mounts
    return () => {
      // this is done when component unmounts
      client.disconnectUser();
    };
  }, []);

  const onChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext>
          <OverlayProvider>
            <Chat client={client}>
              <Navigation colorScheme={colorScheme} />
              {/* {!selectedChannel ? (
              <ChannelList onSelect={onChannelSelect} />
            ) : (
              <>
                <Channel channel={selectedChannel}></Channel>
                <Text
                  style={{ margin: 50 }}
                  onPress={() => setSelectedChannel(null)}
                >
                  Go Back
                </Text>
                <MessageList />
                <MessageList />
              </>
            )} */}
            </Chat>
          </OverlayProvider>
        </AuthContext>

        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
}
