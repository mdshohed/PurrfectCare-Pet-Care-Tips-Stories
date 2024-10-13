import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["post"],
    }),

    getAllPost: builder.query({
      query: () => ({
          url: '/posts',
          method: 'GET',
        }),
        providesTags: ['post']
      }
    ),

    getPost: builder.query({
      query: (postId) => ({
          url: `/posts/${postId}`,
          method: 'GET',
        }),
        providesTags: ["post"]
      }
    ),

    getPremiumPosts: builder.query({
      query: (postId) => ({
          url: `/posts/premium`,
          method: 'GET',
        }),
        providesTags: ["post"]
      }
    ),
    
    // updatePost: builder.mutation({
    //   query: (payload) => {
    //     console.log("Payload", payload.id);
        
    //     return {
    //       url: `/posts/${payload.id}`,
    //       method: "PUT",
    //       body: payload,
    //   }},
    //   invalidatesTags: ["post", 'bikes'],
    // }),
  })
})

export const { 
  useCreatePostMutation,
  useGetAllPostQuery,
  useGetPremiumPostsQuery,
  useGetPostQuery,
 } = postApi; 
