const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD || "mermorex2026";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@mermorex.com" },
    update: {
      password: hashedPassword,
    },
    create: {
      email: "admin@mermorex.com",
      name: "Admin",
      password: hashedPassword,
    },
  });

  // Create Blog Posts
  const blogPosts = [
    {
      title: "Mermer Silim ve Parlatmanın Önemi",
      slug: "mermer-silimi-ve-parlatmanin-onemi",
      content: "Mermer yüzeyler zamanla matlaşır ve çizilir. Profesyonel silim işlemi mermerin ilk günkü parlaklığına kavuşmasını sağlar. Bu yazımızda mermer bakımının inceliklerini anlatıyoruz...",
      category: "Bakım Rehberi",
      coverImage: "/images/blog/mermer-silim-onemi.webp",
      published: true,
      seoTitle: "Mermer Silimi ve Parlatma Rehberi",
      seoDescription: "Mermer yüzeylerin bakımı ve parlatma işlemleri hakkında uzman görüşleri."
    },
    {
      title: "Doğal Taş Restorasyonunda Profesyonel Çözümler",
      slug: "dogal-tas-restorasyonunda-profesyonel-cozumler",
      content: "Traverten, mermer veya granit... Her taşın restorasyon tekniği farklıdır. Mermorex Silim olarak uyguladığımız ileri teknoloji yöntemlerle taşlarınızın ömrünü uzatıyoruz.",
      category: "Restorasyon",
      coverImage: "/images/blog/dogal-tas-restorasyon.webp",
      published: true,
      seoTitle: "Doğal Taş Restorasyonu Teknikleri",
      seoDescription: "Eskimiş ve yıpranmış doğal taşların restorasyon süreçleri."
    },
    {
      title: "Mozaik ve Karo Siliminde Nelere Dikkat Edilmeli?",
      slug: "mozaik-ve-karo-siliminde-nelere-dikkat-edilmeli",
      content: "Mozaik ve karo yüzeyler, doğru ekipman kullanılmadığında zarar görebilir. Elmas uçlu makinelerimizle sıfır toz politikasıyla gerçekleştirdiğimiz silim işlemlerini keşfedin.",
      category: "Teknik Bilgi",
      coverImage: "/images/blog/mozaik-karo-silim.webp",
      published: true,
      seoTitle: "Mozaik ve Karo Silimi Hakkında Her Şey",
      seoDescription: "Mozaik yüzeylerin temizliği ve pürüzsüzleştirilmesi için profesyonel ipuçları."
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  // Clear existing gallery items
  await prisma.galleryItem.deleteMany();

  // Create Gallery Items
  // Create Gallery Items
  const galleryItems = [
    { title: "Mermer Silim & Parlatma", category: "MERMER", imageUrl: "/images/gallery/gallery-mermer-1.png", isBeforeAfter: true, order: 1 },
    { title: "Mermer Kristalize Cila", category: "MERMER", imageUrl: "/images/gallery/gallery-mermer-2.png", isBeforeAfter: true, order: 2 },
    { title: "Granit Yüzey Yenileme", category: "GRANIT", imageUrl: "/images/gallery/gallery-granit-1.png", isBeforeAfter: true, order: 3 },
    { title: "Granit Mutfak Tezgahı", category: "GRANIT", imageUrl: "/images/gallery/gallery-granit-2.png", isBeforeAfter: true, order: 4 },
    { title: "Geleneksel Çini Temizliği", category: "CINI", imageUrl: "/images/gallery/gallery-cini-1.png", isBeforeAfter: true, order: 5 },
    { title: "Çini Fuga Yenileme", category: "CINI", imageUrl: "/images/gallery/gallery-cini-2.png", isBeforeAfter: true, order: 6 },
    { title: "Havuz Mozaik Restorasyonu", category: "MOZAIK", imageUrl: "/images/gallery/gallery-mozaik-pool.webp", isBeforeAfter: true, order: 7 },
    { title: "Dekoratif Mozaik Duvar", category: "MOZAIK", imageUrl: "/images/gallery/gallery-mozaik-2.png", isBeforeAfter: true, order: 8 },
    { title: "Seramik Karo Derin Temizlik", category: "KARO", imageUrl: "/images/gallery/gallery-karo-cleaning.webp", isBeforeAfter: true, order: 9 },
    { title: "Banyo Karo Kaymaz Kaplama", category: "KARO", imageUrl: "/images/gallery/gallery-karo-antislip.webp", isBeforeAfter: true, order: 10 },
    { title: "Endüstriyel Beton Parlatma", category: "BETON", imageUrl: "/images/gallery/gallery-beton-1.png", isBeforeAfter: true, order: 11 },
    { title: "Garaj Epoksi Kaplama", category: "BETON", imageUrl: "/images/gallery/gallery-beton-2.png", isBeforeAfter: true, order: 12 },
    { title: "Traverten Delik Dolgu", category: "PALEDYEN_TRAVERTEN", imageUrl: "/images/gallery/gallery-traverten-1.png", isBeforeAfter: true, order: 13 },
    { title: "Dış Mekan Traverten Bakımı", category: "PALEDYEN_TRAVERTEN", imageUrl: "/images/gallery/gallery-traverten-2.png", isBeforeAfter: true, order: 14 },
    { title: "Paledyen Zemin Restorasyonu", category: "PALEDYEN_TRAVERTEN", imageUrl: "/images/gallery/gallery-paledyen-1.png", isBeforeAfter: true, order: 15 },
  ];

  for (const item of galleryItems) {
    await prisma.galleryItem.create({
      data: item
    });
  }

  console.log("Seed successful: Admin, Blog Posts, and Gallery Items created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
