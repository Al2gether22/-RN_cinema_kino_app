import React, { useEffect, useState, useRef, version } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, TouchableHighlight, } from "react-native";
import _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "../shared/DatePicker";
import MovieModal from "../../modals/MovieModal";
import WebViewModal from "../../modals/WebViewModal"
import MovieVersionLookup from "../../components/shared/MovieVersionLookup"
import styles from "../../styles/ShowTimeStyles";
import moment from "moment";
import { scrollToIndex } from "../../helpers/datepicker.utils";

//We need versions, they are inside item.versions
const now = moment();

const ShowTimes = ({ id, movieVersions }) => {
  const datePickerRef = useRef();
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(now);
  const [movieModalVisible, setMovieModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [movieId, setMovieId] = useState();
  const [showtimeId, setShowtimeId] = useState();
  // These should be removed after user component is implemented
  const [sessionName, setSessionName] = useState("")  
  const [sessionId, setSessionId] = useState("") 
  const [versions, setVersions] = useState("")

  // Find a way to get user with the fetch user component
  useEffect(() => {
    AsyncStorage.getItem("user").then((value) => {
      const userJson = JSON.parse(value);
      setSessionName(userJson.session_name);
      setSessionId(userJson.session_id);
    });
  }, []);

  useEffect(() => {
    const url = `https://www.kino.dk/appservices/cinema/${
      id
    }/${selectedDate.format("YYYY-MM-DD")}`;
    fetch(url, { mode: "no-cors" })
      .then((response) => response.json())
      .then((json) => {
        setShowtimes(groupByVersion(json))
      })
      
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [selectedDate]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }
  

  // Groups showtimes by version
  function groupByVersion(arr1) {

    for (let element of arr1) {
      element.showtimes = _.groupBy(element.showtimes, "movie_version_id");
    }

    return arr1;
  }

  return (
    <View style={styles.container}>
      <MovieModal
        movieModalVisible={movieModalVisible}
        setMovieModalVisible={() => setMovieModalVisible(false)}
        movieId={movieId}
      />

      <WebViewModal
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(false)}
        url={`https://kino.dk/ticketflow/${showtimeId}`}
        cookieName={sessionName}
        cookieValue={sessionId}
      />
      

      <DatePicker
        scrollToIndex={scrollToIndex}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        ref={datePickerRef}
      />

      {showtimes.length === 0 ? (
        <View style={styles.noShowtimesContainer}>
          <Text style={styles.sectionHeader}>
            Der er ingen spilletider på den valgte dato
          </Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(index) => index.toString()}
          data={showtimes}
          extraData={selectedDate}
          renderItem={({ item }) => (
            <View style={styles.movieShowTimeContainer}>
              {setVersions(item.versions)}
              <TouchableHighlight
                onPress={() => {
                  setMovieModalVisible(true), setMovieId(item.movie_id);
                }}
              >
                <View style={styles.moviePosterContainer}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.poster}
                  />
                </View>
              </TouchableHighlight>

              <View>
                <Text style={styles.sectionHeader}>{item.danishTitle}</Text>

              <FlatList
              // Here each showtime pr cinema is rendered
              keyExtractor={(item, index) => index.toString()}
              data={Object.values(item.showtimes)}
              //data={Object.entries(item.showtimes)}?
              numColumns={1}
              renderItem={({ item }) => (
                <View style={styles.showTimeContainer}>
                  <Text style={styles.showtimeVersionLabel}>
                    {Object(versions[item[0].movie_version_id])["version_name"]}    
                  </Text>
                  <FlatList
                    //keyExtractor={(item) => item.showtimes.id}
                    keyExtractor={(item, index) => index.toString()}
                    data={Object.values(item)}
                    numColumns={4}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => [
                          setModalVisible(true),
                          setShowtimeId(item.showtime_id),
                        ]}
                        style={styles.showTime}
                      >
                        <Text style={styles.showTimeText}>
                          {item.start_time.slice(11, 16)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ShowTimes;
