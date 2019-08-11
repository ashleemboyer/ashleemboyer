import Typography from "typography"

const typography = new Typography({
  googleFonts: [
    {
      name: "Lora",
      styles: ["700b"],
    },
    {
      name: "Open Sans",
      styles: ["400", "400i"],
    },
  ],
  headerFontFamily: ["Lora", "serif"],
  bodyFontFamily: ["Open Sans", "sans-serif"],
})

export default typography
export const rhythm = typography.rhythm
