import React from "react";
import { Helmet } from "react-helmet";

export default function SEO({ title, description, author, keywords }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
    </Helmet>
  );
}

SEO.defaultProps = {
  title: "Ecommerce Website",
  description: "MERN Project",
  author: "Swarup Bhise",
  keywords:
    "HTML ,CSS , JavaScript , React , MERN , MEAN , Node , MongoDB , Express",
};
