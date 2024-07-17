import PostForm from "../../components/PostForm";

export default function Create() {
    return (
        <main className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                <h1>Create New Post</h1>

                <PostForm />
            </div>
        </main>
    );
}