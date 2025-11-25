import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import themeConfig from "../redux/themeConfig";

export default function RegisterScreen({ navigation }) {
  const theme = useSelector((state) => state.theme.mode);
  const currentTheme = themeConfig[theme];
  const styles = createStyles(currentTheme, theme);

  const Schema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().min(4, "Too short").required("Required"),
    email: Yup.string().email("Invalid").required("Required"),
  });

  // ✅ renamed to avoid overriding Formik's handleSubmit
  const onRegisterSubmit = (values) => {
    Alert.alert(
      "Registration Successful! 🎉",
      `Account created for ${values.username}`,
      [
        {
          text: "Sign In",
          onPress: () => navigation.navigate("Login"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={currentTheme.gradient}
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
            onSubmit={(values) => onRegisterSubmit(values)} // FIXED
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit, // Formik's submit
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
                      placeholderTextColor={currentTheme.secondaryText}
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
                  <Text style={styles.helperText}>Minimum 4 characters</Text>
                </View>

                {/* Terms */}
                <View style={styles.termsContainer}>
                  <Text style={styles.termsText}>
                    By creating an account, you agree to our{" "}
                    <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>
                </View>

                {/* Register Button */}
                <TouchableOpacity
                  onPress={handleSubmit} // FIXED → now the form submits correctly
                  style={styles.registerButton}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#007BFF", "#007BFF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.registerGradient}
                  >
                    <Text style={styles.registerText}>Create Account</Text>
                  </LinearGradient>
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

        {/* Social Login */}
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
      color: theme.icon,
      fontWeight: "500",
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
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: theme.secondaryText,
      letterSpacing: 0.5,
    },
    formContainer: {
      backgroundColor: theme.secondaryBackground,
      borderRadius: 24,
      padding: 24,
      borderWidth: mode === "dark" ? 1 : 2,
      borderColor: theme.secondaryIcon + "30",
      marginBottom: 24,
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
    inputError: {
      borderColor: theme.secondaryIcon,
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
    helperText: {
      fontSize: 12,
      color: theme.secondaryText,
      marginTop: 4,
      marginLeft: 4,
    },
    termsContainer: {
      marginTop: 8,
      marginBottom: 24,
    },
    termsText: {
      fontSize: 12,
      color: theme.secondaryText,
      lineHeight: 18,
      textAlign: "center",
    },
    termsLink: {
      color: theme.icon,
      fontWeight: "500",
    },
    registerButton: {
      borderRadius: 12,
      overflow: "hidden",
      shadowColor: theme.secondaryIcon,
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
      color: theme.text,
    },
    loginLink: {
      color: theme.secondaryIcon,
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
      backgroundColor: theme.secondaryText + "40",
    },
    dividerText: {
      marginHorizontal: 16,
      fontSize: 11,
      color: theme.secondaryText,
      fontWeight: "600",
      letterSpacing: 0.5,
    },
    socialButtons: {
      flexDirection: "row",
      gap: 12,
    },
    socialButton: {
      flex: 1,
      backgroundColor:
        mode === "dark" ? "rgba(245, 247, 250, 0.05)" : theme.background,
      borderWidth: mode === "dark" ? 1 : 2,
      borderColor: theme.secondaryText + "40",
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
    },
    socialText: {
      color: theme.text,
      fontSize: 14,
      fontWeight: "600",
    },
  });
