// prices-db.js — Province-level material price database for TAH Minerals
// Will be populated with data from research agent (34 provinces, post-2025 reform)
// Structure:
//   window.PROVINCES_DB = {
//     "ha-noi": {
//       name: "Hà Nội", isCity: true, region: "north",
//       prices: {
//         sand_concrete: { common: 420000, min: 350000, max: 500000, unit: "₫/m³" },
//         sand_mortar:   { ... }, sand_fill: { ... },
//         rock_1x2: { ... }, rock_2x4: { ... }, rock_4x6: { ... }, rock_riprap: { ... },
//         soil_fill: { ... }, soil_K95: { ... }
//       },
//       fees: { resourceTaxPct: 10, envFeePerM3: 4000, loadingFeePerM3: 18000 },
//       notes: "...",
//       sources: ["https://..."]
//     },
//     ...
//   }

window.PROVINCES_DB = {
  // Placeholder — đang chờ data từ research agent
  // Khi có data, file này sẽ được cập nhật với 34 tỉnh hiện hành
};

// Helper: detect province from latitude/longitude (rough province centroid match)
window.detectProvince = function(lat, lon) {
  let best = null;
  let bestDist = Infinity;
  for (const [slug, p] of Object.entries(window.PROVINCES_DB)) {
    if (typeof p.lat !== 'number' || typeof p.lon !== 'number') continue;
    const dx = (lat - p.lat) * 111;
    const dy = (lon - p.lon) * 111 * Math.cos(lat * Math.PI / 180);
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < bestDist) { bestDist = d; best = slug; }
  }
  return best;
};

// Helper: get common price for a (province, key) pair, fallback to region average if province missing
window.getProvincePrice = function(provinceSlug, materialKey) {
  const p = window.PROVINCES_DB[provinceSlug];
  if (p && p.prices && p.prices[materialKey]) {
    return p.prices[materialKey].common;
  }
  return null;
};
