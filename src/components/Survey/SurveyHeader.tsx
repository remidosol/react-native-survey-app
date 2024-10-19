import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated } from "react-native";
import { Text, ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { formatTime } from "../../utils/functions";

const { width } = Dimensions.get("window");

interface SurveyHeaderProps {
  timeLeft: number;
  totalTime: number;
  progress: number;
  onHomePress: () => void;
}

const SurveyHeader: React.FC<SurveyHeaderProps> = ({ timeLeft, totalTime, progress, onHomePress }) => {
  const pointerAnimation = new Animated.Value(timeLeft);

  useEffect(() => {
    Animated.timing(pointerAnimation, {
      toValue: timeLeft,
      duration: 1,
      useNativeDriver: true,
    }).start();
  }, [timeLeft]);

  const rotateInterpolation = pointerAnimation.interpolate({
    inputRange: [0, timeLeft / totalTime / 2],
    outputRange: ["-90deg", "90deg"],
  });

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.homeIcon} onPress={onHomePress}>
        <Ionicons name='home' size={28} color='#fff' />
      </TouchableOpacity>

      <View style={styles.timerContainer}>
        <AnimatedCircularProgress
          size={80}
          width={8}
          fill={(timeLeft / totalTime) * 100}
          tintColor='#ffffff'
          backgroundColor='rgba(255, 255, 255, 0.3)'
          rotation={-90}
          lineCap='round'
        >
          {(fill) => (
            <>
              <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
              <Animated.View
                style={[
                  styles.pointerContainer,
                  {
                    transform: [
                      {
                        rotate: rotateInterpolation,
                      },
                    ],
                  },
                ]}
              >
                <Ionicons name='radio-button-on' size={24} color='#ffffff' />
              </Animated.View>
            </>
          )}
        </AnimatedCircularProgress>
      </View>

      <View style={styles.questionProgressBarContainer}>
        <Text style={styles.questionProgressBarText}>Anket Konu Başlığı</Text>
        <ProgressBar
          indeterminate={false}
          progress={progress}
          color='#fff'
          style={styles.questionProgressBar}
          fillStyle={{}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "#0300A3",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 110,
    paddingBottom: 20,
    alignItems: "center",
    // position: "relative",
  },
  homeIcon: {
    position: "absolute",
    left: 20,
    top: 40,
  },
  timerContainer: {
    position: "absolute",
    right: 20,
    top: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: "center",
  },
  questionProgressBarContainer: {
    alignContent: "flex-start",
    marginTop: 60,
  },
  questionProgressBar: {
    marginBottom: 20,
    width: width - 40,
    height: 5,
  },
  questionProgressBarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 8,
  },
  pointerContainer: {
    position: "absolute",
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SurveyHeader;
