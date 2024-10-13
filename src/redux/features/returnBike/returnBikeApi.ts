import { baseApi } from "../../api/baseApi";

const returnBikeApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    returnBike: builder.mutation({
      query: ({ id, updatedRental }) => ({
          url: `/rentals/${id}/return`,
          method: "PUT",
          body: updatedRental,
      }),
      invalidatesTags: ["rentalBike", 'bikes'],
    }),
  })
})

export const { 
  useReturnBikeMutation,
 } = returnBikeApi; 
