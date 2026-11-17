import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { services } from "@/lib/services";

type ServicesDropdownProps = {
  className?: string;
};

export default function ServicesDropdown({ className = "" }: ServicesDropdownProps) {
  return (
    <details className={`services-menu ${className}`.trim()}>
      <summary>
        Services <ChevronDown aria-hidden="true" size={15} />
      </summary>
      <div className="services-menu-list">
        <Link href="/services">All services</Link>
        {services.map((service) => (
          <Link href={`/pricing/${service.slug}`} key={service.slug}>
            {service.title}
          </Link>
        ))}
      </div>
    </details>
  );
}
