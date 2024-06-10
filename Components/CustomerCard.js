import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";


const CustomerCard = ({ customer,cardPressHandler }) => {

  return (
    <View style={styles.card}>
      <Pressable onPress={cardPressHandler}>
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.name}>{customer.name}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="cake" size={24} style={styles.icon} />
          <Text style={styles.details}>DOB: {customer.dob}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="credit-card" size={24} style={styles.icon} />
          <Text style={styles.details}>IC Number: {customer.icNumber}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="date-range" size={24} style={styles.icon} />
          <Text style={styles.details}>
            Register Date: {customer.registerDate}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="home" size={24} style={styles.icon} />
          <Text  style={styles.details}>Address: {customer.address}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    paddingEnd : 10
  },
  icon: {
    marginRight: 10,
    color: "#555",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
  },
});

export default CustomerCard;
