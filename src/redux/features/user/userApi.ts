import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    getAllUser: builder.query({
      query: () => {
        return{
          url: '/users',
          method: 'GET',
        }},
        providesTags: ["user"]
      }
    ),
    getProfile: builder.query({
      query: () => {
        return{
          url: '/users/me',
          method: 'GET',
        }},
        providesTags: ["user"]
      }
    ),
    updateProfile: builder.mutation({
      query: ( data ) => {        
        return {
          url: '/users/me',
          method: 'PUT',
          body: data, 
        }
      },
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ( {id, data}) => {       
        console.log("redux",id, data);
         
        return {
          url: `/users/${id}`,
          method: 'PUT',
          body: data, 
        }
      },
      invalidatesTags: ["user"],
    })
  })
})

export const { useGetAllUserQuery, useGetProfileQuery, useUpdateProfileMutation, useUpdateUserMutation} = authApi; 