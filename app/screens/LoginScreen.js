import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", values, {
        headers: { "Content-Type": "application/json" },
      });
      dispatch(loginSuccess(res.data));
      setSubmitting(false);
      navigation.replace("Home");
    } catch (err) {
      setSubmitting(false);
      alert(
        "Login failed. Use sample credentials: username: kminchelle password: 0lelplR"
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={["#0A1A2F", "#000814"]}
        style={styles.gradientBg}
      />

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Logo/Brand Section */}
        <View style={styles.brandSection}>
          <View style={styles.logoCircle}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.tagline}>Your Sports, Your Pulse</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <>
                {/* Username Field */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Username</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your username"
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

                {/* Password Field */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
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
                </View>

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotButton}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  style={styles.loginButton}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#007BFF", "#007BFF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.loginGradient}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.loginText}>Login</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Register Link */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                  style={styles.registerButton}
                >
                  <Text style={styles.registerText}>
                    Don't have an account?{" "}
                    <Text style={styles.registerLink}>Sign Up</Text>
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  brandSection: {
    alignItems: "center",
    marginBottom: 48,
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
  brandName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: "#4B5563",
    letterSpacing: 1,
  },
  formContainer: {
    backgroundColor: "rgba(10, 26, 47, 0.5)",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(0, 123, 255, 0.2)",
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
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
    color: "#18E7F2",
    fontWeight: "500",
  },
  loginButton: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "500",
  },
  registerButton: {
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#E5E7EB",
  },
  registerLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});
