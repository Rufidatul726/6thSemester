import { apiSlice } from "./apislice";
const POSTS_URL = "/api/posts";

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => ({
                url: `${POSTS_URL}`,
                method: 'GET',
            }),
        }),
        getPost: builder.query({
            query: (id) => ({
                url: `${POSTS_URL}/${id}`,
                method: 'GET',
            }),
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: `${POSTS_URL}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: {
                    content: data.content,
                    postImage: data.selectedFile,
                }
            }),
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useCreatePostMutation,
} = postsApiSlice;
