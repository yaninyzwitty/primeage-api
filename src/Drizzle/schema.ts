import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  boolean,
  pgEnum,
  numeric,
  text,
} from "drizzle-orm/pg-core";

// Enums
export const userRoleEnum = pgEnum("user_role", ["user", "admin", "seller"]);
export const orderStatusEnum = pgEnum("booking_status", ["pending", "confirmed", "cancelled"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "completed", "failed"]);
export const paymentMethodEnum = pgEnum("payment_method", ["mpesa", "card", "cash", "bank"]);
export const sellerCategoryEnum = pgEnum("seller_category", [
  "material_vendor",
  "market_vendor",
  "hardware_store",
  "furniture_joinery",
  "skilled_labor",
  "billed_labor",
  "showroom",
  "niche_seller",
  "real_estate_material",
  "residual_supplier",
  "online_aggregator"
]);
export const ticketStatusEnum = pgEnum("ticket_status", ["open", "in_progress", "resolved", "closed"]);

// Tables

export const UsersTable = pgTable("UsersTable", {
  userId: serial("user_id").primaryKey(),
  firstname: varchar("firstname", { length: 100 }),
  lastname: varchar("lastname", { length: 100 }),
  email: varchar("email", { length: 255 }).unique(),
  password: varchar("password", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 20 }),
  address: varchar("address", { length: 255 }),
  role: userRoleEnum("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isVerified: boolean("is_verified").default(false),
  verificationCode: varchar("verification_code", { length: 255 }),
});


export const SellerProfilesTable = pgTable("seller_profiles", {
  sellerProfileId: serial("seller_profile_id").primaryKey(),

 userId: integer("user_id")
    .references(() => UsersTable.userId, { onDelete: "cascade" }), // ✅ cascade

  businessName: varchar("business_name", { length: 255 }).notNull(),
  category: sellerCategoryEnum("category").notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 255 }).notNull(),

  // Contact Information
  contactPhone: varchar("contact_phone", { length: 15 }).notNull(),
  contactEmail: varchar("contact_email", { length: 255 }).notNull(),

  // Verification Documents
  businessLicenseNumber: varchar("license_number", { length: 50 }).notNull(),
  nationalIdNumber: varchar("national_id", { length: 20 }).notNull(),
  verificationDocumentsUrl: text("documents_url").notNull(),

  // Verification Status
  verified: boolean("verified").default(false),
  verifiedAt: timestamp("verified_at"),
  rejected: boolean("rejected").default(false),
  adminComment: text("admin_comment"),

  // Metrics
  rating: integer("rating").default(0), // or `numeric()` if you want float ratings

  createdAt: timestamp("created_at").defaultNow(),
});

export const ProductsTable = pgTable("ProductsTable", {
  productId: serial("product_id").primaryKey(),
sellerProfileId: integer("seller_profile_id")
    .references(() => SellerProfilesTable.sellerProfileId, { onDelete: "cascade" }), // ✅ cascade
  categoryId: integer("category_id")
    .references(() => CategoriesTable.categoryId, { onDelete: "cascade" }), // ✅ cascade
  name: varchar("name", { length: 255 }),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }),
  stock: integer("stock"),
  imageUrl: varchar("image_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow()
});

export const OrdersTable = pgTable("OrdersTable", {
  orderId: serial("order_id").primaryKey(),
  userId: integer("user_id").references(() => UsersTable.userId),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }),
status: orderStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const OrderItemsTable = pgTable("order_items", {
  orderItemId: serial("order_item_id").primaryKey(),
  orderId: integer("order_id")
    .references(() => OrdersTable.orderId, { onDelete: "cascade" }), // ✅ cascade
  productId: integer("product_id")
    .references(() => ProductsTable.productId, { onDelete: "cascade" }), // ✅ cascade
  quantity: integer("quantity"),
  price: numeric("price", { precision: 10, scale: 2 })
});

