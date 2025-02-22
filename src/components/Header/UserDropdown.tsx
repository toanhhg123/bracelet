"use client";

import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import avatar from "@/images/avatar.png";
import { LINKS } from "@/utils/AppConfig";

const options = [
  {
    name: "Tài khoản",
    url: LINKS.PROFILE,
  },
  {
    name: "Giỏ hàng",
    url: LINKS.CART,
  },
  {
    name: "Quản lí sản phẩm",
    url: LINKS.MANAGER_PRODUCT,
  },
  {
    name: "Quản lí người dùng",
    url: LINKS.USER_MANAGER,
  },
  {
    name: "Quản lí đơn hàng",
    url: LINKS.ORDER_MANAGER,
  },
  {
    name: "Đăng xuất",
    url: LINKS.LOGOUT,
  },
];

const UserDropdown = () => {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="ttnc-ButtonCircle flex size-10 items-center justify-center overflow-hidden rounded-full !leading-none focus:ring-transparent disabled:bg-opacity-70">
        <Image
          src={avatar}
          alt="avatar"
          className="size-full object-cover object-center"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="divide-gray-100 absolute right-0 mt-2 min-w-max origin-top-right divide-y rounded-md bg-[#101010] p-2 shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="flex flex-col">
            {options.map((item) => (
              <Link
                href={item.url}
                key={item.url}
                type="button"
                className="w-full px-3 py-1 text-left text-white focus:outline-none"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
