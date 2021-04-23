// This component takes an version id from a showtime, lookup version name and returns the name

const MovieVersionLookup = ({ id, movieVersions }) => {

  const result = movieVersions.find( ({ version_id }) => parseInt(version_id) === parseInt(id) );
  
  if (result) {
    return (
      result.version_name
    )
  } else {
    return ""
  }
  
}

export default MovieVersionLookup

