import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonKeyInfo = () => {
  return (
    <div className="justify-around p-6 bg-sidebar shadow-lg rounded-lg w-1/3 h-[300px]">
      <h2 className="font-bold text-lg">Key Stats</h2>

      <div className="flex flex-col justify-around mt-4">

          <Skeleton className="h-4 grow mb-2" />
          <Skeleton className="h-4 grow mb-2" />
          <Skeleton className="h-4 grow mb-2" />
          <Skeleton className="h-4 grow mb-2" />
          <Skeleton className="h-4 grow mb-2" />
          <Skeleton className="h-4 grow mb-2" />
          <Skeleton className="h-4 grow mb-2" />
      </div>
    </div>
  );
};
