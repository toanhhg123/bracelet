import Link from "next/link";
import { FaRegBell } from "react-icons/fa6";
import { RiSearch2Line } from "react-icons/ri";

import Input from "@/shared/Input/Input";
import Logo from "@/shared/Logo/Logo";
import { LINKS } from "@/utils/AppConfig";

import CartSideBar from "../CartSideBar";
import MenuBar from "./MenuBar";
import UserDropdown from "./UserDropdown";

const MainNav = () => {
  return (
    <div className="container flex items-center justify-between py-4">
      <div className="flex-1 lg:hidden">
        <MenuBar />
      </div>
      <div className="flex items-center gap-5 lg:basis-3/5">
        <Logo />
        <div className="hidden w-full max-w-2xl items-center gap-5 rounded-full border border-neutral-300 py-1 pr-3 lg:flex">
          <Input
            type="text"
            className="border-transparent bg-white placeholder:text-neutral-500 focus:border-transparent"
            placeholder="try 'Nike Air Jordan'"
          />
          <RiSearch2Line className="text-2xl text-neutral-500" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-5">
        <div className="relative hidden lg:block">
          <span className="absolute -top-1/4 left-3/4 aspect-square w-3 rounded-full bg-red-600" />
          <FaRegBell className="text-2xl" />
        </div>

        <div className="flex items-center divide-x divide-neutral-300">
          <CartSideBar />
          <div className="flex items-center gap-2 pl-5">
            <UserDropdown />
            <Link href={LINKS.LOGIN} className="!hidden text-sm lg:block">
              Đăng Nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
