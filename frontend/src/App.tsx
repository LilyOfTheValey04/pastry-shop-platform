import { Route } from "./routes/register";

export default function App() {

    const RegisterPage = Route.options.component!;
    return <RegisterPage />;
}
