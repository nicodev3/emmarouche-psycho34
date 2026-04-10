/**
 * Données NAP et SEO local (une seule source pour Schema.org et métadonnées).
 * Mettre à jour ici en cas de changement d’adresse, de téléphone ou de zone desservie.
 */
export const LOCAL_BUSINESS = {
  name: "Emma Rouché",
  title: "Psychologue clinicienne",
  telephoneE164: "+33783427684",
  telephoneDisplay: "07 83 42 76 84",
  telephoneHref: "tel:+33783427684",
  email: "erouche-psycho34@outlook.fr",
  emailHref: "mailto:erouche-psycho34@outlook.fr",
  siret: "813 432 531 00016",
  rpps: "10008473406",
  adeli: "34 93 1531 7",
  streetAddress: "25 avenue Aristide Briand, Bâtiment B",
  streetAddressLine1: "25 avenue Aristide Briand",
  streetAddressLine2: "Bâtiment B",
  addressLocality: "Castelnau-le-Lez",
  postalCode: "34170",
  addressRegion: "Occitanie",
  addressCountry: "FR",
  latitude: 43.6297177,
  longitude: 3.8980905999999322,
  scheduleText: "Lundi, mardi, mercredi et samedi matin",
  priceRange: "60 EUR",
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

export interface FaqItem {
  question: string;
  answer: string;
}

export function googleMapsSearchUrl(): string {
  const q = `${LOCAL_BUSINESS.streetAddress}, ${LOCAL_BUSINESS.postalCode} ${LOCAL_BUSINESS.addressLocality}, France`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

/** URL d’intégration (iframe) : pas de clé API, fonctionne en local et en production. */
export function googleMapsIframeEmbedUrl(): string {
  const q = `${LOCAL_BUSINESS.streetAddress}, ${LOCAL_BUSINESS.postalCode} ${LOCAL_BUSINESS.addressLocality}, France`;
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=16&hl=fr&output=embed`;
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
        priceRange: LOCAL_BUSINESS.priceRange,
        paymentAccepted: ["Chèque", "Espèces"],
        currenciesAccepted: "EUR",
        availableLanguage: "fr",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: LOCAL_BUSINESS.telephoneE164,
          email: LOCAL_BUSINESS.email,
          areaServed: "FR-34",
          availableLanguage: "fr",
        },
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
        knowsAbout: [
          "Psychothérapie adultes",
          "Psychothérapie enfants et adolescents",
          "Bilans psychologiques",
          "Soutien parental et familial",
        ],
      },
    ],
  };
}

export function getServiceJsonLd(
  siteOrigin: string,
  {
    name,
    description,
    path,
  }: {
    name: string;
    description: string;
    path: string;
  },
): Record<string, unknown> {
  const origin = siteOrigin.replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: new URL(path, `${origin}/`).href,
    provider: { "@id": `${origin}/#psychologist` },
    areaServed: LOCAL_BUSINESS.areaServedCities.map((city) => ({
      "@type": "City",
      name: city,
    })),
    serviceType: name,
  };
}

export function getFaqJsonLd(_siteOrigin: string, faqs: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
