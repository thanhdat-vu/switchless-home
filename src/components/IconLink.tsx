import Link from "next/link";

export function IconLink({ icon, to }: { icon: any; to: string }) {
  return (
    <Link
      href={to}
      className="inline-block p-2 rounded-full shadow hover:shadow-md active:bg-gray-100 active:shadow-none"
    >
      {icon}
    </Link>
  );
}
