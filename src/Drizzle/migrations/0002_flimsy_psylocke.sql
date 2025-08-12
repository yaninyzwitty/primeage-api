ALTER TABLE "seller_profiles" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "seller_profiles" ALTER COLUMN "business_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "seller_profiles" ALTER COLUMN "category" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "seller_profiles" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "seller_profiles" ALTER COLUMN "rating" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD COLUMN "location" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD COLUMN "contact_phone" varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD COLUMN "contact_email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD COLUMN "license_number" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD COLUMN "national_id" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD COLUMN "documents_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD COLUMN "verified_at" timestamp;--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD COLUMN "rejected" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD COLUMN "admin_comment" text;