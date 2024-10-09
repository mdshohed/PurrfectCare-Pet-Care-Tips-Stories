'use client'
import { useUser } from "@/context/user.provider";
import { IPost } from "@/types";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PremiumPost({ premiumPosts}: { premiumPosts: IPost[]}) {
  const { user } = useUser(); 
  const route = useRouter(); 

  const handleAccessPremiumContent = (id: string) => {
    const url = `found-post/${id}`
    console.log(id);
    
    if(!user){
      route.push(`login?redirect=${url}`);
    }
    else {
      route.push(url); 
    }
  }
  return (
    <div>
      {premiumPosts?.map((premiumPost) => (
        <div key={premiumPost._id} className="flex items-center justify-between mb-4">
          {/* <Image
            src={user?.profilePhoto}
            alt={user?.profilePhoto}
            width={40}
            height={40}
            className="rounded-full"
          /> */}
          {/* <ImageAvatar img={user?.profilePhoto}></ImageAvatar> */}
          <Link href={`friends/${premiumPost._id}`}>
            <div className="flex justify-center items-center">
              <img
                src={premiumPost.images[0]}
                alt={premiumPost.images[0]}
                className="w-[30px] h-[30px] rounded-full me-2"
              ></img>

              <div>
                <h3 className="font-semibold">{premiumPost.title}</h3>
                <h3 className="font-normal text-sm">
                <div className="post-preview">
                {premiumPost.description.length > 20 ? (
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: `${premiumPost.description.slice(0, 20)}` 
                    }} 
                  />
                ) : (
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: premiumPost.description 
                    }} 
                  />
                )}
              </div>
                </h3>
              </div>
            </div>
          </Link>
          <Button
            className="bg-black dark:bg-white text-tiny text-white dark:text-black"
            radius="full"
            size="sm"
          >
            <p onClick={()=>handleAccessPremiumContent(premiumPost._id)} >
              See
            </p>
          </Button>
        </div>
      ))}
      <div className="text-blue-400 text-[15px]">
        <Link href={"post?premium=all"}>Show More</Link>
      </div>
    </div>
  );
}
