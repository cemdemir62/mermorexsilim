import Skeleton from "@/components/ui/Skeleton";

export default function GalleryLoading() {
  return (
    <div className="container mx-auto px-6 pt-40 pb-20">
      <div className="text-center mb-16 space-y-4">
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton className="h-12 w-64 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-3xl" />
        ))}
      </div>
    </div>
  );
}
