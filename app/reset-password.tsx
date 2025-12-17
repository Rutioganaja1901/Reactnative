// app/reset-password.tsx
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
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

export default function ResetPasswordScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const userEmail = params.userEmail as string;

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const validateForm = () => {
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            Alert.alert("Missing Information", "Please fill in all fields");
            return false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            Alert.alert("Password Mismatch", "New passwords do not match");
            return false;
        }

        if (formData.newPassword.length < 6) {
            Alert.alert("Weak Password", "New password must be at least 6 characters long");
            return false;
        }

        if (formData.oldPassword === formData.newPassword) {
            Alert.alert("Same Password", "New password must be different from old password");
            return false;
        }

        return true;
    };

    const handleResetPassword = async () => {
        if (!validateForm()) {
            shakeForm();
            return;
        }

        setIsLoading(true);
        animateButtonPress();

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        Alert.alert(
            "Password Reset Successful!",
            "Your password has been updated successfully. You can now login with your new password.",
            [
                {
                    text: "Continue to Login",
                    onPress: () => {
                        router.replace("/login");
                    }
                }
            ]
        );

        setIsLoading(false);
    };

    const toggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleBack = () => {
        router.back();
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
                    onPress={handleBack}
                >
                    <Ionicons name="arrow-back" size={24} color="#007AFF" />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                        <Ionicons name="lock-closed" size={32} color="#007AFF" />
                    </View>
                </View>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>Create a new strong password</Text>
                {userEmail && (
                    <Text style={styles.userEmail}>for {userEmail}</Text>
                )}
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
                        {/* Old Password Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={focusedInput === 'oldPassword' ? "#007AFF" : "#666"}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                placeholder="Enter old password"
                                placeholderTextColor="#999"
                                style={[
                                    styles.input,
                                    focusedInput === 'oldPassword' && styles.inputFocused
                                ]}
                                secureTextEntry={!showOldPassword}
                                value={formData.oldPassword}
                                onChangeText={(value) => handleInputChange('oldPassword', value)}
                                onFocus={() => setFocusedInput('oldPassword')}
                                onBlur={() => setFocusedInput(null)}
                            />
                            <TouchableOpacity
                                style={styles.visibilityIcon}
                                onPress={toggleOldPasswordVisibility}
                            >
                                <Ionicons
                                    name={showOldPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* New Password Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={focusedInput === 'newPassword' ? "#007AFF" : "#666"}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                placeholder="Enter new password"
                                placeholderTextColor="#999"
                                style={[
                                    styles.input,
                                    focusedInput === 'newPassword' && styles.inputFocused
                                ]}
                                secureTextEntry={!showNewPassword}
                                value={formData.newPassword}
                                onChangeText={(value) => handleInputChange('newPassword', value)}
                                onFocus={() => setFocusedInput('newPassword')}
                                onBlur={() => setFocusedInput(null)}
                            />
                            <TouchableOpacity
                                style={styles.visibilityIcon}
                                onPress={toggleNewPasswordVisibility}
                            >
                                <Ionicons
                                    name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Confirm Password Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={focusedInput === 'confirmPassword' ? "#007AFF" : "#666"}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                placeholder="Confirm new password"
                                placeholderTextColor="#999"
                                style={[
                                    styles.input,
                                    focusedInput === 'confirmPassword' && styles.inputFocused
                                ]}
                                secureTextEntry={!showConfirmPassword}
                                value={formData.confirmPassword}
                                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                                onFocus={() => setFocusedInput('confirmPassword')}
                                onBlur={() => setFocusedInput(null)}
                            />
                            <TouchableOpacity
                                style={styles.visibilityIcon}
                                onPress={toggleConfirmPasswordVisibility}
                            >
                                <Ionicons
                                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Password Requirements */}
                        <View style={styles.requirementsContainer}>
                            <Text style={styles.requirementsTitle}>Password Requirements:</Text>
                            <View style={styles.requirementItem}>
                                <Ionicons
                                    name={formData.newPassword.length >= 6 ? "checkmark-circle" : "ellipse-outline"}
                                    size={16}
                                    color={formData.newPassword.length >= 6 ? "#10B981" : "#718096"}
                                />
                                <Text style={styles.requirementText}>At least 6 characters long</Text>
                            </View>
                            <View style={styles.requirementItem}>
                                <Ionicons
                                    name={formData.newPassword !== formData.oldPassword && formData.oldPassword ? "checkmark-circle" : "ellipse-outline"}
                                    size={16}
                                    color={formData.newPassword !== formData.oldPassword && formData.oldPassword ? "#10B981" : "#718096"}
                                />
                                <Text style={styles.requirementText}>Different from old password</Text>
                            </View>
                            <View style={styles.requirementItem}>
                                <Ionicons
                                    name={formData.newPassword === formData.confirmPassword && formData.newPassword ? "checkmark-circle" : "ellipse-outline"}
                                    size={16}
                                    color={formData.newPassword === formData.confirmPassword && formData.newPassword ? "#10B981" : "#718096"}
                                />
                                <Text style={styles.requirementText}>Passwords match</Text>
                            </View>
                        </View>

                        {/* Reset Password Button */}
                        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    isLoading && styles.buttonDisabled
                                ]}
                                onPress={handleResetPassword}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <View style={styles.loadingContainer}>
                                        <Ionicons name="refresh" size={20} color="#fff" />
                                        <Text style={styles.buttonText}>Updating Password...</Text>
                                    </View>
                                ) : (
                                    <View style={styles.buttonContent}>
                                        <Text style={styles.buttonText}>Reset Password</Text>
                                        <Ionicons name="checkmark-circle" size={20} color="#fff" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </Animated.View>
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
        marginTop: 50,
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
    userEmail: {
        fontSize: 14,
        color: "#007AFF",
        fontWeight: "600",
        marginTop: 4,
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
    requirementsContainer: {
        backgroundColor: '#F7FAFC',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    requirementsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 12,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    requirementText: {
        fontSize: 13,
        color: '#4A5568',
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
});