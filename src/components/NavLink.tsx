import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  end?: boolean;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
}

const NavLink = ({ className, activeClassName = 'active', children, ...props }: NavLinkProps) => {
  return (
    <RouterNavLink
      className={({ isActive }) => 
        cn(className, isActive ? activeClassName : "")
      }
      {...props}
    >
      {children}
    </RouterNavLink>
  );
};

export default NavLink;