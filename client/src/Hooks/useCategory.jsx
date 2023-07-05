import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const getCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      //   console.log(data?.category);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return categories;
}
