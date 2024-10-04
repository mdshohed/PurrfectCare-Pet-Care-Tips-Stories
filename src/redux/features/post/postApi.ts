import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    getRecentPosts: builder.query({
      query: () => ({
          url: '/items',
          method: 'GET',
        }),
        providesTags: ["post"]
      }
    ),

    getPost: builder.query({
      query: (postId) => ({
          url: `/items/${postId}`,
          method: 'GET',
        }),
        providesTags: ["post"]
      }
    ),

    getMyPosts: builder.query({
      query: (userId) => ({
        url: `/items?user=${userId}`,
        method: 'GET',
      }),
      providesTags: ["post"],
    }),
    

    createPost: builder.mutation({
      query: (newRental) => ({
        url: "/items",
        method: "POST",
        body: newRental,
      }),
      invalidatesTags: ["post"],
    }),

    updatePost: builder.mutation({
      query: (payload) => {
        return {
          url: `/items/${payload.id}`,
          method: "PUT",
          body: payload,
      }},
      invalidatesTags: ["post"],
    }),
  })
})

export const { 
  useGetRecentPostsQuery,
  useGetPostQuery, 
  useGetMyPostsQuery, 
  useCreatePostMutation, 
  useUpdatePostMutation,
 } = postApi; 
