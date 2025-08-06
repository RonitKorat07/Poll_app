
import {createBrowserRouter} from "react-router-dom";
import App from "../src/App";
import HomePage from "../pages/HomePage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRouter";
import ProfilePage from "../pages/ProfilePage";
import UserPoll from "../pages/user/UserPoll";
import PollDetails from "../components/PollDetails";
import AdminPoll from "../pages/admin/AdminPoll";

export const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "/",
                element : <HomePage/>
            },
            {
                path : "/signup",
                element : <SignUp/>
            },
            {
                path : "/signin",
                element : <SignIn/>
            },
            {
                path : "/profile",
                element : <ProfilePage/>
            },

            // USER routes with PrivateRoute
            {
                element : <PrivateRoute allowedRoles={['voter']}/>, 
                children : [
                    {
                        path : "/poll",
                        element : <UserPoll/>
                    },
                    {
                        path : `/poll/:id`,
                        element : <PollDetails/>
                    }
                ]
            },


            // Admin routes with PrivateRoute
            {
                element : <PrivateRoute allowedRoles={['admin']}/>, 
                children : [
                    {
                        path : "/adminpoll",
                        element : <AdminPoll/>
                    },
                    {
                        path : `/adminpoll/:id`,
                        element : <PollDetails/>
                    }
                ]
            }
        ]
    }
])