import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/Logo.svg";
import TrustBadges from "@/assets/TrustBadges.svg";
import Visa from "@/assets/Visa.svg";
import MasterCard from "@/assets/MasterCard.svg";
import PayPal from "@/assets/PayPal.svg";
import ApplePay from "@/assets/ApplePay.svg";
import GooglePay from "@/assets/GooglePay.svg";
import {
  MagnifyingGlass,
  ShoppingCartSimple,
  User,
  PaperPlaneTilt,
  TiktokLogo,
  TwitterLogo,
  YoutubeLogo,
  FacebookLogo,
  InstagramLogo,
} from "@phosphor-icons/react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-gray-900 antialiased">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
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
          <Link href="/" className="inline-block">
            <Image src={Logo} alt="Switchless Home Logo" width={79} />
          </Link>
        </div>
        <nav className="space-x-16">
          {menu.items.map((item) => (
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
          {menu.actions.map((action) => (
            <Link
              href={action.to}
              key={action.id}
              className="p-2 rounded-full shadow hover:shadow-md active:bg-gray-50 active:shadow-none"
            >
              {action.icon}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const footer = {
    quickLinks: [
      {
        id: 1,
        title: "Company",
        items: [
          {
            id: 1,
            to: "/about",
            label: "About Us",
          },
          {
            id: 2,
            to: "/careers",
            label: "Careers",
          },
          {
            id: 3,
            to: "/privacy-policy",
            label: "Privacy Policy",
          },
          {
            id: 4,
            to: "/terms-and-conditions",
            label: "Terms & Conditions",
          },
        ],
      },
      {
        id: 2,
        title: "Services",
        items: [
          {
            id: 1,
            to: "/about",
            label: "About Us",
          },
          {
            id: 2,
            to: "/careers",
            label: "Careers",
          },
          {
            id: 3,
            to: "/privacy-policy",
            label: "Privacy Policy",
          },
          {
            id: 4,
            to: "/terms-and-conditions",
            label: "Terms & Conditions",
          },
        ],
      },
    ],
    socialMedia: [
      {
        id: 1,
        to: "tiktok.com",
        icon: <TiktokLogo size={24} className="text-pink-500" />,
      },
      {
        id: 2,
        to: "twitter.com",
        icon: <TwitterLogo size={24} className="text-blue-500" />,
      },
      {
        id: 3,
        to: "youtube.com",
        icon: <YoutubeLogo size={24} className="text-red-500" />,
      },
      {
        id: 4,
        to: "facebook.com",
        icon: <FacebookLogo size={24} className="text-blue-700" />,
      },
      {
        id: 5,
        to: "instagram.com",
        icon: <InstagramLogo size={24} className="text-pink-400" />,
      },
    ],
  };
  return (
    <div className="bg-gray-50 p-10">
      <div className="flex justify-between">
        <div>
          <Link href="/" className="inline-block">
            <Image src={Logo} alt="Switchless Home Logo" width={79} />
          </Link>
        </div>
        <div className="w-80 space-y-3">
          <h3 className="font-semibold">
            Smart home solutions for a seamless life.
          </h3>
          <p className="text-sm text-justify">
            Transform your home with smart devices. Shop now for a connected and
            energy-efficient space. Start shopping today!
          </p>
          <Image
            src={TrustBadges}
            alt="Trust Badges"
            width={320}
            className="mx-auto"
          />
        </div>
        {footer.quickLinks.map((quickLink) => (
          <div key={quickLink.id} className="space-y-4">
            <h3 className="font-semibold">{quickLink.title}</h3>
            <ul className="space-y-4">
              {(quickLink.items || []).map((item) => (
                <li key={item.id}>
                  <Link href={item.to} className="hover:text-blue-600">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="text-right space-y-10">
          <div>
            <h3 className="font-medium mb-2">
              Sign up to get 10% off your first order
            </h3>
            <form className="flex w-80 bg-white border border-gray-200 rounded-lg shadow">
              <input
                type="text"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-transparent border-none focus:outline-none"
              />
              <button
                aria-label="Sign Up"
                className="p-2 m-0 hover:text-blue-600"
              >
                <PaperPlaneTilt size={24} weight={"light"} />
              </button>
            </form>
          </div>
          <div>
            <h3 className="font-medium mb-1">Follow Us</h3>
            {footer.socialMedia.map((socialMedia) => (
              <Link
                key={socialMedia.id}
                href={socialMedia.to}
                className={`inline-block p-2 ml-3 rounded-full shadow hover:bg-gray-50 hover:shadow-md active:bg-gray-100 active:shadow-none`}
              >
                {socialMedia.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <hr className="h-px mt-8 mb-4 bg-gray-200 border-0" />
      <div className="flex justify-between items-center">
        <p className="text-sm">Copyright &copy; 2023 - All Rights Reserved</p>
        <div className="flex space-x-2">
          <PaymentLogo src={Visa} alt="Visa Logo" />
          <PaymentLogo src={MasterCard} alt="MasterCard Logo" />
          <PaymentLogo src={PayPal} alt="PayPal Logo" />
          <PaymentLogo src={ApplePay} alt="Apple Pay Logo" />
          <PaymentLogo src={GooglePay} alt="Google Pay Logo" />
        </div>
      </div>
    </div>
  );
}

function PaymentLogo({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} height={40} />;
}
