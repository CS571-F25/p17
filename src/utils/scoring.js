export function scoreDestination(user, dest) {
  let score = 0;

  // Single-select (1 point each)
  // Handle "No Preference" for continent - it matches all
  if (user.continent === 'No Preference' || user.continent === dest.continent) score++;
  if (user.climate === dest.climate) score++;
  if (user.price === dest.price) score++;
  // Handle pace as array in JSON
  const destPace = Array.isArray(dest.pace) ? dest.pace[0] : dest.pace;
  if (user.pace === destPace) score++;

  // Multi-select (1 point per overlap)
  const envMatches = dest.environment.filter(e =>
    user.environment.includes(e)
  ).length;

  const actMatches = dest.activities.filter(a =>
    user.activities.includes(a)
  ).length;

  const seasonMatches = dest.season.filter(s =>
    user.season.includes(s)
  ).length;

  score += envMatches + actMatches + seasonMatches;

  return score;
}

export function getTopMatches(user, all) {
  // Filter by continent and price (required matches)
  let filtered = all.filter(dest => {
    // Continent must match (unless "No Preference")
    const continentMatch = user.continent === 'No Preference' || user.continent === dest.continent;
    
    // Price must match
    const priceMatch = user.price === dest.price;
    
    return continentMatch && priceMatch;
  });

  // If no matches found, return empty array
  if (filtered.length === 0) {
    return [];
  }

  // Score the filtered destinations
  const scored = filtered.map(dest => ({
    ...dest,
    score: scoreDestination(user, dest)
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 3);
}

