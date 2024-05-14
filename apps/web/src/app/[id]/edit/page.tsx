'use client';

import { Formik } from 'formik';
import React from 'react';
import BlogEditForm from './components/BlogEditForm';
import useGetBlog from '@/hooks/api/blog/useGetBlog';

const EditBlog = ({ paramas }: { paramas: { id: string } }) => {
  const { blog } = useGetBlog(Number(paramas.id));
  return (
    <main className="conatiner mx-auto px-4">
      <Formik
        initialValues={{
          title: blog?.title || '',
          category: blog?.category || '',
          thumbnail: blog?.thumbnail || [],
          description: blog?.description || '',
          content: blog?.content || '',
        }}
        onSubmit={() => {}}
      >
        <BlogEditForm />
      </Formik>
    </main>
  );
};

export default EditBlog;
