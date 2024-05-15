"use client";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";

const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="mt-5 flex items-center justify-between gap-5">
      <button
        type="button"
        onClick={() => onClick("google")}
        className="w-1/2 h-10 border-2 border-black rounded-[8px] text-base font-semibold"
      >
        Google
      </button>
      <button
        type="button"
        onClick={() => onClick("github")}
        className="w-1/2 h-10 border-2 border-black rounded-[8px] text-base font-semibold"
      >
        GitHub
      </button>
    </div>
  );
};

export default Social;
