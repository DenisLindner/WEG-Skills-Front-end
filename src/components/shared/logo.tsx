import Image from "next/image"
import Link from "next/link"

type LogoProps = {
  inverse?: boolean
  className?: string
}

export function Logo({ inverse = false, className }: LogoProps) {
  const src = inverse
    ? "/assets/icons/Logo WEG Skills Branca.svg"
    : "/assets/icons/Logo WEG Skills Azul.svg"

  return (
    <Link href="/" className="inline-block">
      <Image
        src={src}
        alt="WEG Skills Logo"
        width={140}
        height={36}
        className={`h-8 w-auto object-contain ${className ?? ""}`}
        priority
      />
    </Link>
  )
}
