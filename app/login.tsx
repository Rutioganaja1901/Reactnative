// app/login.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Animated,
    Dimensions,
    StatusBar
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('window');

// Storage key for users
const USERS_STORAGE_KEY = '@app_users';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const buttonScale = new Animated.Value(1);
    const shakeAnimation = new Animated.Value(0);

    const animateButtonPress = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const shakeForm = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Missing Information", "Please enter both email and password");
            shakeForm();
            return;
        }

        setIsLoading(true);
        animateButtonPress();

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            // Get stored users from AsyncStorage
            const usersJSON = await AsyncStorage.getItem(USERS_STORAGE_KEY);
            const users = usersJSON ? JSON.parse(usersJSON) : [];

            // Check if user exists and password matches
            const user = users.find((u: any) => u.email === email && u.password === password);
            
            if (user) {
                // Login successful - store current user session
                await AsyncStorage.setItem('@current_user', JSON.stringify(user));
                Alert.alert("Success", `Welcome back, ${user.name}!`);
                router.replace("/(tabs)");
            } else {
                // Also check hardcoded admin credentials as fallback
                if (email === "admin@example.com" && password === "123456") {
                    const adminUser = {
                        name: "Admin",
                        email: "admin@example.com",
                        password: "123456"
                    };
                    await AsyncStorage.setItem('@current_user', JSON.stringify(adminUser));
                    router.replace("/(tabs)");
                } else {
                    Alert.alert("Invalid Credentials", "Please check your email and password and try again.");
                    shakeForm();
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert("Error", "Something went wrong. Please try again.");
            shakeForm();
        }

        setIsLoading(false);
    };

    const handleForgotPassword = () => {
        router.push("/forgot-password");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
            
            {/* Fixed Header Section */}
            <View style={styles.fixedHeader}>
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                        <Ionicons name="lock-closed" size={32} color="#007AFF" />
                    </View>
                </View>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue your journey</Text>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={true}
            >
                <Animated.View
                    style={[
                        styles.formContainer,
                        {
                            transform: [{ translateX: shakeAnimation }]
                        }
                    ]}
                >
                    {/* Form Section */}
                    <View style={styles.form}>
                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="mail-outline"
                                size={20}
                                color={focusedInput === 'email' ? "#007AFF" : "#666"}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                placeholder="Enter your email"
                                placeholderTextColor="#999"
                                style={[
                                    styles.input,
                                    focusedInput === 'email' && styles.inputFocused
                                ]}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                onFocus={() => setFocusedInput('email')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={focusedInput === 'password' ? "#007AFF" : "#666"}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                placeholder="Enter your password"
                                placeholderTextColor="#999"
                                style={[
                                    styles.input,
                                    focusedInput === 'password' && styles.inputFocused
                                ]}
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                onFocus={() => setFocusedInput('password')}
                                onBlur={() => setFocusedInput(null)}
                            />
                            <TouchableOpacity 
                                style={styles.visibilityIcon}
                                onPress={togglePasswordVisibility}
                            >
                                <Ionicons 
                                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                                    size={20} 
                                    color="#666" 
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Forgot Password */}
                        <TouchableOpacity
                            style={styles.forgotPasswordContainer}
                            onPress={handleForgotPassword}
                        >
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    isLoading && styles.buttonDisabled
                                ]}
                                onPress={handleLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <View style={styles.loadingContainer}>
                                        <Ionicons name="refresh" size={20} color="#fff" />
                                        <Text style={styles.buttonText}>Signing In...</Text>
                                    </View>
                                ) : (
                                    <View style={styles.buttonContent}>
                                        <Text style={styles.buttonText}>Sign In</Text>
                                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </Animated.View>

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>or continue with</Text>
                            <View style={styles.divider} />
                        </View>

                        {/* Social Login */}
                        <View style={styles.socialContainer}>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-google" size={24} color="#DB4437" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-apple" size={24} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                            </TouchableOpacity>
                        </View>

                        {/* Sign Up Link */}
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => router.push("/signup")}>
                                <Text style={styles.signupLink}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },
    fixedHeader: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 20,
        paddingHorizontal: 24,
        backgroundColor: "#f8fafc",
        alignItems: "center",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
                shadowColor: "#000",
            },
        }),
        zIndex: 10,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    formContainer: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 20,
    },
    logoContainer: {
        marginBottom: 16,
        marginTop: 20,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        ...Platform.select({
            ios: {
                shadowColor: "#007AFF",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.15,
                shadowRadius: 16,
            },
            android: {
                elevation: 8,
                shadowColor: "#007AFF",
            },
        }),
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1a202c",
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#718096",
        textAlign: "center",
        lineHeight: 20,
    },
    form: {
        width: "100%",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
            },
            android: {
                elevation: 2,
                shadowColor: "#000",
            },
        }),
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 16,
        color: "#1a202c",
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    inputFocused: {
        // Focus style is handled by container
    },
    visibilityIcon: {
        padding: 4,
        marginLeft: 8,
    },
    forgotPasswordContainer: {
        alignItems: "flex-end",
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: "#007AFF",
        fontSize: 14,
        fontWeight: "600",
    },
    button: {
        backgroundColor: "#007AFF",
        paddingVertical: 16,
        borderRadius: 12,
        marginBottom: 24,
        ...Platform.select({
            ios: {
                shadowColor: "#007AFF",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
            },
            android: {
                elevation: 6,
                shadowColor: "#007AFF",
            },
        }),
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    loadingContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#e2e8f0",
    },
    dividerText: {
        color: "#718096",
        fontSize: 14,
        marginHorizontal: 12,
        fontWeight: "500",
    },
    socialContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        marginBottom: 32,
    },
    socialButton: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
                shadowColor: "#000",
            },
        }),
    },
    signupContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },
    signupText: {
        color: "#718096",
        fontSize: 15,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    signupLink: {
        color: "#007AFF",
        fontSize: 15,
        fontWeight: "600",
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
});