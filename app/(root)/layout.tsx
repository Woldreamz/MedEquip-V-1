import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex flex-col md:flex-row h-0">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content (children will be the content of your pages) */}
      <div className="flex flex-col w-full">{children}</div>{" "}
      {/* Ensure space for the sidebar */}
    </div>
  );
};

export default Layout;
