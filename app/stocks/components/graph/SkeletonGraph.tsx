import { Skeleton } from "@/components/ui/skeleton";


const SkeletonGraph = () => {

    return (
        <div className="p-6 bg-sidebar shadow-lg rounded-lg w-2/3 h-[300px]">
        <h2 className="flex text-2xl justify-around font-semibold mb-4">
          <div className="flex w-1/4 justify-between">
              <Skeleton className="h-4 w-2/3"></Skeleton>
          </div>  
            <Skeleton className="h-4 w-1/2"></Skeleton>
        </h2>
        <div className="flex flex-col h-full justify-center items-center">
            <Skeleton className="h-8 w-2/3"></Skeleton>
        </div>
      </div>
    );
}

export default SkeletonGraph