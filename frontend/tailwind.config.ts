import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "error": "#ffb4ab",
        "tertiary-container": "#d164e2",
        "on-tertiary": "#570067",
        "on-primary-fixed-variant": "#6900b3",
        "on-tertiary-fixed": "#350040",
        "tertiary-fixed": "#ffd6ff",
        "primary-container": "#b76dff",
        "secondary": "#adc6ff",
        "surface-container-lowest": "#060e20",
        "on-primary-fixed": "#2c0051",
        "on-secondary-fixed-variant": "#004395",
        "secondary-fixed": "#d8e2ff",
        "on-background": "#dae2fd",
        "on-tertiary-fixed-variant": "#7b0190",
        "surface-container-low": "#131b2e",
        "surface-container-high": "#222a3d",
        "on-secondary": "#002e6a",
        "surface-tint": "#ddb7ff",
        "outline-variant": "#4d4354",
        "on-tertiary-container": "#4c005a",
        "surface-bright": "#31394d",
        "on-primary": "#490080",
        "surface-container-highest": "#2d3449",
        "secondary-fixed-dim": "#adc6ff",
        "on-error": "#690005",
        "tertiary": "#f8acff",
        "on-secondary-container": "#e6ecff",
        "surface": "#0b1326",
        "surface-variant": "#2d3449",
        "inverse-primary": "#842bd2",
        "outline": "#988d9f",
        "inverse-on-surface": "#283044",
        "primary-fixed": "#f0dbff",
        "on-surface-variant": "#cfc2d6",
        "on-error-container": "#ffdad6",
        "surface-dim": "#0b1326",
        "primary": "#ddb7ff",
        "surface-container": "#171f33",
        "on-secondary-fixed": "#001a42",
        "secondary-container": "#0566d9",
        "inverse-surface": "#dae2fd",
        "on-surface": "#dae2fd",
        "primary-fixed-dim": "#ddb7ff",
        "on-primary-container": "#400071",
        "background": "#0b1326",
        "tertiary-fixed-dim": "#f8acff",
        "error-container": "#93000a"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "base": "8px",
        "xs": "4px",
        "gutter": "24px",
        "sm": "12px",
        "md": "24px",
        "margin-desktop": "64px",
        "margin-mobile": "16px",
        "xl": "80px",
        "lg": "48px"
      },
      fontFamily: {
        "label-md": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
        "body-lg": ["Plus Jakarta Sans", "sans-serif"],
        "headline-md": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg-mobile": ["Plus Jakarta Sans", "sans-serif"],
        "display-lg": ["Plus Jakarta Sans", "sans-serif"],
        "body-md": ["Plus Jakarta Sans", "sans-serif"]
      },
      fontSize: {
        "label-md": ["14px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "headline-lg-mobile": ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }]
      }
    },
  },
  plugins: [],
};

export default config;
