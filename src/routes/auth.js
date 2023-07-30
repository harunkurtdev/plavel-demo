
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { Colors } from "../constants/styles";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
                headerTitleStyle: { fontSize: 24 },
                headerTitleAlign: 'center',
                headerBackImage: () => <Ionicons name="arrow-back" size={24} color="white" />
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} options={({ navigation }) => ({
                headerTitle: 'plavel',
                headerStyle: { backgroundColor: 'white' },

                headerTitle: () => (
                    <Image
                        source={"https://picsum.photos/200/300"}
                        style={{ width: 125, height: 50, margin: 5 }}
                        resizeMode="contain"
                    />
                ),
                headerTitleAlign: "center",
            })} />
        </Stack.Navigator>
    );
}
