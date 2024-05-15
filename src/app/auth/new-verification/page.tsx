"use client";

import { newVerification } from "@/actions/new-verification";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const NewVerification = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("missing token");
      return;
    }

    newVerification(token)
      .then((res) => {
        setError(res.error);
        setSuccess(res.success);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col justify-between items-center w-[300px] h-[300px] rounded-[12px] p-5 border-2 border-black">
        {!success && error && (
          <p className="px-3 py-2 bg-red-400 rounded-[8px] mb-3">{error}</p>
        )}
        {success && (
          <p className="px-3 py-2 bg-green-300 rounded-[8px] mb-3">{success}</p>
        )}
        <h1>Verification Your Email</h1>
        {!error && <BeatLoader />}
        <Link className="underline" href="/auth/login">
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default NewVerification;
