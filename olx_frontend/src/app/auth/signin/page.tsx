import { AuthHeader } from "@/components/auth/authHeader"
import { LoginForm } from "@/components/auth/LoginForm"

export default () => {
    return (
        <>
        <AuthHeader title="Login"/>
        <LoginForm />
        </>
    )
}