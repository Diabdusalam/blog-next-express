'use client';
import { axiosInstance } from '@/lib/axios';
import { Blog } from '@/types/blog.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { set } from 'cypress/types/lodash';
import React, { useEffect, useState } from 'react';

interface IGetBlogsQuery extends IPaginationQueries {
  search?: string;
}

const useGetBlogs = (queries: IGetBlogsQuery) => {
  const [data, setData] = useState<Blog[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getBlogs = async () => {
    try {
      const { data } = await axiosInstance.get('/blogs', { params: queries });

      setData(data.data);
      setMeta(data.meta);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  //   return <div>useGetBlogs</div>;
  useEffect(() => {
    getBlogs();
  }, [queries?.page, queries?.search]);
  return { data, meta, isLoading };
};

export default useGetBlogs;
