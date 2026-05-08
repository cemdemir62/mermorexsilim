import Skeleton from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <div className="container mx-auto px-6 pt-40 pb-20">
      <div className="text-center mb-16 space-y-4">
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton className="h-12 w-64 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-6">
            <Skeleton className="aspect-video rounded-[3rem]" />
            <div className="space-y-3">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
