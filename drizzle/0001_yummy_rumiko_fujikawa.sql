ALTER TABLE "institutions" RENAME COLUMN "institution_code" TO "code";--> statement-breakpoint
ALTER TABLE "institutions" RENAME COLUMN "institution_name" TO "name";--> statement-breakpoint
ALTER TABLE "institutions" DROP CONSTRAINT "institutions_institution_code_unique";--> statement-breakpoint
ALTER TABLE "countries" ALTER COLUMN "code" SET DATA TYPE varchar(4);--> statement-breakpoint
ALTER TABLE "institutions" ADD CONSTRAINT "institutions_code_unique" UNIQUE("code");