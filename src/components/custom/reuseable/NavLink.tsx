import Link from "next/link";
import { IconType } from "react-icons/lib";
interface Props {
  text: string;
  link?: string;
  icon: React.ReactNode;
}
const NavLink = ({ text, link = "/", icon }: Props) => {
  return (
    <Link
      href={link}
      className="font-semibold uppercase text-sm hover:text-pinkish transition-all duration-300 flex items-center gap-1"
    >
      {icon} {text}
    </Link>
  );
};

export default NavLink;
