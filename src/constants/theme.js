import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    primary: "#FF002E",     // Red
    backgroundColor: "#1d1d27",
    white: "#fff",
    black: "#000000",
    
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 10,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    
    // app dimensions
    width,
    height,

};
export const FONTS = {
    largeTitle: { fontFamily: "BureauGrotComp-Medium", fontSize: SIZES.largeTitle },
    h1: { fontFamily: "SourceSansPro-Bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "SourceSansPro-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "SourceSansPro-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "SourceSansPro-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    h5: { fontFamily: "SourceSansPro-Bold", fontSize: SIZES.h5, lineHeight: 16 },
    body1: { fontFamily: "SourceSansPro-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "SourceSansPro-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "SourceSansPro-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "SourceSansPro-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "SourceSansPro-Regular", fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
