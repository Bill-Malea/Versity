import { getUniversities } from "../api/firebase";
import VersityDetails from "@/components/Events/components/VersityDescription";
export default function VersityDetailPage({ versity }) {
  return <VersityDetails versity={versity} />;
}

export async function getStaticPaths() {
  const versities = await getUniversities();

  const paths = versities.map((versity) => ({
    params: { id: versity.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const data = await getUniversities();

  const versity = data.find((uni) => uni.id.toString() === params.id);

  return {
    props: {
      versity,
    },
  };
}
