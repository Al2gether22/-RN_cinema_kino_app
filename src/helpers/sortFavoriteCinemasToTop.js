function sortFavoritesToTop(cinemas, favoriteCinemas) {
  if (!favoriteCinemas) return cinemas;
  cinemas.sort(function(a, b) {
    return favoriteCinemas.includes(a.id)
      ? -1
      : favoriteCinemas.includes(b.id)
      ? 1
      : 0;
  });
  return cinemas;
}

export default sortFavoritesToTop;
