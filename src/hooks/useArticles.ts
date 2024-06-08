import { useEffect, useState } from "react";
import { getArticles } from "../services/articleSerivce";
import { Article } from "../types";

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    async function fetch() {
      const { data: articles } = await getArticles();
      setArticles(articles);
    }
    fetch();
  }, []);
  return { articles, setArticles };
}
