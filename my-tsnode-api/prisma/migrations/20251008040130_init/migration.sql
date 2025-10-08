-- CreateTable
CREATE TABLE "orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" REAL NOT NULL
);
