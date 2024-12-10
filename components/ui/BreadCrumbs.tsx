import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"; // Correct import
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Breadcrumb {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex text-sm font-medium text-gray-700 mb-4"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          <Link href={breadcrumb.href} className="hover:text-green-500">
            {breadcrumb.name}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <span className="mx-2 text-gray-400">
              <FontAwesomeIcon
                icon={faChevronRight as IconProp}
                className="h-3 w-3 text-gray-500"
              />
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
