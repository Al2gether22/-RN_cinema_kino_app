import React from "react";
import { View } from "react-native"
import HTML from "react-native-render-html";
import { IGNORED_TAGS } from 'react-native-render-html';
import styles from "../../styles/MovieResumeStyles";


const MovieMetaData = ({ resume, primaryFontColor, active }) => {



  return (
    !resume ? null : 
    
    <View style={[styles.movieReviewContainer, { display: active }]}>
      <HTML 
        source={{ html: resume }} 
        ignoredTags={[ ...IGNORED_TAGS]}
        tagsStyles={{ p: { color: primaryFontColor, fontFamily: "SourceSansPro-Bold", fontSize: 18, }, a: { color: primaryFontColor, fontFamily: "SourceSansPro-Bold", fontSize: 18, textDecorationLine: "none" } }}
        onLinkPress={() => null}
      />
    </View>
  )
}


export default MovieMetaData;