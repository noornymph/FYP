import React, { useEffect, useState, createContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import { Image } from "react-native";

// screens
import Home from "./src/screens/Home";
import Splash from "./src/screens/Splash";
import Result from "./src/screens/Result";
import Crops from "./src/screens/Crops";
import Type from "./src/screens/Type";
import Calendar from "./src/screens/Calendar";
import Error from "./src/screens/Error";
// import Camera from "./src/screens/Camera";
import CameraButton from "./src/components/CameraButton";

import outputHeader from "./assets/images/outputHeader.jpg";

import DATA from "./data";

import { AppContext } from "./src/globals/context";

const Stack = createNativeStackNavigator();

export default function App() {
    const [appState, setAppState] = useState({});

    let [isLoaded, setIsLoaded] = useState(false);
    let [fontsLoaded] = useFonts(DATA.font);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Show nothing if the fonts have not loaded
    if (!fontsLoaded) {
        return <Splash />;
    }

    return (
        <AppContext.Provider value={[appState, setAppState]}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShadowVisible: false,
                        headerBackVisible: false,
                        headerTitle: (props) => (
                            <Image
                                source={outputHeader}
                                style={{ width: "95%", height: 50 }}
                            />
                        ),
                    }}
                >
                    <Stack.Screen name={"Home"} component={Home} />
                    <Stack.Screen name={"Crops"} component={Crops} />
                    <Stack.Screen name={"Type"} component={Type} />
                    <Stack.Screen name={"Calendar"} component={Calendar} />
                    <Stack.Screen
                        name={"CameraButton"}
                        component={CameraButton}
                    />
                    <Stack.Screen name={"Result"} component={Result} />
                    <Stack.Screen name={"Error"} component={Error} />
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    );
}
