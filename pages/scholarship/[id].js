import ScholarshipDetails from "@/components/Scholarship/components/ScholarshipDetails";
import { getScholarships } from "../api/firebase";

export default function ScholarshipDetailsPage({ scholarship }) {
  return <ScholarshipDetails scholarship={scholarship} />;
}

export async function getStaticPaths() {
  const blogs = await getScholarships();

  const paths = blogs.map((scholarship) => ({
    params: { id: scholarship.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const data = await getScholarships();

  const scholarship = data.find(
    (scholarship) => scholarship.id.toString() === params.id
  );

  return {
    props: {
      scholarship,
    },
  };
}
