// api/firebase.js

import { onValue, ref, get } from "firebase/database";
import { database } from "@/firebaseconfig";

// Fetch universities
export const getUniversities = async () => {
  const universitiesRef = ref(database, "universities/");
  const snapshot = await get(universitiesRef);
  const data = snapshot.val();
  if (!!data) {
    const universities = Object.entries(data).map(([id, university]) => ({
      id,
      ...university,
    }));
    return universities;
  }

  return [];
};

// Fetch fellowships
export const getFellowships = async () => {
  const Ref = ref(database, "fellowships/");
  const snapshot = await get(Ref);
  const data = snapshot.val();
  if (!!data) {
    const fellowships = Object.entries(data).map(([id, fellowship]) => ({
      id,
      ...fellowship,
    }));

    return fellowships;
  }
  return [];
};

// Fetch scholarships
export const getScholarships = async () => {
  const Ref = ref(database, "scholarships/");
  const snapshot = await get(Ref);
  const data = snapshot.val();
  if (!!data) {
    const scholarships = Object.entries(data).map(([id, scholarship]) => ({
      id,
      ...scholarship,
    }));

    return scholarships;
  }

  return [];
};

// Fetch news articles
export const getNews = async () => {
  const Ref = ref(database, "news/");
  const snapshot = await get(Ref);
  const data = snapshot.val() ?? {};

  if (!!data) {
    const news = Object.entries(data).map(([id, news]) => ({
      id,
      ...news,
    }));
    return news;
  }

  return [];
};

// Fetch blogs
export const getBlogs = async () => {
  const Ref = ref(database, "blogs/");
  const snapshot = await get(Ref);
  const data = snapshot.val();
  if (data) {
    const blogs = Object.entries(data).map(([id, blog]) => ({
      id,
      ...blog,
    }));

    return blogs;
  }

  return [];
};

// Fetch blogs
export const getBanners = async () => {
  const Ref = ref(database, "banners/");
  const snapshot = await get(Ref);
  const data = snapshot.val();
  if (!!data) {
    const banners = Object.entries(data).map(([id, banner]) => ({
      id,
      ...banner,
    }));
    return banners;
  }

  return [];
};
