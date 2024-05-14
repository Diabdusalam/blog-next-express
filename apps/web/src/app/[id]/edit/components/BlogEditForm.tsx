'use client';
import Dropzone from '@/components/Dropzone';
import FormInput from '@/components/FormInput';
import PreviewImages from '@/components/PreviewImages';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { IFormBlog } from '@/types/blog.type';
import { useFormikContext } from 'formik';
import React from 'react';

const BlogEditForm = () => {
  const { handleSubmit, values, errors, touched, handleChange, handleBlur } =
    useFormikContext<IFormBlog>();
  function setFieldValue(arg0: string, arg1: File[]) {
    throw new Error('Function not implemented.');
  }

  //   haurs
  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <FormInput
          name="title"
          type="text"
          label="Title"
          placeholder="Title"
          value={values.title}
          error={errors.title}
          isError={!!touched.title && !!errors.title}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <FormInput
          name="category"
          type="text"
          label="category"
          placeholder="Category"
          value={values.category}
          error={errors.category}
          isError={!!touched.category && !!errors.category}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <FormInput
          name="description"
          type="text"
          label="Description"
          placeholder="Description"
          value={values.description}
          error={errors.description}
          isError={!!touched.description && !!errors.description}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <PreviewImages
          onRemoveImage={(idx) => {
            setFieldValue(
              'thumbnail',
              values.thumbnail.filter((_, i) => i !== idx),
            );
          }}
          fileImages={values.thumbnail}
        />
        <Dropzone
          isError={Boolean(errors.thumbnail)}
          label="Thumbnail"
          onDrop={(files) =>
            setFieldValue('thumbnail', [
              ...values.thumbnail,
              ...files.map((file) => file),
            ])
          }
        />
        {/* <RichTextEditor
          onChange={(html: string) => setFieldValue('content', html)}
          label="Content"
          value={values.content}
          isError={Boolean(errors.content)}
        /> */}
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default BlogEditForm;
