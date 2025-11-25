import React from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginSuccess } from "../redux/slices/authSlice";
import themeConfig from "../redux/themeConfig";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const currentTheme = themeConfig[theme];
  const styles = createStyles(currentTheme, theme);

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
        "Login failed."
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={currentTheme.gradient}
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
                      placeholderTextColor={currentTheme.secondaryText}
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
                      placeholderTextColor={currentTheme.secondaryText}
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

const createStyles = (theme, mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.secondaryBackground,
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
      shadowColor: theme.secondaryIcon,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: mode === "dark" ? 0.5 : 0.3,
      shadowRadius: 16,
      elevation: 8,
    },
    logoImage: {
      width: "500%",
      height: "500%",
    },
    tagline: {
      fontSize: 14,
      color: theme.secondaryText,
      letterSpacing: 1,
    },
    formContainer: {
      backgroundColor: theme.secondaryBackground,
      borderRadius: 24,
      padding: 24,
      borderWidth: mode === "dark" ? 1 : 2,
      borderColor: theme.secondaryIcon + "30",
      shadowColor: theme.secondaryIcon,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: mode === "dark" ? 0.2 : 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 8,
    },
    inputWrapper: {
      backgroundColor:
        mode === "dark" ? "rgba(245, 247, 250, 0.05)" : theme.background,
      borderRadius: 12,
      borderWidth: mode === "dark" ? 1 : 2,
      borderColor: theme.secondaryText + "40",
    },
    input: {
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      color: theme.text,
    },
    errorText: {
      fontSize: 12,
      color: theme.secondaryIcon,
      marginTop: 4,
      marginLeft: 4,
    },
    forgotButton: {
      alignSelf: "flex-end",
      marginBottom: 24,
    },
    forgotText: {
      fontSize: 14,
      color: theme.icon,
      fontWeight: "500",
    },
    loginButton: {
      borderRadius: 12,
      overflow: "hidden",
      shadowColor: theme.secondaryIcon,
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
      backgroundColor: theme.secondaryText + "40",
    },
    dividerText: {
      marginHorizontal: 16,
      fontSize: 12,
      color: theme.secondaryText,
      fontWeight: "500",
    },
    registerButton: {
      alignItems: "center",
    },
    registerText: {
      fontSize: 14,
      color: theme.text,
    },
    registerLink: {
      color: theme.secondaryIcon,
      fontWeight: "bold",
    },
  });
