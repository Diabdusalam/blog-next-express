'use client';

import { AxiosError } from 'axios';
import { Blog, IFormBlog } from '../../../types/blog.type';
import { axiosInstance } from '@/lib/axios';
import { FileWithPath } from 'react-dropzone';
import { useRouter } from 'next/navigation';

const useCreateBlog = () => {
  const router = useRouter();
  const createBlog = async (payload: IFormBlog) => {
    try {
      const { title, content, description, thumbnail, userId, category } =
        payload;
      const createBlogForm = new FormData();

      createBlogForm.append('title', title);
      createBlogForm.append('category', category);
      createBlogForm.append('content', content);
      createBlogForm.append('description', description);
      //   createBlogForm.append('thumbnail', thumbnail);
      createBlogForm.append('userId', String(userId));

      thumbnail.forEach((file: FileWithPath) => {
        createBlogForm.append('thumbnail', file);
      });

      await axiosInstance.post<Blog>('/blogs', createBlogForm);

      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        //putt toast in here
        alert(error?.response?.data);
      }
    }
  };
  return { createBlog };
};

export default useCreateBlog;
