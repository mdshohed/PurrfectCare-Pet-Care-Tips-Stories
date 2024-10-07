import Filtering from "@/components/modules/found-post/Filtering";
import Container from "@/components/UI/Container";
import Post from "@/components/UI/Post";
import axiosInstance from "@/lib/AxiosInstance";
import { IPost } from "@/types";

export default async function FoundItems({
  searchParams,
}: {
  searchParams: any;
}) {
  const params = new URLSearchParams(searchParams);

  const { data } = await axiosInstance.get(`/posts`, {
    params: {
      searchTerm: params.get("query"),
      category: params.get("category"),
    },
  });

  return (
    <Container>
      <Filtering />
      <div className="mx-auto my-3 max-w-[720px]">
        {data?.data?.map((post: IPost) => <Post key={post?._id} post={post} />)}
      </div>
    </Container>
  );
}
