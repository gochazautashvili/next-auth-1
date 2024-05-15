"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetSchema } from "@/schemas/schemas";
import { useState, useTransition } from "react";
import { ResetZodFormType } from "@/types/types";
import Link from "next/link";
import { reset } from "@/actions/reset";

const ResetPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetZodFormType>({
    resolver: zodResolver(ResetSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: ResetZodFormType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(data)
        .then((res) => {
          setError(res.error);
          setSuccess(res.success);
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-[600px] mx-auto border-2 border-black rounded-[12px] px-7 pb-8 pt-5"
      >
        <h1 className="text-xl text-center font-bold mb-10 border-b-2 border-black pb-4">
          Go Your Account And Order Food
        </h1>
        <input
          className={`w-full h-10 border-2 border-black rounded-[8px] text-base px-3 mb-5 ${
            errors.email ? "border-red-600 placeholder:text-red-600" : ""
          }`}
          type="email"
          placeholder={
            errors.email ? `${errors.email.message}` : "Enter Your Email"
          }
          {...register("email")}
          disabled={isPending}
        />
        {error && (
          <p className="pl-3 py-2 bg-red-400 rounded-[8px] mb-3">{error}</p>
        )}
        {success && (
          <p className="pl-3 py-2 bg-green-300 rounded-[8px] mb-3">{success}</p>
        )}
        <button
          disabled={isPending}
          type="submit"
          className="w-full h-10 bg-black text-white rounded-[8px]"
        >
          {isPending ? "Sending..." : "Send reset email"}
        </button>
        <div className="mt-5">
          <Link href="/auth/login">Go back!</Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPage;
