import { pathOr } from 'ramda';
import React from 'react';

import { blogs } from '@/data/content';

import SectionBlogBody from './SectionBlogBody';
import SectionBlogHero from './SectionBlogHero';

type Props = {
  params: { blogId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getBlogData = async (id: string) => {
  const filteredBlog = blogs.find((item) => item.slug === id);
  return filteredBlog;
};

const SingleBlogPage = async (props: Props) => {
  const selectedBlog = await getBlogData(props.params.blogId);

  return (
    <div className="container">
      <div className="pt-10">
        <SectionBlogHero
          coverImage={pathOr('', ['coverImage'], selectedBlog)}
          title={pathOr('', ['title'], selectedBlog)}
          brief={pathOr('', ['brief'], selectedBlog)}
        />
      </div>

      <div className="py-24">
        <SectionBlogBody blogData={pathOr(null, ['blogData'], selectedBlog)} />
      </div>
    </div>
  );
};

export default SingleBlogPage;
