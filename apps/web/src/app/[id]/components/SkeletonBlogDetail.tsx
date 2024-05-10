'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const SkeletonBlogDetail = () => {
  return (
    <div className="flex flex-col pace-y-3">
      <div className="space-y-2">
        <Skeleton className="h-4 max-w-[200px]" />
        <Skeleton className="h-4 " />
        <Skeleton className="h-4 " />
        <Skeleton className="h-4 " />
        <Skeleton className="h-4 " />
        <Skeleton className="h-4 " />
        <Skeleton className="h-4 " />
        <Skeleton className="h-4 " />
        <Skeleton className="h-4 " />
        <Skeleton className="h-4 max-w-[180px]" />
      </div>
    </div>
  );
};

export default SkeletonBlogDetail;