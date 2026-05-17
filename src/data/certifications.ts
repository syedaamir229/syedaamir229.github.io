export interface ActiveCertification {
  name: string;
  issuer: string;
  url: string;
  badge: string;
}

export const ACTIVE_CERTS: ActiveCertification[] = [
  {
    name: 'Databricks Certified Machine Learning Engineer Associate',
    issuer: 'Databricks',
    url: 'https://www.credential.net/02673050-d7f1-49b7-8d03-bcc16338a81d',
    badge: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/163794950',
  },
  {
    name: 'Databricks Certified Generative AI Engineer Associate',
    issuer: 'Databricks',
    url: 'https://www.credential.net/1d1f551d-7128-45d6-8677-8cf949102440',
    badge: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/159431643',
  },
  {
    name: 'Databricks Certified Data Analyst Associate',
    issuer: 'Databricks',
    url: 'https://www.credential.net/db3174aa-8703-4e9d-8e55-60737ecafd44',
    badge: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/157099023',
  },
  {
    name: 'Azure Data Fundamentals (DP-900)',
    issuer: 'Microsoft',
    url: 'https://www.credly.com/badges/e38119d9-5d32-4857-aa05-150e6dd5e23f',
    badge: 'https://images.credly.com/size/680x680/images/70eb1e3f-d4de-4377-a062-b20fb29594ea/azure-data-fundamentals-600x600.png',
  },
  {
    name: 'Tableau Desktop Specialist',
    issuer: 'Tableau',
    url: 'https://www.credly.com/badges/1e24ad00-28b1-4501-b8fb-e9d2b860a29f',
    badge: 'https://images.credly.com/size/680x680/images/ef3e7933-f1f1-4bba-9b10-f278188c72ad/image.png',
  },
];

export const PAST_CERTS: string[] = [
  'Predictive Analytics for Business - Udacity (2020)',
  'Tableau Certified Associate Consultant (2020)',
  'Alteryx Designer Core (2020)',
  'Tableau Desktop Certified Associate (2019)',
  'Tableau Desktop Qualified Associate (2018)',
  'Tableau Partner Sales Accreditation (2018)',
];
