import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

// Define validation schema with Yup
const validationSchema = yup.object().shape({
  icNumber: yup
    .string()
    .matches(/^\d+$/, "Only numbers are allowed")
    .max(12, "IC Number cannot exceed 12 digits")
    .required("IC Number is required"),
  address: yup
    .string()
    .max(100, "Address cannot exceed 100 characters")
    .required("Address is required"),
});

const EditCustomer = ({ route, navigation }) => {
  // Assuming customer data is passed via route params
  const { customer } = route.params;

  const handleSubmit = (values) => {
    Alert.alert("Update Successful", "Customer details updated successfully");
    navigation.goBack();
  };

  return (
    <Formik
      initialValues={{ icNumber: customer.icNumber, address: customer.address }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <ScrollView style={{flex: 1}}>
          {/* Displaying non-editable fields */}
          <View>
            <View style={styles.field}>
              <Text style={styles.label}>Customer Name</Text>
              <TextInput style={styles.input} editable={false}>
                {customer.name}
              </TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput style={styles.input} editable={false}>
                {customer.dob}
              </TextInput>
            </View>

            {/* Editable fields */}
            <Text style={styles.label}>IC Number</Text>
            <TextInput
              placeholder="IC Number"
              keyboardType="numeric"
              onChangeText={handleChange("icNumber")}
              onBlur={handleBlur("icNumber")}
              value={values.icNumber}
              maxLength={12}
              style={[
                styles.input,
                touched.icNumber && errors.icNumber && styles.errorInput,
              ]}
            />
            {touched.icNumber && errors.icNumber && (
              <Text style={styles.error}>{errors.icNumber}</Text>
            )}

            <Text style={styles.label}>Address</Text>
            <TextInput
              placeholder="Address"
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
              maxLength={100}
              mode="outlined"
              style={[
                styles.input,
                touched.address && errors.address && styles.errorInput,
              ]}
            />
            {touched.address && errors.address && (
              <Text style={styles.error}>{errors.address}</Text>
            )}
          </View>
          <View>
            <Pressable style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  field: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 17,
    color: "black",
  },
  input: {
    paddingVertical: 15,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 7,
    marginTop: 5,
  },
  error: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  saveButton: {
    backgroundColor: "#0866FF",
    padding: 15,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  saveText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditCustomer;
