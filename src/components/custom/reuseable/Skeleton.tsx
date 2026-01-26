type CardSkeletonProps = {
  count?: number;
};

const Skeleton = ({ count = 1 }: CardSkeletonProps) => {
  return (
    <div className="grid grid-cols-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="p-5 space-y-3 bg-white border border-zinc-800 rounded-xl w-full max-w-sm animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default Skeleton;
