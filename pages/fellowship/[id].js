import FellowshipDetails from "@/components/Fellowship/components/FellowshipDetails";
import { getFellowships } from "../api/firebase";

export default function FellowshipDetailsPage({ data }) {
  return <FellowshipDetails fellowship={data} />;
}

export async function getStaticPaths() {
  const fellowships = await getFellowships();

  const paths = fellowships.map((data) => ({
    params: { id: data.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const fellowshps = await getFellowships();

  const data = fellowshps.find((data) => data.id.toString() === params.id);

  return {
    props: {
      data,
    },
  };
}
