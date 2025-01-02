import { apiSlice } from "./apiSlice"

const todoApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTodos: build.query({
            query: () => ({
                url: "/api/todo"
            }),
            providesTags: ["Todos"],
        }),
        getTodo: build.query({
            query: (id) => ({
                url: `/api/todo/${id}`
            }),
        }),
        addTodo: build.mutation({
            query: (data) => ({
                url: "/api/todo",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Todos"],
        }),
        deleteTodo: build.mutation({
            query: (data) => ({
                url: `/api/todo/${data.id}`,
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["Todos"],
        }),
        updateTodo: build.mutation({
            query: (data) => ({
                url: `/api/todo/${data.id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Todos"],
        }),
    }),
})

export const { useGetTodosQuery, useGetTodoQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } = todoApiSlice;