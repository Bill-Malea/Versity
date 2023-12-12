import NewsDetails from "@/components/News/components/NewsDetail";
import { getNews } from "../api/firebase";

export default function NewsDetailsPage({ news }) {
  return <NewsDetails news={news} />;
}

export async function getStaticPaths() {
  const newsdata = await getNews();

  const paths = newsdata.map((news) => ({
    params: { id: news.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const newsdata = await getNews();

  const news = newsdata.find((data) => data.id.toString() === params.id);

  return {
    props: {
      news,
    },
  };
}
