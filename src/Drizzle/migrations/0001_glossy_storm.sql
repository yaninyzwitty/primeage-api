CREATE TYPE "public"."booking_status" AS ENUM('pending', 'confirmed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('mpesa', 'card', 'cash', 'bank');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."seller_category" AS ENUM('material_vendor', 'market_vendor', 'hardware_store', 'furniture_joinery', 'skilled_labor', 'billed_labor', 'showroom', 'niche_seller', 'real_estate_material', 'residual_supplier', 'online_aggregator');--> statement-breakpoint
CREATE TYPE "public"."ticket_status" AS ENUM('open', 'in_progress', 'resolved', 'closed');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin', 'seller');--> statement-breakpoint
CREATE TABLE "CategoriesTable" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "MessagesTable" (
	"message_id" serial PRIMARY KEY NOT NULL,
	"sender_id" integer NOT NULL,
	"receiver_id" integer NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "OrdersTable" (
	"order_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"total_amount" numeric(10, 2),
	"status" "booking_status" DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "PaymentsTable" (
	"payment_id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"amount" numeric(10, 2),
	"payment_status" "payment_status" DEFAULT 'pending',
	"payment_method" "payment_method",
	"transaction_id" varchar(255),
	"payment_date" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ProductsTable" (
	"product_id" serial PRIMARY KEY NOT NULL,
	"seller_profile_id" integer,
	"category_id" integer,
	"name" varchar(255),
	"description" text,
	"price" numeric(10, 2),
	"stock" integer,
	"image_url" varchar(500),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "UsersTable" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar(100),
	"lastname" varchar(100),
	"email" varchar(255),
	"password" varchar(255),
	"contact_phone" varchar(20),
	"address" varchar(255),
	"role" "user_role" DEFAULT 'user',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "UsersTable_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "orders" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "orders" CASCADE;--> statement-breakpoint
DROP TABLE "products" CASCADE;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_orders_order_id_fk";
--> statement-breakpoint
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_product_id_products_product_id_fk";
--> statement-breakpoint
ALTER TABLE "seller_profiles" DROP CONSTRAINT "seller_profiles_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "support_tickets" DROP CONSTRAINT "support_tickets_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "quantity" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "price" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "seller_profiles" ALTER COLUMN "category" SET DATA TYPE "public"."seller_category" USING "category"::"public"."seller_category";--> statement-breakpoint
ALTER TABLE "seller_profiles" ALTER COLUMN "business_name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "support_tickets" ALTER COLUMN "description" SET DATA TYPE varchar(1000);--> statement-breakpoint
ALTER TABLE "support_tickets" ALTER COLUMN "status" SET DEFAULT 'open'::"public"."ticket_status";--> statement-breakpoint
ALTER TABLE "support_tickets" ALTER COLUMN "status" SET DATA TYPE "public"."ticket_status" USING "status"::"public"."ticket_status";--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD COLUMN "rating" numeric(2, 1) DEFAULT '0';--> statement-breakpoint
ALTER TABLE "support_tickets" ADD COLUMN "ticket_id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "support_tickets" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "MessagesTable" ADD CONSTRAINT "MessagesTable_sender_id_UsersTable_user_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."UsersTable"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "MessagesTable" ADD CONSTRAINT "MessagesTable_receiver_id_UsersTable_user_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."UsersTable"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "OrdersTable" ADD CONSTRAINT "OrdersTable_user_id_UsersTable_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."UsersTable"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PaymentsTable" ADD CONSTRAINT "PaymentsTable_order_id_OrdersTable_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."OrdersTable"("order_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProductsTable" ADD CONSTRAINT "ProductsTable_seller_profile_id_seller_profiles_seller_profile_id_fk" FOREIGN KEY ("seller_profile_id") REFERENCES "public"."seller_profiles"("seller_profile_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProductsTable" ADD CONSTRAINT "ProductsTable_category_id_CategoriesTable_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."CategoriesTable"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_OrdersTable_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."OrdersTable"("order_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_ProductsTable_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."ProductsTable"("product_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD CONSTRAINT "seller_profiles_user_id_UsersTable_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."UsersTable"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_user_id_UsersTable_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."UsersTable"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seller_profiles" DROP COLUMN "location";--> statement-breakpoint
ALTER TABLE "seller_profiles" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "support_tickets" DROP COLUMN "support_ticket_id";