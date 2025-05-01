"use client"

import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

type Props = {
    href: string,
    text?: string
}

export default function Redirection({ href, text = "Back to list" }: Props) {
    return (
        <Link
            href={href}
            className="flex gap-x-2 text-gray-600 dark:text-gray-100"
        >
            <ArrowLeftIcon />
            <span >{text}</span>
        </Link>
    )
}