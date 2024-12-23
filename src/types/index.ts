import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TReplyComment = {
  text: string, 
  user: IUser; 
}

export type TComment = {
  text: string, 
  user: IUser; 
  reply?: TReplyComment; 
}

export type TComments = {
  count: number, 
  comment: TComment[]
}

export type TPremium = {
  subscriptionFee: number;
  isPending: boolean; 
  subscribedUser: IUser[]
}

export type TLikes = {
  count: number,
  user: IUser[],
  upVote: IUser[], 
  downVote: IUser[], 
}

export interface IPost {
  _id: string;
  title?: string;
  description: string;
  images: string[];
  date?: Date;
  user: IUser;
  category: ICategory;
  likes?: TLikes;
  comments?: TComments
  status?: boolean;
  isPremium?: boolean;
  premiumDetails?: TPremium | undefined;
  createdAt: Date;
  updatedAt?: Date;
  __v: number;
}

export interface ICategory {
  _id: string;
  name: string;
  postCount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  follower: IUser[],
  following: IUser[],
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  mobileNumber?: string;
  profilePhoto?: File;
}


export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label?: string;
  name: string;
  isDisable?: boolean, 
  currentValue?: string
  disabled?: boolean;
}

export interface ISearchResult {
  title: string;
  description: string;
  thumbnail: string;
  id: string;
}
export interface IClaimRequest {
  item: string;
  description: string;
  answers: string[];
}

export interface IAnswer {
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export type TClaimRequest = {
  _id: string;
  item?: IPost;
  claimant: string | IClaimant;
  status: string;
  description: string;
  answers: IAnswer[];
  feedback: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface IClaimant {
  _id: string;
  name: string;
  role: "USER" | "ADMIN";
  email: string;
  status: "ACTIVE" | "INACTIVE";
  mobileNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profilePhoto: string;
}

export interface IReceivedClaimRequest extends IPost {
  claimRequests: TClaimRequest[];
}

export interface IFeedbackStatus {
  feedback: string;
  status: string;
}

export interface ISearchResult {
  title: string;
  description: string;
  thumbnail: string;
  id: string;
}


export interface TPayment {
  _id?: string; 
  postId: string, 
  transactionId: string, 
  userId: string,
  paidAmount: number, 
}

export interface IPayment {
  _id?: string; 
  postId: IPost, 
  transactionId: string, 
  userId: IUser,
  paidAmount: number, 
}