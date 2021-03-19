import ImageColors from 'react-native-image-colors';

  export const fetchColorsFromImage = async (img) => {

    var imgColors = {}
    
    const colors = await ImageColors.getColors(img, {
      fallback: '#000000',
      quality: 'lowest',
      pixelSpacing: 500,
    })
    
    if (colors.platform === 'android') {
      ImgColors = 
        { backgroundColor: colors.average, 
          primaryFontColor: colors.vibrant,
          secondaryFontColor: colors.darkVibrant
        }
      
      
    } else {
      
      imgColors =
       { backgroundColor: colors.background, 
         primaryFontColor: colors.primary,
         secondaryFontColor: colors.secondary}
      
    }
    
    return (
      colors
    )
    
};

