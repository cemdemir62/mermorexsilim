"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { auth } from "@/lib/auth";

async function logActivity(action: string, details?: string) {
  try {
    const session = await auth();
    const user = session?.user?.email || "Sistem";
    await prisma.activityLog.create({
      data: { action, user, details }
    });
  } catch (e) {
    console.error("Log kaydedilemedi:", e);
  }
}

// GALLERY ACTIONS
export async function addGalleryItem(formData: FormData) {
  try {
    const file = formData.get("image") as File;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const isBeforeAfter = formData.get("isBeforeAfter") === "true";

    if (!file) return { error: "Resim gerekli" };

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = join(process.cwd(), "public", "uploads", "gallery");
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {}

    const path = join(uploadDir, filename);
    await writeFile(path, buffer);
    const imageUrl = `/uploads/gallery/${filename}`;

    await prisma.galleryItem.create({
      data: { title, category, imageUrl, isBeforeAfter },
    });

    await logActivity("Galeriye resim eklendi", title);
    revalidatePath("/admin/gallery");
    revalidatePath("/galeri");
    return { success: true };
  } catch (error) {
    return { error: "Ekleme başarısız" };
  }
}

export async function deleteGalleryItem(id: string, imageUrl: string) {
  try {
    const item = await prisma.galleryItem.findUnique({ where: { id } });
    await prisma.galleryItem.delete({ where: { id } });
    
    const filePath = join(process.cwd(), "public", imageUrl);
    try {
      await unlink(filePath);
    } catch (e) {}

    await logActivity("Galeriden resim silindi", item?.title || id);
    revalidatePath("/admin/gallery");
    revalidatePath("/galeri");
    return { success: true };
  } catch (error) {
    return { error: "Silme başarısız" };
  }
}

// TESTIMONIAL ACTIONS
export async function addTestimonial(data: any) {
  try {
    await prisma.testimonial.create({ data });
    await logActivity("Müşteri yorumu eklendi", data.name);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Ekleme başarısız" };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    const item = await prisma.testimonial.findUnique({ where: { id } });
    await prisma.testimonial.delete({ where: { id } });
    await logActivity("Müşteri yorumu silindi", item?.name || id);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Silme başarısız" };
  }
}

// SETTINGS ACTIONS
export async function updateSetting(key: string, value: string) {
  try {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    await logActivity("Sistem ayarı güncellendi", key);
    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Güncelleme başarısız" };
  }
}

// BLOG ACTIONS
export async function saveBlogPost(data: any) {
  try {
    if (data.id) {
      await prisma.blogPost.update({
        where: { id: data.id },
        data: { ...data, id: undefined },
      });
      await logActivity("Blog yazısı güncellendi", data.title);
    } else {
      await prisma.blogPost.create({ data });
      await logActivity("Yeni blog yazısı oluşturuldu", data.title);
    }
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    return { error: "Kaydetme başarısız" };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    const item = await prisma.blogPost.findUnique({ where: { id } });
    await prisma.blogPost.delete({ where: { id } });
    await logActivity("Blog yazısı silindi", item?.title || id);
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    return { error: "Silme başarısız" };
  }
}

// SERVICE ACTIONS
export async function saveService(data: any) {
  try {
    if (data.id) {
      await prisma.service.update({
        where: { id: data.id },
        data: { ...data, id: undefined },
      });
      await logActivity("Hizmet güncellendi", data.title);
    } else {
      await prisma.service.create({ data });
      await logActivity("Yeni hizmet oluşturuldu", data.title);
    }
    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Kaydetme başarısız" };
  }
}

// REQUEST ACTIONS
export async function updateRequestStatus(id: string, status: string) {
  try {
    await prisma.contactRequest.update({
      where: { id },
      data: { status },
    });
    await logActivity("Talep durumu güncellendi", `ID: ${id}, Yeni Durum: ${status}`);
    revalidatePath("/admin/requests");
    return { success: true };
  } catch (error) {
    return { error: "Güncelleme başarısız" };
  }
}
