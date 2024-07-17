import LoginForm from "@/app/components/LoginForm";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

export default async function Login() {
    const user = await getCurrentUser();

    if (user) {
        redirect("/");
        return;
    }

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <p className="text-gray-400">Login to your account</p>
                </div>

                <LoginForm />
            </div>
        </main>
    )
}