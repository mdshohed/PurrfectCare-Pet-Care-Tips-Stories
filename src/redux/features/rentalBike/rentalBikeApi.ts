import { baseApi } from "../../api/baseApi";

const rentalBikeApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    getAllRental: builder.query({
      query: () => ({
          url: '/rentals',
          method: 'GET',
        }),
        providesTags: ["rentalBike", 'bikes']
      }
    ),

    bikeIsAvailable: builder.query({
      query: (id) => ({
          url: '/rentals/bikeIsAvailable',
          method: 'GET',
          data: {bikeId:id}
        }),
        providesTags: ["rentalBike", 'bikes']
      }
    ),
    createRental: builder.mutation({
      query: (newRental) => ({
        url: "/rentals",
        method: "POST",
        body: newRental,
      }),
      invalidatesTags: ["rentalBike", 'bikes'],
    }),
    updateRental: builder.mutation({
      query: (payload) => {
        console.log("Payload", payload.id);
        
        return {
          url: `/rentals/${payload.id}`,
          method: "PUT",
          body: payload,
      }},
      invalidatesTags: ["rentalBike", 'bikes'],
    }),
  })
})

export const { 
  useCreateRentalMutation,
  useGetAllRentalQuery,
  useUpdateRentalMutation,
  useBikeIsAvailableQuery
 } = rentalBikeApi; 
