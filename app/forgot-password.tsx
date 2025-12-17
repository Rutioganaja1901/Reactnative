// app/forgot-password.tsx
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

const { width, height } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

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

    const handleSendResetLink = async () => {
        if (!email) {
            Alert.alert("Missing Information", "Please enter your email address");
            shakeForm();
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address");
            shakeForm();
            return;
        }

        setIsLoading(true);
        animateButtonPress();

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message and navigate to reset password screen
        Alert.alert(
            "Reset Link Sent",
            "We've sent a password reset link to your email address.",
            [
                {
                    text: "Continue to Reset",
                    onPress: () => {
                        router.push({
                            pathname: "/reset-password",
                            params: { userEmail: email }
                        });
                    }
                }
            ]
        );

        setIsLoading(false);
    };

    const handleBackToLogin = () => {
        router.push("/login");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

            {/* Fixed Header Section */}
            <View style={styles.fixedHeader}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBackToLogin}
                >
                    <Ionicons name="arrow-back" size={24} color="#007AFF" />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                        <Ionicons name="key-outline" size={32} color="#007AFF" />
                    </View>
                </View>
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.subtitle}>Enter your email to reset your password</Text>
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
                                placeholder="Enter your email address"
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

                        {/* Info Text */}
                        <View style={styles.infoContainer}>
                            <Ionicons name="information-circle-outline" size={20} color="#666" />
                            <Text style={styles.infoText}>
                                We'll send a verification code to this email address to reset your password.
                            </Text>
                        </View>

                        {/* Send Reset Link Button */}
                        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    isLoading && styles.buttonDisabled
                                ]}
                                onPress={handleSendResetLink}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <View style={styles.loadingContainer}>
                                        <Ionicons name="refresh" size={20} color="#fff" />
                                        <Text style={styles.buttonText}>Sending Link...</Text>
                                    </View>
                                ) : (
                                    <View style={styles.buttonContent}>
                                        <Text style={styles.buttonText}>Send Reset Link</Text>
                                        <Ionicons name="send-outline" size={20} color="#fff" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </Animated.View>

                        {/* Back to Login Link */}
                        <View style={styles.loginContainer}>
                            <TouchableOpacity
                                style={styles.backToLoginButton}
                                onPress={handleBackToLogin}
                            >
                                <Ionicons name="arrow-back" size={16} color="#007AFF" />
                                <Text style={styles.backToLoginText}>Back to Sign In</Text>
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
    backButton: {
        position: 'absolute',
        left: 24,
        top: Platform.OS === 'ios' ? 60 : 40,
        padding: 8,
        zIndex: 11,
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
        marginTop: 120,
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
        marginBottom: 20,
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
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#EDF2F7',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        gap: 12,
    },
    infoText: {
        flex: 1,
        color: '#4A5568',
        fontSize: 14,
        lineHeight: 20,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
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
    loginContainer: {
        alignItems: "center",
        marginTop: 8,
    },
    backToLoginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    backToLoginText: {
        color: "#007AFF",
        fontSize: 15,
        fontWeight: "600",
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
});