import { bigint, integer, pgTable, smallint, timestamp, unique, uuid, varchar } from 'drizzle-orm/pg-core';

export const TaxonStatus = ['NV', 'PN', 'IN', 'EX', 'UNK'] as const;

// WorkGroups / Kelompok Kerja
export const WorkGroups = pgTable('work_groups', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  workGroupNumber: varchar('work_group_number', { length: 10 }).notNull(), // e.g., "405"
  workGroupName: varchar('work_group_name', { length: 100 }).notNull(),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// Datasets / Kelompok Taksa
export const Datasets = pgTable('datasets', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  publicId: uuid('public_id').notNull(), // use uuidv7
  datasetNumber: varchar('dataset_number', { length: 3 }).notNull(), // e.g., "001"
  name: varchar('name', { length: 100 }).notNull(),
  metadata: varchar('metadata'),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// Kingdoms
export const Kingdoms = pgTable('kingdoms', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// Kingdoms -> Phyla
export const Phyla = pgTable('phyla', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  kingdomId: bigint('kingdom_id', { mode: 'bigint' }).notNull().references(() => Kingdoms.id),
  name: varchar('name', { length: 50 }).notNull(),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// PhyloGroups, references Phyla
export const PhyloGroups = pgTable('phylo_groups', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  phylumId: bigint('phylum_id', { mode: 'bigint' }).notNull().references(() => Phyla.id),
  name: varchar('name', { length: 50 }).notNull(), // e.g., "Placentalia"
  sort: smallint('sort'), // e.g., 3 (nullable, optional sorting)
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true })
});

// Kingdoms -> Phyla -> Classes
export const Classes = pgTable('classes', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  phylumId: bigint('phylum_id', { mode: 'bigint' }).notNull().references(() => Phyla.id),
  name: varchar('name', { length: 50 }).notNull(),
  phyloGroupId: bigint('phylo_group_id', { mode: 'bigint' }).references(() => PhyloGroups.id), // Nullable, optional
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// Kingdoms -> Phyla -> Classes -> Orders
export const Orders = pgTable('orders', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  classId: bigint('class_id', { mode: 'bigint' }).notNull().references(() => Classes.id),
  name: varchar('name', { length: 50 }).notNull(),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// Kingdoms -> Phyla -> Classes -> Families
export const Families = pgTable('families', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  orderId: bigint('order_id', { mode: 'bigint' }).notNull().references(() => Orders.id),
  name: varchar('name', { length: 50 }).notNull(),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// Kingdoms -> Phyla -> Classes -> Families -> Genera
export const Genera = pgTable('genera', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  familyId: bigint('family_id', { mode: 'bigint' }).notNull().references(() => Families.id),
  name: varchar('name', { length: 50 }).notNull(),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// Kingdoms -> Phyla -> Classes -> Families -> Genera -> Species
export const Species = pgTable('species', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  genusId: bigint('genus_id', { mode: 'bigint' }).notNull().references(() => Genera.id),
  name: varchar('name', { length: 100 }).notNull(), // Full binomial, e.g., "Bunomys coelestis"
  originalName: varchar('original_name', { length: 50 }), // e.g., "Mus coelestis"
  scientificNameAuthorship: varchar('scientific_name_authorship', { length: 255 }), // e.g., "Thomas, 1896"
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// Taxa
export const Taxa = pgTable('taxa', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  publicId: varchar('public_id', { length: 20 }).notNull(),
  datasetId: bigint('dataset_id', { mode: 'bigint' }).notNull().references(() => Datasets.id),
  speciesId: bigint('species_id', { mode: 'bigint' }).notNull().references(() => Species.id),
  recognitionBasedOn: varchar('recognition_based_on', { length: 255 }),
  taxonRank: varchar('taxon_rank', { length: 10 }).default('species'), // Default to 1 : species
  iucnStatus: varchar('iucn_status', { length: 5 }),
  citesStatus: integer('cites_status'),
  speciesNumber: varchar('species_number', { length: 4 }), // e.g., "0001", will concatenate with datasetNumber + workGroupNumber
  taxonomicRemarksEnUs: varchar('taxonomic_remarks_en_us'),
  taxonomicRemarksId: varchar('taxonomic_remarks_id'),
  additionalRemarksEnUs: varchar('additional_remarks_en_us'),
  additionalRemarksId: varchar('additional_remarks_id'),
  keyCharactersEnUs: varchar('key_characters_en_us'),
  keyCharactersId: varchar('key_characters_id'),
  characterRemarksEnUs: varchar('character_remarks_en_us'),
  characterRemarksId: varchar('character_remarks_id'),
  habitatRemarksEnUs: varchar('habitat_remarks_en_us'),
  habitatRemarksId: varchar('habitat_remarks_id'),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// CommonNames
export const CommonNames = pgTable('common_names', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  taxonId: bigint('taxon_id', { mode: 'bigint' }).notNull().references(() => Taxa.id),
  languageCode: varchar('language_code', { length: 5 }).notNull(), // ISO 639-1
  nameType: varchar('name_type', { length: 10 }).notNull(), // e.g., "main", "other"
  nameValue: varchar('name_value', { length: 255 }).notNull(),
  remarks: varchar('remarks'), // Language-specific via `language` field
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// AdminUnits
export const AdminUnits = pgTable('admin_units', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  level: varchar('level', { length: 20 }).notNull(), // e.g., "province", "regency", "district"
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// Distributions
export const Distributions = pgTable('distributions', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  taxonId: bigint('taxon_id', { mode: 'bigint' }).notNull().references(() => Taxa.id),
  nativeLocalDistributionId: bigint('native_local_distribution_id', { mode: 'bigint' }).references(() => AdminUnits.id),
  introducedLocalDistributionId: bigint('introduced_local_distribution_id', { mode: 'bigint' }).references(() => AdminUnits.id),
  status: varchar('status', { length: 5, enum: TaxonStatus }).notNull(),
  remarksEnUs: varchar('remarks_en_us'),
  remarksId: varchar('remarks_id'),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// Media
export const Media = pgTable('media', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  taxonId: bigint('taxon_id', { mode: 'bigint' }).notNull().references(() => Taxa.id),
  mediaType: varchar('media_type', { length: 20 }).notNull(),
  filePath: varchar('file_path'),
  copyright: varchar('copyright'),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// Countries
export const Countries = pgTable('countries', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  code: varchar('code', { length: 4 }).notNull(), // ISO 3166-1 alpha-2
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// Relation Taxa - Countries
export const TaxaCountries = pgTable('taxa_countries', {
  taxonId: bigint('taxon_id', { mode: 'bigint' }).notNull().references(() => Taxa.id),
  countryId: bigint('country_id', { mode: 'bigint' }).notNull().references(() => Countries.id),
  status: varchar('status', { length: 5, enum: TaxonStatus }), // Can overwrite Taxa
  countryStatus: varchar('country_status', { length: 100 }), // e.g., "Tidak dilindungi (unprotected)"
  countryStatusReference: varchar('country_status_reference', { length: 100 }), // e.g., "Indonesia:UU No. 5 Tahun 1990"
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
}, (table) => [
  unique().on(table.taxonId, table.countryId), // No duplicate taxon-country pairs
]);

// Contributors
export const Contributors = pgTable('contributors', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  orcId: varchar('orcid', { length: 32 }),
  contact: varchar('contact', { length: 100 }),
}, (table) => [
  unique().on(table.orcId), // No duplicate contributor pairs
]);

// Relation Taxa - Contributors
export const TaxaContributors = pgTable('taxa_contributors', {
  taxonId: bigint('taxon_id', { mode: 'bigint' }).notNull().references(() => Taxa.id),
  contributorId: bigint('contributor_id', { mode: 'bigint' }).notNull().references(() => Contributors.id),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
}, (table) => [
  unique().on(table.taxonId, table.contributorId), // No duplicate taxon-contributor pairs
]);

// References
export const References = pgTable('references', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  taxonId: bigint('taxon_id', { mode: 'bigint' }).notNull().references(() => Taxa.id),
  uri: varchar('uri'), // e.g., "[1] https://doi.org/10.1645/19-136"
  externalIdentifier: varchar('external_identifier'), // e.g., "mdd:1003513"
  externalUri: varchar('external_uri'),
  associatedData: varchar('associated_data'),
  contributorId: bigint('contributor_id', { mode: 'bigint' }).notNull().references(() => Contributors.id),
  externalAssociatedDataUri: varchar('external_associated_data_uri'),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// Institutions
export const Institutions = pgTable('institutions', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  city: varchar('city', { length: 50 }).notNull(),
  synonym: varchar('synonym'),
  countryId: bigint('country_id', { mode: 'bigint' }).notNull().references(() => Countries.id),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// SpecimenTypes
export const SpecimenTypes = pgTable('specimen_types', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  typeName: varchar('type_name', { length: 20 }).notNull().unique(), // 'holotype', 'paratype', 'neotype', etc
  description: varchar('description').notNull(),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// BiogeographicRegions
export const BiogeographicRegions = pgTable('biogeographic_regions', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  key: varchar('key', { length: 20 }).notNull(), // e.g., "realm", "subregion", "island", "islandGroup", "aOE", "UNK"
  name: varchar('name', { length: 100 }).notNull(), // e.g., "South West Sulawesi"
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
}, (table) => [
  unique().on(table.key, table.name), // Unique key-name pairs
]);

// TaxaBiogeographicRegions
export const TaxaBiogeographicRegions = pgTable('taxa_biogeographic_regions', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  taxonId: bigint('taxon_id', { mode: 'bigint' }).notNull().references(() => Taxa.id),
  regionId: bigint('region_id', { mode: 'bigint' }).notNull().references(() => BiogeographicRegions.id),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
}, (table) => [
  unique().on(table.taxonId, table.regionId), // No duplicate taxon-region pairs
]);

// Specimens
export const Specimens = pgTable('specimens', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  taxonId: bigint('taxon_id', { mode: 'bigint' }).notNull().references(() => Taxa.id),
  specimenTypeId: bigint('specimen_type_id', { mode: 'bigint' }).notNull().references(() => SpecimenTypes.id),
  institutionId: bigint('institution_id', { mode: 'bigint' }).notNull().references(() => Institutions.id),
  voucherNumber: varchar('voucher_number', { length: 255 }), // e.g., "Mamm:1897.1.3.12", will be concatenated with institutionCode and specimenType -> holotype:[BMNH]Mamm:1897.1.3.12
  locality: varchar('locality', { length: 255 }),
  verbatimLocality: varchar('verbatim_locality', { length: 255 }),
  latitude: varchar('latitude', { length: 20 }),
  longitude: varchar('longitude', { length: 20 }),
  elevation: varchar('elevation', { length: 20 }),
  depth: varchar('depth', { length: 20 }),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});

// Symbionts
export const Symbionts = pgTable('symbionts', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  taxonId: bigint('taxon_id', { mode: 'bigint' }).notNull().references(() => Taxa.id),
  relatedTaxonId: bigint('related_taxon_id', { mode: 'bigint' }).references(() => Taxa.id),
  interaction: varchar('interaction', { length: 20 }), //'hasParasite', 'eatenBy', etc
  remarksEnUs: varchar('remarks_en_us'),
  remarksId: varchar('remarks_id'),
  deprecatedAt: timestamp('deprecated_at', { withTimezone: true }),
});
