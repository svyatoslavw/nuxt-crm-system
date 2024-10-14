import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ["Exo", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        ...defaultTheme.colors,
        red: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a"
        },
        green: {
          50: "#EFFDF5",
          100: "#D9FBE8",
          200: "#B3F5D1",
          300: "#75EDAE",
          400: "#00DC82",
          500: "#00C16A",
          600: "#00A155",
          700: "#007F45",
          800: "#016538",
          900: "#0A5331",
          950: "#052e16"
        }
      }
    }
  }
}
