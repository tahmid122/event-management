import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
type CardSkeletonProps = {
  count?: number;
};

const SkeletonUI = ({ count = 1 }: CardSkeletonProps) => {
  return (
    <div className="grid grid-cols-4 gap-5 p-5">
      {Array.from({ length: count }).map((_, index) => (
        <Card
          className="w-full max-w-full h-[250px] bg-black border-slate-900"
          key={index}
        >
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="h-full">
            <Skeleton className="h-full w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SkeletonUI;
