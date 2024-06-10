import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import CustomerCard from "../Components/CustomerCard";

// Hardcoded customer data
const customers = require("../customers.json");

const CustomerList = ({ navigation }) => {
  const cardPressHandler = (customer) => {
    navigation.navigate("Edit Customer", { customer: customer });
    
  };

  return (
    <View style={styles.container}>
      <View style={{flex:1}}>
      <FlatList
        data={customers}
        renderItem={({ item }) => {
          return (
            <CustomerCard
              customer={item}
              cardPressHandler={() => cardPressHandler(item)}
            />
          );
        }}
        keyExtractor={(item, index) => item.icNumber}
        contentContainerStyle={styles.listContainer}
      />
      </View>
      <View>
        <Pressable
          style={styles.registerButton}
          onPress={() => navigation.navigate("Register Customer")}
        >
          <Text style={styles.registerText}>Register Customer</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  registerButton: {
    backgroundColor: "#0866FF",
    padding: 15,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginHorizontal: 20,
  },
  registerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomerList;
