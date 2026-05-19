import { SITE, SOCIAL } from '../config';
import { PERSON_EXTRAS } from '../data/person';

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: SITE.url,
    sameAs: [SOCIAL.linkedin, SOCIAL.tableau],
    jobTitle: SITE.title,
    address: {
      '@type': 'PostalAddress',
      ...PERSON_EXTRAS.address,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      ...PERSON_EXTRAS.alumniOf,
    },
    knowsAbout: PERSON_EXTRAS.knowsAbout,
  };
}
