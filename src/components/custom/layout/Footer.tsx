import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import Logo from "../reuseable/Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-5 border-t border-t-gray-950">
      <section className="container flex flex-col sm:flex-row gap-2 flex-wrap justify-center items-center sm:justify-between">
        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/TahmidAlamJG/"
            target="_blank"
            className="hover:text-pinkish transition-all duration-300"
          >
            <FaFacebook className="text-lg" />
          </a>
          <a
            href="https://bd.linkedin.com/in/mdtahmidalam"
            target="_blank"
            className="hover:text-pinkish transition-all duration-300"
          >
            <FaLinkedin className="text-lg" />
          </a>
          <a
            href="https://github.com/tahmid122"
            target="_blank"
            className="hover:text-pinkish transition-all duration-300"
          >
            <FaGithub className="text-lg" />
          </a>
        </div>
        {/* copyright text */}
        <p className="text-sm">
          &copy; All rights reserved by{" "}
          <Link href={"/"} className="underline">
            Event SMT
          </Link>
        </p>
      </section>
    </footer>
  );
};

export default Footer;
