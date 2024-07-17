import RegisterForm from "@/app/components/RegisterForm";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Register() {
    const user = await getCurrentUser();

    if (user) {
        redirect("/");
        return;
    }

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">Register</h1>
                    <p className="text-gray-400">Register for an account</p>
                </div>

                <RegisterForm />
            </div>
        </main>
    )
}