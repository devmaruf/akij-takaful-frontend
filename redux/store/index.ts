import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../reducers/AuthReducer';
import ProposalsReducer from './../reducers/ProposalsReducer';

export const store = configureStore({
    reducer: {
        proposal: ProposalsReducer,
        Auth: AuthReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;