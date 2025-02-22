import preview from '@/images/preview.jpg';
import notFound from '@/images/preview/404.jpg';
import blogPage from '@/images/preview/blogs.jpg';
import blogSingle from '@/images/preview/blogsingle.jpg';
import cart from '@/images/preview/cart.jpg';
import checkout from '@/images/preview/checkout.jpg';
import collection from '@/images/preview/collection.jpg';
import contact from '@/images/preview/contact.jpg';
import faq from '@/images/preview/faq.jpg';
import forgotPass from '@/images/preview/forgotPass.jpg';
import login from '@/images/preview/login.jpg';
import showcase1 from '@/images/preview/showcase1.jpg';
import showcase2 from '@/images/preview/showcase2.jpg';
import signup from '@/images/preview/signup.jpg';
import singleProduct from '@/images/preview/singleProduct.jpg';

export const templateDetails = {
  name: 'HotKicks Ecommerce NextJS Template',
  description:
    'Presenting HotKicks Template, the ultimate ecommerce template in NextJS.',
  screenshotsOne: [
    preview,
    collection,
    singleProduct,
    blogPage,
    blogSingle,
    preview,
  ],
  screenshotsTwo: [
    preview,
    blogSingle,
    blogPage,
    singleProduct,
    collection,
    preview,
  ],
};

export const templateIncludes = {
  heading: `What is included in ${templateDetails.name}`,
  sections: 85,
  pages: 13,
  font: 'Poppins',
};

export const includesCardsData = [
  {
    coverImage: preview,
    title: `pages`,
    spanText: `10+ pages`,
  },
  {
    coverImage: collection,
    title: `sections`,
    spanText: `20+ sections`,
  },
  {
    coverImage: showcase2,
    title: `font`,
    spanText: `Poppins`,
  },
];

export const midSection = {
  heading: 'Looking for more amazing Templates?',
  description:
    'Take a look at our collection of 100+ premium Templates at ThemeAlchemy.',
  href: 'https://www.themealchemy.com',
};

export const mainPages = {
  heading: 'Main pages',
  description: `Take a look at the main pages included in the ${templateDetails.name}`,
  pages: [
    {
      coverImage: preview,
      pageName: 'Home',
      href: '/home',
      CMS: false,
    },
    {
      coverImage: blogPage,
      pageName: 'Blog',
      href: '/blog',
      CMS: false,
    },
    {
      coverImage: blogSingle,
      pageName: 'Blog Single',
      href: '/blog/the-evolution-of-sneaker-culture-a-historical-perspective',
      CMS: false,
    },
    {
      coverImage: collection,
      pageName: 'Products',
      href: '/products',
      CMS: false,
    },
    {
      coverImage: singleProduct,
      pageName: 'Product Single',
      href: '/products/yellowLow',
      CMS: false,
    },
    {
      coverImage: faq,
      pageName: 'FAQs',
      href: '/faqs',
      CMS: false,
    },
    {
      coverImage: cart,
      pageName: 'Cart',
      href: '/cart',
      CMS: false,
    },
    {
      coverImage: notFound,
      pageName: 'Not Found',
      href: '/gg',
      CMS: false,
    },
  ],
};

export const utilityPages = {
  heading: 'Utility pages',
  description: `Take a look at the utility pages included in the ${templateDetails.name}`,
  pages: [
    {
      coverImage: login,
      pageName: 'Login',
      href: '/login',
    },
    {
      coverImage: signup,
      pageName: 'Signup',
      href: '/login',
    },
    {
      coverImage: forgotPass,
      pageName: 'Forgot Password',
      href: '/forgot-pass',
    },
    {
      coverImage: checkout,
      pageName: 'Checkout',
      href: '/',
    },
    {
      coverImage: contact,
      pageName: 'Contact',
      href: '/contact',
    },
  ],
};

export const browseTemplates = {
  heading: 'Browse All Templates',
  description:
    'Take a look at our collection of 100+ premium Templates at ThemeAlchemy.',
  href: 'https://www.themealchemy.com',
  coverImage: showcase1,
  buttonName: 'Buy Template',
};

export const buyTemplate = {
  heading: 'Buy Template on ThemeAlchemy',
  description:
    'Take a look at our collection of 100+ premium Templates at ThemeAlchemy.',
  href: 'https://www.themealchemy.com',
  coverImage: showcase2,
  buttonName: 'Explore more templates',
};

export const buyOrExplore = [browseTemplates, buyTemplate];
