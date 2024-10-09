'use client'

import Follower from "@/components/UI/Friends/Follower";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import Following from "@/components/UI/Friends/Following";
import FindFriends from "@/components/UI/Friends/FindFriends";
import { useEffect, useState } from "react";
import { IUser } from "@/types";
import { getAllUser, getSingleUser } from "@/services/user";
import { useUser } from "@/context/user.provider";
import { getCurrentUser } from "@/services/AuthService";
import { useUpdateUserFollowing } from "@/hooks/user.hook";

export default function Friends() {
  const { user, isLoading } = useUser();
  // const user = await getCurrentUser();

  const [users, setUsers] = useState<IUser[]>([]);
  const [ following, setFollowing] = useState<IUser[]>([]); 
  const [ follower, setFollower] = useState<IUser[]>([]); 

  const {
    mutate: handleUpdateFollowing,
    isPending: createUserPending,
    isSuccess,
  } = useUpdateUserFollowing();
  
  
  const handleSetConnection = async (id: string) => {
     handleUpdateFollowing(id); // Ensure this returns a boolean
  
    if (isSuccess) {
      await fetchAllUsers();
      await fetchCurrentUser();
    }
  };
  
  // Define these functions outside the handleSetConnection for better readability
  const fetchAllUsers = async () => {
    const { data } = await getAllUser();
    setUsers(data);
  };
  
  const fetchCurrentUser = async () => {
    const { data } = await getSingleUser(user!?._id); 
    console.log("friends", data, user);
  
    setFollower(data?.follower);
    setFollowing(data?.following); 
  };
  
  useEffect(() => {
    async function fetchAllUsers() {
      const { data } = await getAllUser();
      setUsers(data);
    }
    async function fetchCurrentUser() {
      const {data} = await getSingleUser(user!?._id); 
      console.log("friends", data, user);
      
      setFollower(data?.follower);
      setFollowing(data?.following); 
    }
    fetchAllUsers();
    fetchCurrentUser(); 
  }, [user]);

  


  return (
    <div className=" min-h-screen w-full p-5 rounded-md bg-default-100">
      <h1 className="py-5 text-xl">Friends</h1>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="followers" title="Follower">
            {
              follower?.length ? 
              <Follower follower={follower}></Follower>
              : 
              <Card><p className="p-5 h-32">No Followers</p></Card>
            }
          </Tab>
          <Tab key="following" title="Following">
            {
              following?.length ? 
              <Following following={following} handleSetConnection={handleSetConnection}></Following>
              : 
              <Card><p className="p-5 h-32">No Following</p></Card>
            }
          </Tab>
          <Tab key="find-friends" title="Find Friends">
            <FindFriends users={users} following={following} currentUser={user!?._id} handleSetConnection={handleSetConnection}></FindFriends>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}