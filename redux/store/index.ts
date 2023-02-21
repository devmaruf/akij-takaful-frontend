import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../reducers/AuthReducer';
import ProjectReducer from '../reducers/ProjectReducer';
import ProposalsReducer from './../reducers/ProposalsReducer';
import BranchReducer from './../reducers/BranchReducer';
import employeeReducer from '../reducers/employee-reducer';
import designationReducer from '../reducers/designation-reducer';

export const store = configureStore({
    reducer: {
        Proposal   : ProposalsReducer,
        Auth       : AuthReducer,
        Project    : ProjectReducer,
        Branch     : BranchReducer,
        employee   : employeeReducer,
        designation: designationReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;