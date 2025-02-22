import type { StaticImageData } from "next/image";

export type ProductType = {
  slug: string;
  name: string;
  shoeCategory: string;
  coverImage: StaticImageData | string;
  currentPrice: number;
  previousPrice: number;
  rating: number;
  pieces_sold: number;
  justIn: boolean;
};

export type BlogData = {
  sectionOne: {
    title: string;
    paragraph1: string;
    points: string[];
    paragraph2: string;
  };
  sectionTwo: {
    title: string;
    description: string;
    midImage: string;
  };
  sectionThree: {
    title: string;
    description: string;
  };
  sectionFour: {
    title: string;
    description: string;
    points: string[];
  };
  quote: string;
  sectionFive: {
    title: string;
    description: string;
  }[];
};

export type BlogType = {
  title: string;
  brief: string;
  date: string;
  coverImage: string;
  blogData: BlogData;
  tag: "Style" | "Fitting" | "General";
  slug: string;
};
