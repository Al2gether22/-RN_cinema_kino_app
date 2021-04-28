// This component takes an version id from a showtime, lookup version name and returns the name

const MovieVersionLookup = ({ id, movieVersions }) => {

  const result = movieVersions ? movieVersions.find( ({ version_id }) => parseInt(version_id) === parseInt(id) ) : {id: 0, version_name: ""}
  
  if (result) {
    return (
      result.version_name
    )
  } else {
    return ""
  }
  
}

export default MovieVersionLookup

