import { configureStore } from '@reduxjs/toolkit'
import CounterSlice from './../slices/CounterSlice';
import ProposalsReducer from './../reducers/ProposalsReducer';

export const store = configureStore({
    reducer: {
        counter: CounterSlice,
        proposal: ProposalsReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;