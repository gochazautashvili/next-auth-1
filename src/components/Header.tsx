import { signOut } from "@/auth";
import { currentUser } from "@/lib/currentUser";
import Link from "next/link";

const Header = async () => {
  const user = await currentUser();

  return (
    <header className="w-full bg-slate-200 mb-5">
      <nav className="w-full max-w-[1200px] mx-auto p-5 flex justify-between">
        <ul className="flex items-center gap-10 font-semibold text-base">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/order">Order</Link>
          </li>
          <li>
            User: <span className="font-medium">{user?.name}</span>
          </li>
        </ul>
        {user && (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              className="px-3 py-1 bg-black text-white rounded-[8px]"
              type="submit"
            >
              Logout
            </button>
          </form>
        )}
      </nav>
    </header>
  );
};

export default Header;
