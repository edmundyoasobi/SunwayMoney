import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomerList from './Screens/CustomerList';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerRegistration from './Screens/CustomerRegistration';
import EditCustomer from './Screens/EditCustomer';
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CustomerList" component={CustomerList} />
          <Stack.Screen name="Register Customer" component={CustomerRegistration} />
          <Stack.Screen name="Edit Customer" component={EditCustomer} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
