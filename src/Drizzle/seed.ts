import db from "./db";
import {
  UsersTable,
  SellerProfilesTable,
  CategoriesTable,
  ProductsTable,
  OrdersTable,
  OrderItemsTable,
  PaymentsTable,
  MessagesTable,
  SupportTicketsTable,
} from "../Drizzle/schema";

async function seedDatabase() {
  try {
    console.log("Seeding started...");

    // USERS
    await db.insert(UsersTable).values([
      {
        firstname: "John",
        lastname: "Builder",
        email: "john@example.com",
        password: "secure123",
        contactPhone: "0700111222",
        address: "Nairobi, Kenya",
        role: "user",
      },
      {
        firstname: "Jane",
        lastname: "Supplier",
        email: "jane@example.com",
        password: "supplier456",
        contactPhone: "0700222333",
        address: "Mombasa, Kenya",
        role: "seller",
      },
      {
        firstname: "Sam",
        lastname: "Dealer",
        email: "sam@example.com",
        password: "dealer789",
        contactPhone: "0700333444",
        address: "Kisumu, Kenya",
        role: "seller",
      },
      {
        firstname: "Admin",
        lastname: "Panel",
        email: "admin@example.com",
        password: "adminpass",
        contactPhone: "0700444555",
        address: "Admin HQ",
        role: "admin",
      },
      {
        firstname: "Mary",
        lastname: "Contractor",
        email: "mary@example.com",
        password: "buildergirl",
        contactPhone: "0700555666",
        address: "Eldoret, Kenya",
        role: "user",
      },
    ]);

    // CATEGORIES
    await db.insert(CategoriesTable).values([
      { name: "Cement", description: "Various types of cement for construction" },
      { name: "Steel", description: "Steel rods, bars, sheets, etc." },
      { name: "Timber", description: "Quality wood and timber materials" },
      { name: "Tiles", description: "Flooring and wall tiles" },
      { name: "Paint", description: "Interior and exterior paints" },
    ]);

    // SELLER PROFILES
    await db.insert(SellerProfilesTable).values([
      {
        userId: 2,
        businessName: "Mombasa Cement Depot",
        category: "material_vendor",
        description: "Bulk supplier of cement and steel materials.",
        location: "Mombasa",
        contactPhone: "0700222333",
        contactEmail: "cement@mombasa.com",
        businessLicenseNumber: "LIC12345",
        nationalIdNumber: "12345678",
        verificationDocumentsUrl: "https://example.com/docs/jane",
        rating: 4,
        verified: true,
      },
      {
        userId: 3,
        businessName: "Kisumu Timber Yard",
        category: "hardware_store",
        description: "High-quality timber and wooden fixtures.",
        location: "Kisumu",
        contactPhone: "0700333444",
        contactEmail: "timber@kisumu.com",
        businessLicenseNumber: "LIC67890",
        nationalIdNumber: "87654321",
        verificationDocumentsUrl: "https://example.com/docs/sam",
        rating: 4,
        verified: false,
      },
    ]);

    // PRODUCTS
    await db.insert(ProductsTable).values([
      {
        sellerProfileId: 1,
        categoryId: 1,
        name: "Savannah Cement 50kg",
        description: "Premium grade cement for general construction.",
        price: "780.00",
        stock: 500,
        imageUrl: "https://example.com/images/cement.jpg",
      },
      {
        sellerProfileId: 1,
        categoryId: 2,
        name: "12mm Steel Rod",
        description: "Strong, durable steel for structural support.",
        price: "1150.00",
        stock: 300,
        imageUrl: "https://example.com/images/steel.jpg",
      },
      {
        sellerProfileId: 2,
        categoryId: 3,
        name: "Mahogany Timber Plank",
        description: "High-quality mahogany wood plank 2x4",
        price: "950.00",
        stock: 150,
        imageUrl: "https://example.com/images/timber.jpg",
      },
    ]);

    // ORDERS
    await db.insert(OrdersTable).values([
      {
        userId: 1,
        totalAmount: "2930.00",
        status: "confirmed",
      },
      {
        userId: 5,
        totalAmount: "1150.00",
        status: "pending",
      },
    ]);

    // ORDER ITEMS
    await db.insert(OrderItemsTable).values([
      {
        orderId: 1,
        productId: 1,
        quantity: 2,
        price: "1560.00",
      },
      {
        orderId: 1,
        productId: 3,
        quantity: 1,
        price: "950.00",
      },
      {
        orderId: 2,
        productId: 2,
        quantity: 1,
        price: "1150.00",
      },
    ]);

    // PAYMENTS
    await db.insert(PaymentsTable).values([
      {
        orderId: 1,
        amount: "2930.00",
        paymentStatus: "completed",
        paymentMethod: "mpesa",
        transactionId: "TXN1001",
      },
      {
        orderId: 2,
        amount: "1150.00",
        paymentStatus: "pending",
        paymentMethod: "card",
        transactionId: "TXN1002",
      },
    ]);

    // MESSAGES
    await db.insert(MessagesTable).values([
      {
        senderId: 1,
        receiverId: 2,
        content: "Hi Jane, do you offer delivery for cement in Nairobi?",
      },
      {
        senderId: 5,
        receiverId: 3,
        content: "Can I get a bulk discount on timber planks?",
      },
    ]);

    // SUPPORT TICKETS
    await db.insert(SupportTicketsTable).values([
      {
        userId: 1,
        subject: "Late Delivery",
        description: "My order hasn't arrived yet. Please assist.",
        status: "open",
      },
      {
        userId: 5,
        subject: "Payment not reflecting",
        description: "I paid via MPESA but the order still shows pending.",
        status: "in_progress",
      },
      {
        userId: 3,
        subject: "Product image broken",
        description: "The timber product image link seems invalid.",
        status: "resolved",
      },
    ]);

    console.log("🌱 Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

seedDatabase();
