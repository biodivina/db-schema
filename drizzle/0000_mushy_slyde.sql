CREATE TABLE "admin_units" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"level" varchar(20) NOT NULL,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "biogeographic_regions" (
	"id" bigint PRIMARY KEY NOT NULL,
	"key" varchar(20) NOT NULL,
	"name" varchar(100) NOT NULL,
	"deprecated_at" timestamp with time zone,
	CONSTRAINT "biogeographic_regions_key_name_unique" UNIQUE("key","name")
);
--> statement-breakpoint
CREATE TABLE "classes" (
	"id" bigint PRIMARY KEY NOT NULL,
	"phylum_id" bigint NOT NULL,
	"name" varchar(50) NOT NULL,
	"phylo_group_id" bigint,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "common_names" (
	"id" bigint PRIMARY KEY NOT NULL,
	"taxon_id" bigint NOT NULL,
	"language_code" varchar(5) NOT NULL,
	"name_type" varchar(10) NOT NULL,
	"name_value" varchar(255) NOT NULL,
	"remarks" varchar,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "contributors" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"orcid" varchar(32),
	"contact" varchar(100),
	CONSTRAINT "contributors_orcid_unique" UNIQUE("orcid")
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"code" varchar(2) NOT NULL,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "datasets" (
	"id" bigint PRIMARY KEY NOT NULL,
	"public_id" uuid NOT NULL,
	"dataset_number" varchar(3) NOT NULL,
	"name" varchar(100) NOT NULL,
	"metadata" varchar,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "distributions" (
	"id" bigint PRIMARY KEY NOT NULL,
	"taxon_id" bigint NOT NULL,
	"native_local_distribution_id" bigint,
	"introduced_local_distribution_id" bigint,
	"status" varchar(5) NOT NULL,
	"remarks_en_us" varchar,
	"remarks_id" varchar,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "families" (
	"id" bigint PRIMARY KEY NOT NULL,
	"order_id" bigint NOT NULL,
	"name" varchar(50) NOT NULL,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "genera" (
	"id" bigint PRIMARY KEY NOT NULL,
	"family_id" bigint NOT NULL,
	"name" varchar(50) NOT NULL,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "institutions" (
	"id" bigint PRIMARY KEY NOT NULL,
	"institution_code" varchar(10) NOT NULL,
	"institution_name" varchar(100) NOT NULL,
	"city" varchar(50) NOT NULL,
	"synonym" varchar,
	"country_id" bigint NOT NULL,
	"deprecated_at" timestamp with time zone,
	CONSTRAINT "institutions_institution_code_unique" UNIQUE("institution_code")
);
--> statement-breakpoint
CREATE TABLE "kingdoms" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"deprecated_at" timestamp with time zone,
	CONSTRAINT "kingdoms_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" bigint PRIMARY KEY NOT NULL,
	"taxon_id" bigint NOT NULL,
	"media_type" varchar(20) NOT NULL,
	"file_path" varchar,
	"copyright" varchar,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" bigint PRIMARY KEY NOT NULL,
	"class_id" bigint NOT NULL,
	"name" varchar(50) NOT NULL,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "phyla" (
	"id" bigint PRIMARY KEY NOT NULL,
	"kingdom_id" bigint NOT NULL,
	"name" varchar(50) NOT NULL,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "phylo_groups" (
	"id" bigint PRIMARY KEY NOT NULL,
	"phylum_id" bigint NOT NULL,
	"name" varchar(50) NOT NULL,
	"sort" smallint,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "references" (
	"id" bigint PRIMARY KEY NOT NULL,
	"taxon_id" bigint NOT NULL,
	"uri" varchar,
	"external_identifier" varchar,
	"external_uri" varchar,
	"associated_data" varchar,
	"contributor_id" bigint NOT NULL,
	"external_associated_data_uri" varchar,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "species" (
	"id" bigint PRIMARY KEY NOT NULL,
	"genus_id" bigint NOT NULL,
	"name" varchar(100) NOT NULL,
	"original_name" varchar(50),
	"scientific_name_authorship" varchar(255),
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "specimen_types" (
	"id" bigint PRIMARY KEY NOT NULL,
	"type_name" varchar(20) NOT NULL,
	"description" varchar NOT NULL,
	"deprecated_at" timestamp with time zone,
	CONSTRAINT "specimen_types_type_name_unique" UNIQUE("type_name")
);
--> statement-breakpoint
CREATE TABLE "specimens" (
	"id" bigint PRIMARY KEY NOT NULL,
	"taxon_id" bigint NOT NULL,
	"specimen_type_id" bigint NOT NULL,
	"institution_id" bigint NOT NULL,
	"voucher_number" varchar(255),
	"locality" varchar(255),
	"verbatim_locality" varchar(255),
	"latitude" varchar(20),
	"longitude" varchar(20),
	"elevation" varchar(20),
	"depth" varchar(20),
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "symbionts" (
	"id" bigint PRIMARY KEY NOT NULL,
	"taxon_id" bigint NOT NULL,
	"related_taxon_id" bigint,
	"interaction" varchar(20),
	"remarks_en_us" varchar,
	"remarks_id" varchar,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "taxa" (
	"id" bigint PRIMARY KEY NOT NULL,
	"public_id" varchar(20) NOT NULL,
	"dataset_id" bigint NOT NULL,
	"species_id" bigint NOT NULL,
	"recognition_based_on" varchar(255),
	"taxon_rank" varchar(10) DEFAULT 'species',
	"iucn_status" varchar(5),
	"cites_status" integer,
	"species_number" varchar(4),
	"taxonomic_remarks_en_us" varchar,
	"taxonomic_remarks_id" varchar,
	"additional_remarks_en_us" varchar,
	"additional_remarks_id" varchar,
	"key_characters_en_us" varchar,
	"key_characters_id" varchar,
	"character_remarks_en_us" varchar,
	"character_remarks_id" varchar,
	"habitat_remarks_en_us" varchar,
	"habitat_remarks_id" varchar,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "taxa_biogeographic_regions" (
	"id" bigint PRIMARY KEY NOT NULL,
	"taxon_id" bigint NOT NULL,
	"region_id" bigint NOT NULL,
	"deprecated_at" timestamp with time zone,
	CONSTRAINT "taxa_biogeographic_regions_taxon_id_region_id_unique" UNIQUE("taxon_id","region_id")
);
--> statement-breakpoint
CREATE TABLE "taxa_contributors" (
	"taxon_id" bigint NOT NULL,
	"contributor_id" bigint NOT NULL,
	"deprecated_at" timestamp with time zone,
	CONSTRAINT "taxa_contributors_taxon_id_contributor_id_unique" UNIQUE("taxon_id","contributor_id")
);
--> statement-breakpoint
CREATE TABLE "taxa_countries" (
	"taxon_id" bigint NOT NULL,
	"country_id" bigint NOT NULL,
	"status" varchar(5),
	"country_status" varchar(100),
	"country_status_reference" varchar(100),
	"deprecated_at" timestamp with time zone,
	CONSTRAINT "taxa_countries_taxon_id_country_id_unique" UNIQUE("taxon_id","country_id")
);
--> statement-breakpoint
CREATE TABLE "work_groups" (
	"id" bigint PRIMARY KEY NOT NULL,
	"work_group_number" varchar(10) NOT NULL,
	"work_group_name" varchar(100) NOT NULL,
	"deprecated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_phylum_id_phyla_id_fk" FOREIGN KEY ("phylum_id") REFERENCES "public"."phyla"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_phylo_group_id_phylo_groups_id_fk" FOREIGN KEY ("phylo_group_id") REFERENCES "public"."phylo_groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "common_names" ADD CONSTRAINT "common_names_taxon_id_taxa_id_fk" FOREIGN KEY ("taxon_id") REFERENCES "public"."taxa"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "distributions" ADD CONSTRAINT "distributions_taxon_id_taxa_id_fk" FOREIGN KEY ("taxon_id") REFERENCES "public"."taxa"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "distributions" ADD CONSTRAINT "distributions_native_local_distribution_id_admin_units_id_fk" FOREIGN KEY ("native_local_distribution_id") REFERENCES "public"."admin_units"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "distributions" ADD CONSTRAINT "distributions_introduced_local_distribution_id_admin_units_id_fk" FOREIGN KEY ("introduced_local_distribution_id") REFERENCES "public"."admin_units"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "families" ADD CONSTRAINT "families_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "genera" ADD CONSTRAINT "genera_family_id_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."families"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "institutions" ADD CONSTRAINT "institutions_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_taxon_id_taxa_id_fk" FOREIGN KEY ("taxon_id") REFERENCES "public"."taxa"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "phyla" ADD CONSTRAINT "phyla_kingdom_id_kingdoms_id_fk" FOREIGN KEY ("kingdom_id") REFERENCES "public"."kingdoms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "phylo_groups" ADD CONSTRAINT "phylo_groups_phylum_id_phyla_id_fk" FOREIGN KEY ("phylum_id") REFERENCES "public"."phyla"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "references" ADD CONSTRAINT "references_taxon_id_taxa_id_fk" FOREIGN KEY ("taxon_id") REFERENCES "public"."taxa"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "references" ADD CONSTRAINT "references_contributor_id_contributors_id_fk" FOREIGN KEY ("contributor_id") REFERENCES "public"."contributors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "species" ADD CONSTRAINT "species_genus_id_genera_id_fk" FOREIGN KEY ("genus_id") REFERENCES "public"."genera"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "specimens" ADD CONSTRAINT "specimens_taxon_id_taxa_id_fk" FOREIGN KEY ("taxon_id") REFERENCES "public"."taxa"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "specimens" ADD CONSTRAINT "specimens_specimen_type_id_specimen_types_id_fk" FOREIGN KEY ("specimen_type_id") REFERENCES "public"."specimen_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "specimens" ADD CONSTRAINT "specimens_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "symbionts" ADD CONSTRAINT "symbionts_taxon_id_taxa_id_fk" FOREIGN KEY ("taxon_id") REFERENCES "public"."taxa"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "symbionts" ADD CONSTRAINT "symbionts_related_taxon_id_taxa_id_fk" FOREIGN KEY ("related_taxon_id") REFERENCES "public"."taxa"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "taxa" ADD CONSTRAINT "taxa_dataset_id_datasets_id_fk" FOREIGN KEY ("dataset_id") REFERENCES "public"."datasets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "taxa" ADD CONSTRAINT "taxa_species_id_species_id_fk" FOREIGN KEY ("species_id") REFERENCES "public"."species"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "taxa_biogeographic_regions" ADD CONSTRAINT "taxa_biogeographic_regions_taxon_id_taxa_id_fk" FOREIGN KEY ("taxon_id") REFERENCES "public"."taxa"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "taxa_biogeographic_regions" ADD CONSTRAINT "taxa_biogeographic_regions_region_id_biogeographic_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."biogeographic_regions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "taxa_contributors" ADD CONSTRAINT "taxa_contributors_taxon_id_taxa_id_fk" FOREIGN KEY ("taxon_id") REFERENCES "public"."taxa"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "taxa_contributors" ADD CONSTRAINT "taxa_contributors_contributor_id_contributors_id_fk" FOREIGN KEY ("contributor_id") REFERENCES "public"."contributors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "taxa_countries" ADD CONSTRAINT "taxa_countries_taxon_id_taxa_id_fk" FOREIGN KEY ("taxon_id") REFERENCES "public"."taxa"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "taxa_countries" ADD CONSTRAINT "taxa_countries_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;