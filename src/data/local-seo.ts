/**
 * Données NAP et SEO local (une seule source pour Schema.org et métadonnées).
 * Mettre à jour ici en cas de changement d’adresse, de téléphone ou de zone desservie.
 */
export const LOCAL_BUSINESS = {
  name: "Emma Rouché",
  title: "Psychologue clinicienne",
  telephoneE164: "+33783427684",
  email: "erouche-psycho34@outlook.fr",
  streetAddress: "25 avenue Aristide Briand, Bâtiment B",
  addressLocality: "Castelnau-le-Lez",
  postalCode: "34170",
  addressRegion: "Occitanie",
  addressCountry: "FR",
  latitude: 43.6297177,
  longitude: 3.8980905999999322,
  /** Villes d’accroche (aligné sur le pied de page) */
  areaServedCities: [
    "Montpellier",
    "Le Crès",
    "Vendargues",
    "Clapiers",
    "Montferrier-sur-Lez",
    "Prades-le-Lez",
    "Saint-Clément-de-Rivière",
    "Jacou",
    "Lunel",
    "Castries",
    "Castelnau-le-Lez",
  ],
} as const;

export function googleMapsSearchUrl(): string {
  const q = `${LOCAL_BUSINESS.streetAddress}, ${LOCAL_BUSINESS.postalCode} ${LOCAL_BUSINESS.addressLocality}, France`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

/** Graph JSON-LD : WebSite + Psychologist (cabinet local) */
export function getLocalSeoJsonLd(siteOrigin: string): Record<string, unknown> {
  const origin = siteOrigin.replace(/\/$/, "");
  const image = `${origin}/images/cab-ext-2.jpg`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: `${LOCAL_BUSINESS.name} — ${LOCAL_BUSINESS.title}`,
        description:
          "Cabinet de psychologie à Castelnau-le-Lez, près de Montpellier : psychothérapies adultes, enfants et adolescents, bilans psychologiques et soutien parental.",
        inLanguage: "fr-FR",
        publisher: { "@id": `${origin}/#psychologist` },
      },
      {
        "@type": "Psychologist",
        "@id": `${origin}/#psychologist`,
        name: LOCAL_BUSINESS.name,
        description: LOCAL_BUSINESS.title,
        url: `${origin}/`,
        telephone: LOCAL_BUSINESS.telephoneE164,
        email: LOCAL_BUSINESS.email,
        image,
        hasMap: googleMapsSearchUrl(),
        address: {
          "@type": "PostalAddress",
          streetAddress: LOCAL_BUSINESS.streetAddress,
          addressLocality: LOCAL_BUSINESS.addressLocality,
          postalCode: LOCAL_BUSINESS.postalCode,
          addressRegion: LOCAL_BUSINESS.addressRegion,
          addressCountry: LOCAL_BUSINESS.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: LOCAL_BUSINESS.latitude,
          longitude: LOCAL_BUSINESS.longitude,
        },
        areaServed: LOCAL_BUSINESS.areaServedCities.map((name) => ({
          "@type": "City",
          name,
        })),
      },
    ],
  };
}
