import { FaFacebookF, FaTiktok } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/lib/constants";

const ICONS = { Facebook: FaFacebookF, TikTok: FaTiktok };

interface SocialLinksProps {
  className?: string;
  linkClassName?: string;
  iconSize?: number;
  brandColors?: boolean;
}

export default function SocialLinks({
  className,
  linkClassName,
  iconSize = 16,
  brandColors = false,
}: SocialLinksProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {SOCIAL_LINKS.map(({ name, href, brandClass }) => {
        const Icon = ICONS[name];
        return (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} TPI`}
            className={cn(
              "flex items-center justify-center rounded-full transition-all duration-300",
              brandColors && brandClass,
              linkClassName,
            )}
          >
            <Icon size={iconSize} />
          </a>
        );
      })}
    </div>
  );
}
