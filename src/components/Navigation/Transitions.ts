import { Animated, Easing } from 'react-native';

const noAnimation = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0,
  },
});

export const Transitions = {
  noAnimation,
};
