function searchScore(item, search) {
  var score = 0;

  // 100 points for exact matches
  if (
    search.toLowerCase() === item.name.toLowerCase()
    || search.toLowerCase() === item.number.toLowerCase()
  ) {
    score += 100;
  }

  return score;
}

module.exports = searchScore;
