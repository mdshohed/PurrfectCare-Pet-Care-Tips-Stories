
import Post from "@/components/UI/Post";
import { getMyPosts } from "@/services/post";
import { IPost } from "@/types";

export default async function page() {
  const { data } = await getMyPosts();  

  return (
    <>
      {data?.length ? (
        data?.map((post: IPost) => <Post postKey={post._id} post={post} />)
      ) : (
        <div className="flex min-h-screen w-full items-center justify-center rounded-md bg-default-100">
          <h1 className="text-4xl">No Post Found!</h1>
        </div>
      )}
    </>
  );
}
