import React from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Pressable,
  TextInput,
  Platform,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { format } from "date-fns";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only characters are allowed")
    .required("Name is required"),
  dob: yup
    .date()
    .required("Date of birth is required")
    .test("DOB", "You must be at least 18 years old", function (value) {
      return new Date().getFullYear() - new Date(value).getFullYear() >= 18;
    }),
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

const CustomerRegistration = ({navigation}) => {
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios"); // On iOS, keep the picker open until the user confirms
    if (selectedDate) {
      setFieldValue("dob", selectedDate.toISOString().split("T")[0]); // Set the date in 'YYYY-MM-DD' format
    }
    if (Platform.OS === "android") {
      setShowPicker(false); // Close the picker on Android after selecting a date
    }
  };

  const handleSubmit = (values) => {
    Alert.alert("Registration Successful", "New Customer Added");
    navigation.goBack();
  };

  const today = new Date();
  const formattedDate = format(today, "dd MMM yyyy");

  return (
    <Formik
      initialValues={{ name: "", dob: null, icNumber: "", address: "" }}
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
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <View>
              <Text style={styles.label}>Customer Name</Text>
              <TextInput
 
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                style={styles.input}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}

              <Text style={styles.label}>Date of Birth</Text>
              <View style={styles.datePickerContainer}>
                {Platform.OS == "ios" && (
                  <DateTimePicker
                    
                    value={values.dob ? new Date(values.dob) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) =>
                      setFieldValue("dob", selectedDate)
                    }
                    style={styles.datePicker}
                  />
                )}
             



                {Platform.OS == "android" && (
                  <Pressable 
                    
                    onPress={() => {
                      DateTimePickerAndroid.open({
                        value: new Date(),
                        onChange: (event, selectedDate) => {
                          if (selectedDate) {
                            console.log(selectedDate);
                            setFieldValue("dob", selectedDate);
                          }
                        },
                        mode: "date",
                        display: "default",
                      });
                    }}
                    title="select a date"
                  >
                    <Text style={{ color: 'black' }}>
              {values.dob ? format(new Date(values.dob), 'dd MMM yyyy') : 'DD/MM/YYYY'}
            </Text>
                  </Pressable>
                )}
              </View>
              {touched.dob && errors.dob && (
                <Text style={styles.error}>{errors.dob}</Text>
              )}
              <Text style={styles.label}>IC Number</Text>
              <TextInput
 
                keyboardType="numeric"
                onChangeText={handleChange("icNumber")}
                onBlur={handleBlur("icNumber")}
                value={values.icNumber}
                style={styles.input}
                maxLength={12}
              />
              {touched.icNumber && errors.icNumber && (
                <Text style={styles.error}>{errors.icNumber}</Text>
              )}
              <Text style={styles.label}>Address</Text>

              <TextInput

                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address}
                style={styles.input}
                maxLength={100}
              />
              {touched.address && errors.address && (
                <Text style={styles.error}>{errors.address}</Text>
              )}
            </View>
          </ScrollView>
          <View>
            <Pressable style={styles.registerButton} onPress={handleSubmit}>
              <Text style={styles.registerText}>Register</Text>
            </Pressable>
          </View>
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
  button: {
    marginTop: 20,
  },
  datePickerContainer: {
    marginBottom: 10,
    paddingVertical: 7,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 7,
    marginTop: 5,
    paddingEnd: 10,
  },
  datePicker: {
    width: "100%",
  },
  registerButton: {
    backgroundColor: "#0866FF",
    padding: 15,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  registerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomerRegistration;
