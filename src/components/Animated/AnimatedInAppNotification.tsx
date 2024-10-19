import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Text } from "react-native-paper";
import Icon from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import Button from "../Button";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  show: boolean;
}

const InAppNotification: React.FC<NotificationProps> = ({ message, type = "info", duration = 3000, show }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const translateY = useState(new Animated.Value(-100))[0];

  useEffect(() => {
    if (show) {
      showNotification();
    } else {
      hideNotification();
    }
  }, [show]);

  const showNotification = () => {
    setVisible(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(hideNotification, duration);
    });
  };

  const hideNotification = () => {
    Animated.timing(translateY, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  if (!visible) return null;

  const getNotificationStyle = () => {
    switch (type) {
      case "success":
        return styles.success;
      case "error":
        return styles.error;
      default:
        return styles.info;
    }
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }, getNotificationStyle()]}>
      <View style={styles.content}>
        <Icon
          name={type === "success" ? "checkmark-circle" : type === "error" ? "alert-circle" : "information-circle"}
          size={24}
          color='#ffffff'
        />
        <Text style={styles.message}>{message}</Text>
        <Button
          mode='text'
          onPress={hideNotification}
          labelStyle={styles.closeButton}
          style={{ backgroundColor: "#F44336" }}
        >
          {t("close")}
        </Button>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    zIndex: 1000,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F44336",
    borderRadius: 5,
    padding: 10,
  },
  message: {
    flex: 1,
    color: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
  },
  closeButton: {
    color: "#ffffff",
    fontSize: 14,
  },
  success: {
    backgroundColor: "#4CAF50",
  },
  error: {
    backgroundColor: "#F44336",
  },
  info: {
    backgroundColor: "#2196F3",
  },
});

export default InAppNotification;
