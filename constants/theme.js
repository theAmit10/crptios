const COLORS = {
  // primary: "#312651",
  // secondary: "#444262",
  tertiary: "#FF7754",

  gray: "#83829A",
  gray2: "#C1C0C8",
  lightGray: "#EDEDEE",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",

  purpleDark: "#080911",
  purple: "#161724",
  red: "#FF4A5C",
  green: "#00ba87",
  skyBlue: "#152733",
  orange: "FF810D",

  // light
  title: "#20212D",
  text: "#909090",
  background: "#FCFBFC",
  card: "#fff",
  border: "#eee",

  // dark
  darkTitle : "#20212D",
  darkText: "rgba(255,255,255,.6)",
  darkBackground: "#080912",
  darkCard: "#161724",
  darkBorder: "#252739",

  primary: "#00BA87",
  primaryLight: "rgba(0,186,135,.15)",
  secondary: "#090A15",
  success: "#0ecb81",
  danger: "#ff4a5c",
  info: "#627EEA",
  warning: "#ffb02c",
  yellow: "#fff346",
  white: "#fff",
  dark: "#2f2f2f",
  light: "#E6E6E6" 


  

};

const FONT = {
  regular: "Jost-Regular",
  medium: "Jost-Medium",
  bold: "Jost-Bold",
  semibold: "Jost-SemiBold",
  extrabold: "Jost-ExtraBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
