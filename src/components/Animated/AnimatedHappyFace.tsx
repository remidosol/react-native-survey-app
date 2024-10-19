import React from "react";
import { Animated } from "react-native";
import Svg, { Path } from "react-native-svg";
import { CommonSliderSvgAnimatedProps } from "../../types/props";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const HappyFaceAnimated: React.FC<CommonSliderSvgAnimatedProps> = ({ sliderValue }) => {
  const animatedValue = new Animated.Value(sliderValue);

  const mouthPath = animatedValue.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [
      "M119.112 131.453C117.618 131.453 116.216 130.536 115.668 129.052...", // Sad face
      "M119.112 122.453C117.618 122.453 116.216 121.536 115.668 120.052...", // Neutral face
      "M119.112 114.453C117.618 114.453 116.216 113.536 115.668 112.052...", // Happy face
    ],
  });

  return (
    <Svg width='184' height='184' viewBox='0 0 184 184' fill='none'>
      {/* Base Face */}
      <Path
        d='M137.112 46.6696C162.094 71.6632 162.094 112.186 137.112 137.18C112.131 162.173 71.6282 162.173 46.6467 137.18C21.6653 112.186 21.6653 71.6632 46.6467 46.6696C71.6282 21.6759 112.131 21.6759 137.112 46.6696Z'
        stroke='#0300A3'
        strokeWidth='2'
      />
      {/* Animated Mouth */}
      <AnimatedPath d={mouthPath} fill='#0300A3' />
      {/* Eyes */}
      <Path
        d='M66.6103 83.668C70.403 83.668 73.4776 80.5919 73.4776 76.7973C73.4776 73.0027 70.403 69.9266 66.6103 69.9266C62.8176 69.9266 59.743 73.0027 59.743 76.7973C59.743 80.5919 62.8176 83.668 66.6103 83.668Z'
        fill='#0300A3'
      />
      <Path
        d='M117.055 83.668C120.848 83.668 123.922 80.5919 123.922 76.7973C123.922 73.0027 120.848 69.9266 117.055 69.9266C113.262 69.9266 110.188 73.0027 110.188 76.7973C110.188 80.5919 113.262 83.668 117.055 83.668Z'
        fill='#0300A3'
      />
    </Svg>
  );
};

export default HappyFaceAnimated;
