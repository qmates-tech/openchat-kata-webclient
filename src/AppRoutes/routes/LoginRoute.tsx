import { LoginPage } from "../../Login/LoginPage";
import { OnlyPublicRoute } from "../OnlyPublicRoute";

export const LoginRoute = () => <OnlyPublicRoute><LoginPage /></OnlyPublicRoute>