export const PaymentsTable = pgTable("PaymentsTable", {
  paymentId: serial("payment_id").primaryKey(),
  orderId: integer("order_id")
    .references(() => OrdersTable.orderId, { onDelete: "cascade" }),
  amount: numeric("amount", { precision: 10, scale: 2 }),
  paymentStatus: paymentStatusEnum("payment_status").default("pending"),
  paymentMethod: paymentMethodEnum("payment_method"),
  transactionId: varchar("transaction_id", { length: 255 }),
  paymentDate: timestamp("payment_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const CategoriesTable = pgTable("CategoriesTable", {
  categoryId: serial("category_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
});

export const MessagesTable = pgTable("MessagesTable", {
  messageId: serial("message_id").primaryKey(),
 senderId: integer("sender_id")
    .references(() => UsersTable.userId, { onDelete: "cascade" }), // ✅ cascade
  receiverId: integer("receiver_id")
    .references(() => UsersTable.userId, { onDelete: "cascade" }), // ✅ cascade
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});



export const SupportTicketsTable = pgTable("support_tickets", {
  ticketId: serial("ticket_id").primaryKey(),
  userId: integer("user_id")
    .references(() => UsersTable.userId, { onDelete: "cascade" }), // ✅ cascade
  subject: varchar("subject", { length: 255 }),
  description: varchar("description", { length: 1000 }),
  status: ticketStatusEnum("status").default("open"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});


//Relations

//User relations

import { relations } from "drizzle-orm";

export const usersRelations = relations(UsersTable, ({ one, many }) => ({
  sellerProfile: one(SellerProfilesTable, {
    fields: [UsersTable.userId],
    references: [SellerProfilesTable.userId],
  }),
  orders: many(OrdersTable),
  tickets: many(SupportTicketsTable),
  sentMessages: many(MessagesTable, {
    relationName: "sentMessages",
  }),
  receivedMessages: many(MessagesTable, { 
    relationName: "receivedMessages",
  }),
}));

//Seller Profiles Table

export const sellerProfileRelations = relations(SellerProfilesTable, ({ one, many }) => ({
  user: one(UsersTable, {
    fields: [SellerProfilesTable.userId],
    references: [UsersTable.userId],
  }),
  products: many(ProductsTable),
}));



//Products table
export const productRelations = relations(ProductsTable, ({ one, many }) => ({
  sellerProfile: one(SellerProfilesTable, {
    fields: [ProductsTable.sellerProfileId],
    references: [SellerProfilesTable.sellerProfileId],
  }),
  category: one(CategoriesTable, {
    fields: [ProductsTable.categoryId],
    references: [CategoriesTable.categoryId],
  }),
  orderItems: many(OrderItemsTable),
}));

//Orders table
export const orderRelations = relations(OrdersTable, ({ one, many }) => ({
  user: one(UsersTable, {
    fields: [OrdersTable.userId],
    references: [UsersTable.userId],
  }),
  orderItems: many(OrderItemsTable),
  payments: many(PaymentsTable),
}));

//Order Items table
export const orderItemRelations = relations(OrderItemsTable, ({ one }) => ({
  order: one(OrdersTable, {
    fields: [OrderItemsTable.orderId],
    references: [OrdersTable.orderId],
  }),
  product: one(ProductsTable, {
    fields: [OrderItemsTable.productId],
    references: [ProductsTable.productId],
  }),
}));

//Payments table
export const paymentRelations = relations(PaymentsTable, ({ one }) => ({
  order: one(OrdersTable, {
    fields: [PaymentsTable.orderId],
    references: [OrdersTable.orderId],
  }),
}));


//Categories table
export const categoryRelations = relations(CategoriesTable, ({ many }) => ({
  products: many(ProductsTable),
}));

//Messages table
export const messageRelations = relations(MessagesTable, ({ one }) => ({
  sender: one(UsersTable, {
    fields: [MessagesTable.senderId],
    references: [UsersTable.userId],
  }),
  receiver: one(UsersTable, {
    fields: [MessagesTable.receiverId],
    references: [UsersTable.userId],
  }),
}));

//Support Tickets
export const supportTicketsRelations = relations(SupportTicketsTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [SupportTicketsTable.userId],
    references: [UsersTable.userId],
  }),
}));


export type TIUser = typeof UsersTable.$inferInsert;
export type TISellerProfile = typeof SellerProfilesTable.$inferInsert;
export type TIProduct = typeof ProductsTable.$inferInsert;
export type TIOrder = typeof OrdersTable.$inferInsert;
export type TIOrderItems = typeof OrderItemsTable.$inferInsert;
export type TIPayment = typeof PaymentsTable.$inferInsert;
export type TICategory = typeof CategoriesTable.$inferInsert;
export type TIMessage = typeof MessagesTable.$inferInsert;
export type TISupportTickets = typeof MessagesTable.$inferInsert;
