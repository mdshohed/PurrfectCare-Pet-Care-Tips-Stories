import { baseApi } from "../../api/baseApi";

const CouponsApi = baseApi.injectEndpoints({
  endpoints: (builder) =>( {
    getAllCoupon: builder.query({
      query: () => ({
          url: '/coupons',
          method: 'GET',
        }),
        providesTags: ["coupon"]
      }
    ),
    addCoupon: builder.mutation({
      query: (newCoupon) => ({
        url: "/coupons",
        method: "POST",
        body: newCoupon,
      }),
      invalidatesTags: ["coupon"],
    }),

    updateCoupon: builder.mutation({
      query: ({ id, data }) => ({
          url: `/coupons/${id}`,
          method: "PUT",
          body: data,
      }),
      invalidatesTags: ["coupon"],
    }),

    deleteCoupon: builder.mutation({
      query: ( id ) => ({
          url: `/coupons/${id}`,
          method: "DELETE",
      }),
      invalidatesTags: ["coupon"],
    }),
  })
})

export const { 
  useAddCouponMutation, useUpdateCouponMutation, useGetAllCouponQuery, useDeleteCouponMutation
 } = CouponsApi; 
