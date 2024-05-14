'use client';

import Autocomplete from '@/components/Autocomplete';
import BlogCard from '@/components/BlogCard';
// import Pagination from '@/components/Pagination';

import useGetBlogs from '@/hooks/api/blog/useGetBlogs';
import { appConfig } from '@/utils/config';
import { useState } from 'react';
// import ReactPaginate from 'react-paginate';
import Pagination from '@/components/Pagination';
import { useAppSelector } from '@/redux/hooks';
export default function Home() {
  const [page, setPage] = useState<number>(1);
  const { data: blogs, meta } = useGetBlogs({ page, take: 2 });
  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const { id } = useAppSelector((state) => state.user);
  console.log(id);

  return (
    <main className=" container mx-auto px-4">
      {/* {jumboreon} */}

      <section className="text-center mt-10">
        <h1 className="text-4xl">Blogs</h1>
        <p className="text-xl">A blog everything </p>
      </section>
      {/* card */}
      <Autocomplete />
      <section className="grid grid-cols-3 gap-8">
        {blogs.map((blog, i) => {
          return (
            <BlogCard
              key={i}
              title={blog.title}
              author={blog.user.fullName}
              category={blog.category}
              description="descritpion"
              createdAt={new Date(blog.createdAt)}
              imageUrl={appConfig.baseUrl + `/assets${blog.thumbnail}`}
              blogId={blog.id}
            />
          );
        })}
      </section>
      <div>
        <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        />
      </div>
    </main>
  );
}
