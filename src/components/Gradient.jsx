import { LinearGradient } from "expo-linear-gradient";


const gradientColors = ["hsla(262, 52%, 47%, 1)", "hsla(252, 78%, 60%, 1)"]; // These colors should be adjusted to match the actual gradient in the image.

export const Gradient = ({ children }) => (
  <LinearGradient
    colors={gradientColors}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{ flex: 1, borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}
  >
    {children}
  </LinearGradient>
);
