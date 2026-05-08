const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("mermorex2026", 10);
  
  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@mermorex.com" },
    update: {},
    create: {
      email: "admin@mermorex.com",
      name: "Admin",
      password: hashedPassword,
    },
  });

  // Create Blog Posts
  const blogPosts = [
    {
      title: "Mermer Silimi ve Parlatmanın Önemi",
      slug: "mermer-silimi-ve-parlatmanin-onemi",
      content: "Mermer yüzeyler zamanla matlaşır ve çizilir. Profesyonel silim işlemi mermerin ilk günkü parlaklığına kavuşmasını sağlar. Bu yazımızda mermer bakımının inceliklerini anlatıyoruz...",
      category: "Bakım Rehberi",
      coverImage: "/images/blog-1.png",
      published: true,
      seoTitle: "Mermer Silimi ve Parlatma Rehberi",
      seoDescription: "Mermer yüzeylerin bakımı ve parlatma işlemleri hakkında uzman görüşleri."
    },
    {
      title: "Doğal Taş Restorasyonunda Profesyonel Çözümler",
      slug: "dogal-tas-restorasyonunda-profesyonel-cozumler",
      content: "Traverten, mermer veya granit... Her taşın restorasyon tekniği farklıdır. Mermorex Silim olarak uyguladığımız ileri teknoloji yöntemlerle taşlarınızın ömrünü uzatıyoruz.",
      category: "Restorasyon",
      coverImage: "/images/blog-2.png",
      published: true,
      seoTitle: "Doğal Taş Restorasyonu Teknikleri",
      seoDescription: "Eskimiş ve yıpranmış doğal taşların restorasyon süreçleri."
    },
    {
      title: "Mozaik ve Karo Siliminde Nelere Dikkat Edilmeli?",
      slug: "mozaik-ve-karo-siliminde-nelere-dikkat-edilmeli",
      content: "Mozaik ve karo yüzeyler, doğru ekipman kullanılmadığında zarar görebilir. Elmas uçlu makinelerimizle sıfır toz politikasıyla gerçekleştirdiğimiz silim işlemlerini keşfedin.",
      category: "Teknik Bilgi",
      coverImage: "/images/blog-3.png",
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

  console.log("Seed successful: Admin and Blog Posts created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
