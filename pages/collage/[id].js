import { getCollages } from "../api/firebase";
import VersityDetails from "@/components/Events/components/VersityDescription";
export default function CollageDetailPage({ collage }) {
  if (!collage) {
    return <div>Loading...</div>;
  }
  return <VersityDetails versity={collage} />;
}

export async function getStaticPaths() {
  const collages = await getCollages();

  const paths = collages.map((versity) => ({
    params: { id: versity.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const data = await getCollages();

  const collage = data.find((col) => col.id.toString() === params.id);

  return {
    props: {
      collage,
    },
  };
}
