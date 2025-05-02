"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

type Props = {
    blogId: string,
    styles?: string
}
const defaultStyles = "text-red-600 hover:text-red-900 cursor-pointer hover:underline"
export default function RemoveBlog({ blogId, styles }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleClick = async (blogId: string) => {
        const confirmed = window.confirm("Are you sure want to delete?")
        if (!confirmed) {
            return
        }
        setIsDeleting(true);
        setError(null);

        try {
            const response = await fetch(`/api/blogs/${blogId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete blog post');
            }
            toast.success("Blog deleted successfully!")
            router.push("/dashboard/blogs")
            router.refresh(); // Refresh the page to show the updated data
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            toast(error)
            setIsDeleting(false);
        }
    }
    return (
        <button
            onClick={() => handleClick(blogId)}
            className={styles ? styles : defaultStyles}
        >
            {isDeleting ? <FaSpinner className="animate-spin text-2xl text-gray-100" /> : "Delete"}
        </button>

    )
}