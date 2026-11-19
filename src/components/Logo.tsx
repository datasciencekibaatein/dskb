import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function Logo() {
  const { logo } = siteConfig;
  return (
    <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
      {logo.imageSrc ? (
        <Image src={logo.imageSrc} alt={siteConfig.name} width={36} height={36} className="rounded-full" />
      ) : (
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-xs font-extrabold text-white">
          {logo.shortText}
        </span>
      )}
      <span className="text-base sm:text-lg">{logo.text}</span>
    </Link>
  );
}
