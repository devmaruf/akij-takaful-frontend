import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/redux/reducers/AuthReducer";
import ProjectReducer from "@/redux/reducers/ProjectReducer";
import BranchReducer from "@/redux/reducers/BranchReducer";
import employeeReducer from "@/redux/reducers/employee-reducer";
import designationReducer from "@/redux/reducers/designation-reducer";
import UnderwritingReducer from "@/redux/reducers/underwriting-reducer";
import DashboardReducer from "@/redux/reducers/proposal-dashboard-reducer";
import globalReducer from "@/redux/reducers/global-reducer";
import ProposalsReducer from "@/redux/reducers/proposal-reducer";
import RoleReducer from "@/redux/reducers/role-reducer";
import StampReducer from "@/redux/reducers/stamp-reducer";
import ExpenseReducer from '@/redux/reducers/expense-reducer';
import ProductReducer from "@/redux/reducers/product-reducer";
import StampStockReducer from "@/redux/reducers/stamp-stock-reducer";
import OccupationReducer from "@/redux/reducers/occupation-reducer";
import DivisionReducer from "@/redux/reducers/division-reducer";
import CityReducer from "@/redux/reducers/city-reducer";
import AreaReducer from "@/redux/reducers/area-reducer";

export const store = configureStore({
  reducer: {
    proposal: ProposalsReducer,
    Auth: AuthReducer,
    Project: ProjectReducer,
    Branch: BranchReducer,
    employee: employeeReducer,
    designation: designationReducer,
    underwriting: UnderwritingReducer,
    global: globalReducer,
    dashboard: DashboardReducer,
    stamp: StampReducer,
    role: RoleReducer,
    expense: ExpenseReducer,
    product: ProductReducer,
    stampStock: StampStockReducer,
    occupation: OccupationReducer,
    division: DivisionReducer,
    city: CityReducer,
    area: AreaReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
