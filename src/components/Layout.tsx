import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/SwitchlessHome-Logo.svg";
import {
  MagnifyingGlass,
  ShoppingCartSimple,
  User,
} from "@phosphor-icons/react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

function Header() {
  return (
    <>
      <DesktopHeader />
    </>
  );
}

function DesktopHeader() {
  const menu = {
    items: [
      {
        id: 1,
        to: "/",
        label: "Home",
      },
      {
        id: 2,
        to: "/shop",
        label: "Shop",
      },
      {
        id: 3,
        to: "/blog",
        label: "Blog",
      },
      {
        id: 4,
        to: "/about",
        label: "About",
      },
      {
        id: 5,
        to: "/contact",
        label: "Contact",
      },
    ],
    actions: [
      {
        id: 1,
        to: "/search",
        icon: <MagnifyingGlass size={24} />,
      },
      {
        id: 2,
        to: "/cart",
        icon: <ShoppingCartSimple size={24} />,
      },
      {
        id: 3,
        to: "/account",
        icon: <User size={24} />,
      },
    ],
  };
  return (
    <header>
      <div className="flex justify-between items-center px-5 py-2">
        <div className="w-40">
          <Link href="/">
            <Image src={Logo} alt="Switchless Home Logo" width={79} />
          </Link>
        </div>
        <nav className="space-x-16">
          {(menu.items || []).map((item) => (
            <Link
              key={item.id}
              href={item.to}
              className="font-normal hover:text-blue-600 hover:font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex space-x-5">
          {(menu.actions || []).map((action) => (
            <Link
              href={action.to}
              key={action.id}
              className="p-2 rounded-full shadow hover:bg-gray-50 hover:shadow-md active:bg-gray-100 active:shadow-none"
            >
              {action.icon}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
