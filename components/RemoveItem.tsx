"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

type Props = {
    api: string,
    redirectUrl: string,
    styles?: string
}
const defaultStyles = "text-red-600 hover:text-red-900 cursor-pointer hover:underline"

export default function RemoveItem({api, redirectUrl, styles }: Props) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleClick = async () => {
        const confirmed = window.confirm("Are you sure want to delete?")
        if (!confirmed) {
            return
        }
        setIsDeleting(true);
        setError(null);

        try {
            const response = await fetch(api, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete');
            }
            toast.success("Item deleted successfully!")
            router.push(redirectUrl)
            router.refresh(); // Refresh the page to show the updated data
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            toast(error)
            setIsDeleting(false);
        }
    }
    return (
        <button
            onClick={() => handleClick()}
            className={styles ? styles : defaultStyles}
        >
            {isDeleting ? <FaSpinner className="animate-spin text-2xl text-gray-100" /> : "Delete"}
        </button>

    )
}