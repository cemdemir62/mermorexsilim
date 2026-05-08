const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("marmo2024", 10);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@mermorex.com" },
    update: {},
    create: {
      email: "admin@mermorex.com",
      name: "Admin",
      password: hashedPassword,
    },
  });

  console.log("Seed successful:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
