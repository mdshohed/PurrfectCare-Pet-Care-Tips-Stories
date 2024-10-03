import { baseApi } from "../../api/baseApi";

const bikesApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    getAllBikes: builder.query({
      query: () => ({
          url: '/bikes',
          method: 'GET',
        }),
        providesTags: ["bikes", 'rentalBike']
      }
    ),
    getSingleBikesAndBikeStatus: builder.query({
      queryFn: async (id: string): Promise<any> => {
        try {
          const [singleBike, bikeStatus] = await Promise.all([
            fetch(`https://bike-rental-reservation-system-server-seven.vercel.app/api/bikes/${id}`),
            fetch(`https://bike-rental-reservation-system-server-seven.vercel.app/api/rentals/bikeIsAvailable/${id}`),
          ]);
    
          if (!singleBike.ok || !bikeStatus.ok) {
            throw new Error("Something went wrong!");
          }
    
          const [singleBikeData, bikeStatusData] = await Promise.all([
            singleBike.json(), 
            bikeStatus.json()
          ]);
    
          return {
            data: {
              singleBike: singleBikeData,
              bikeStatus: bikeStatusData,
            },
          };
        } catch (err) {
          return { error: { message: "An error occurred" } };
        }
      },
      providesTags: ["bikes"],
    }),
    
    getSingleBikes: builder.query({
      query: (id) => {
        return {
          url: `/bikes/${id}`,
          method: "GET",
        };
      },
      providesTags: ["bikes", 'rentalBike'],
    }),
    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bikes", 'rentalBike'],
    }),
    addBike: builder.mutation({
      query: (newBike) => ({
        url: "/bikes",
        method: "POST",
        body: newBike,
      }),
      invalidatesTags: ["bikes",'rentalBike'],
    }),
    updateBike: builder.mutation({
      query: ({ id, updatedBike }) => ({
          url: `/bikes/${id}`,
          method: "PUT",
          body: updatedBike,
      }),
      invalidatesTags: ["bikes",'rentalBike'],
    }),
  })
})

export const { 
  useGetAllBikesQuery,
  useGetSingleBikesQuery,
  useAddBikeMutation,
  useUpdateBikeMutation,
  useDeleteBikeMutation,
  useGetSingleBikesAndBikeStatusQuery
 } = bikesApi; 
