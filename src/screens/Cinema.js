import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native"

import CinemaBackgroundImage from "../components/cinemas/CinemaBackgroundImage"
import CinemaMetaData from "../components/cinemas/CinemaMetaData"
import ShowTimes from "../components/cinemas/ShowTimes";

const Cinema = () => {
  const route = useRoute();
  const [cinema, setCinema] = useState([])
  const [loading, setLoading] = useState(true)

  // fetches cinema data
  useEffect(() => {
    fetch(`https://www.kino.dk/appservices/cinema/${route.params.id}`, {
      mode: "no-cors"
      })
      .then((response) => response.json())
      .then((json) => setCinema(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <>
      <FlatList
        style={styles.container}
        keyExtractor={(index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <CinemaBackgroundImage
              name={route.params.name}
              img={route.params.imageUrl}
            />
            <CinemaMetaData cinema={cinema} />
          </>
        }
        ListFooterComponent={<ShowTimes id={cinema.nid} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#1d1d27",
  },
});

export default Cinema;