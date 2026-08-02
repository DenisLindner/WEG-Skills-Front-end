import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({ inverse = false, className }: { inverse?: boolean; className?: string }) {
    return (
        <Link href="/" className={cn("inline-flex shrink-0 items-center rounded-md", className)} aria-label="WEG Skills — início">
            <Image
                src={inverse ? "/assets/icons/Logo WEG Skills Branca.svg" : "/assets/icons/Logo WEG Skills Azul.svg"}
                alt="WEG Skills"
                width={210}
                height={42}
                className="h-8 w-auto sm:h-9"
                priority
            />
        </Link>
    )
}

