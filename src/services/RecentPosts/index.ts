import envConfig from "@/config/envConfig";

export const getRecentPosts = async () => {
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };

  const res = await fetch(
    `${envConfig.baseApi}/posts?sortBy=-createdAt&limit=9`,
    fetchOption,
  );

  return res.json();
};
