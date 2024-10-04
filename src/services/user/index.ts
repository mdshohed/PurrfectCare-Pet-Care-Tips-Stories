import envConfig from "@/config/envConfig";

export const getAllUser = async () => {
  const fetchOption = {
    next: {
      tags: ["users"],
    },
  };

  const res = await fetch(
    `${envConfig.baseApi}/users`,
    fetchOption,
  );

  return res.json();
}