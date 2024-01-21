import { LinearGradient } from "expo-linear-gradient";

const gradientColors = ["#42a1ff", "#6949e9"]; // These colors should be adjusted to match the actual gradient in the image.

export const Gradient = ({ children }) => (
  <LinearGradient
  locations={[0.01, 0.4]} // Color stop locations at 1% and 64%
  colors={gradientColors}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style={{ flex: 1, borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}
  >
    {children}
  </LinearGradient>
);
