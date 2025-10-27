// Convert API project -> UI project used by your cards/detail
export function adaptProject(api) {
  const priceNum = api?.price ? Number(api.price) : null;

  return {
    id: api.id,
    kind: api.kind || "CARBON OFFSETTING",
    title: api.title,
    country: api.country,
    countryFlag: api.country_flag ?? "",
    price: priceNum ?? 0,
    sdgScore: api.sdg_score ?? (Array.isArray(api.sdgs) ? api.sdgs.length : 0),
    thumb: api.thumb,
    description: api.description ?? "",
    // Detail page keys your UI reads:
    images: Array.isArray(api.images) ? api.images : [],
    sdgs: Array.isArray(api.sdgs) ? api.sdgs : [],
    coords:
      api.lat != null && api.lng != null
        ? { lat: api.lat, lng: api.lng }
        : null, // handle null by hiding map

    // “info” block built from info_* fields
    info: {
      company: api.info_company ?? "-",
      address: api.info_address ?? "-",
      website: api.info_website ?? "",
      blockchain: api.info_blockchain ?? "",
      type: api.info_type ?? "",
      mechanism: api.info_mechanism ?? "",
      characteristics: api.info_characteristics ?? "",
      registry: api.info_registry ?? "",
      registryUrl: api.info_registry_url ?? "",
      validator: api.info_validator ?? "",
      status: api.info_status ?? "",
      creditStart: api.info_credit_start ?? "",
      creditEnd: api.info_credit_end ?? "",
      docs: Array.isArray(api.docs)
        ? api.docs.map((d) => ({
            label: d.label || d.name || "Document",
            url: d.url || d.link || "#",
          }))
        : [],
    },

    // Optional arrays if your UI wants them
    vintages: Array.isArray(api.vintages) ? api.vintages : [],
    impacts: Array.isArray(api.impacts) ? api.impacts : [],
    transactions: Array.isArray(api.transactions) ? api.transactions : [],
    longText: [], // not in API; keep empty to avoid crashes
  };
}
