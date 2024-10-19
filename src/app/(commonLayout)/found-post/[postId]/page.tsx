'use client'
import Loading from "@/app/loading";
import Container from "@/components/UI/Container";
import Post from "@/components/UI/Post";
import ViewPostPage from "@/components/UI/ViewPost";
import { useSinglePost } from "@/hooks/post.hook";
import { useEffect, useState } from "react";

interface IProps {
  params: {
    postId: string;
  };
}

const ItemDetailPage = ({ params: { postId } }: IProps) => {
  const { data: post, isPending } = useSinglePost(postId);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure that the component is only rendered after it's mounted on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Avoid rendering during hydration
  }

  return (
    <Container>
      {isPending && <Loading />}
      <div className="mx-auto my-3 max-w-[720px]">
        {post && <ViewPostPage key={'1'} post={post?.data} />}
      </div>
    </Container>
  );
};

export default ItemDetailPage;
