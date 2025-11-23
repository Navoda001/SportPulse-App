import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterScreen({ navigation }) {
  const Schema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().min(4, "Too short").required("Required"),
    email: Yup.string().email("Invalid").required("Required"),
  });

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={["#0A1A2F", "#000814"]}
        style={styles.gradientBg}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.logoCircle}>
            <Image
              source={require("../../assets/logo.png")} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join SportPulse today</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ username: "", password: "", email: "" }}
            validationSchema={Schema}
            onSubmit={(values) => {
              alert("Registered (mock). Please login with sample credentials.");
              navigation.replace("Login");
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                {/* Username Field */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Username</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      errors.username && touched.username && styles.inputError,
                    ]}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Choose a username"
                      placeholderTextColor="#4B5563"
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      value={values.username}
                      autoCapitalize="none"
                    />
                  </View>
                  {errors.username && touched.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}
                </View>

                {/* Email Field */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      errors.email && touched.email && styles.inputError,
                    ]}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="your.email@example.com"
                      placeholderTextColor="#4B5563"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                {/* Password Field */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      errors.password && touched.password && styles.inputError,
                    ]}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Create a strong password"
                      placeholderTextColor="#4B5563"
                      secureTextEntry
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                  </View>
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                  <Text style={styles.helperText}>Minimum 4 characters</Text>
                </View>

                {/* Terms and Conditions */}
                <View style={styles.termsContainer}>
                  <Text style={styles.termsText}>
                    By creating an account, you agree to our{" "}
                    <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>
                </View>

                {/* Register Button */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.registerButton}
                  activeOpacity={0.8}
                >
                  <View style={styles.registerBackground}>
                    <Text style={styles.registerText}>Create Account</Text>
                  </View>
                </TouchableOpacity>

                {/* Login Link */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginText}>
                    Already have an account?{" "}
                    <Text style={styles.loginLink}>Sign In</Text>
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>

        {/* Social Register Options */}
        <View style={styles.socialSection}>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000814",
  },
  gradientBg: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  backText: {
    fontSize: 16,
    color: "#18E7F2",
    fontWeight: "500",
  },
  logoCircle: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },

  logoImage: {
    width: "500%",
    height: "500%",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#4B5563",
    letterSpacing: 0.5,
  },
  formContainer: {
    backgroundColor: "rgba(10, 26, 47, 0.5)",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(0, 123, 255, 0.2)",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E5E7EB",
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: "rgba(245, 247, 250, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  inputError: {
    borderColor: "#007BFF",
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#E5E7EB",
  },
  errorText: {
    fontSize: 12,
    color: "#007BFF",
    marginTop: 4,
    marginLeft: 4,
  },
  helperText: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 4,
    marginLeft: 4,
  },
  termsContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  termsText: {
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 18,
    textAlign: "center",
  },
  termsLink: {
    color: "#18E7F2",
    fontWeight: "500",
  },
  registerButton: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  registerGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  loginButton: {
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#E5E7EB",
  },
  loginLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  socialSection: {
    marginTop: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 11,
    color: "#4B5563",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    backgroundColor: "rgba(245, 247, 250, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  socialText: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "600",
  },
  registerBackground: {
  backgroundColor: "#007BFF",
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 10,
  alignItems: "center",
}

});
