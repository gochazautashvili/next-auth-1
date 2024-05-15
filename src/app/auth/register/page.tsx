"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/schemas";
import { registerAction } from "@/actions/auth";
import { useState, useTransition } from "react";
import { LoginZodFormType } from "@/types/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Social from "../Social";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginZodFormType>({
    resolver: zodResolver(LoginSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: LoginZodFormType) => {
    setError("");
    startTransition(() => {
      registerAction(data).then((res) => {
        if (!res.success) {
          setError(res.message);
        } else {
          router.push("/auth/login");
        }
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
          Create Account And Order Food
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
        <input
          className={`w-full h-10 border-2 border-black rounded-[8px] text-base px-3 mb-5 ${
            errors.name ? "border-red-600 placeholder:text-red-600" : ""
          }`}
          type="text"
          placeholder={
            errors.name ? `${errors.name.message}` : "Enter Your Name"
          }
          {...register("name")}
          disabled={isPending}
        />
        <input
          className={`w-full h-10 border-2 border-black rounded-[8px] text-base px-3 mb-5 ${
            errors.password ? "border-red-600 placeholder:text-red-600" : ""
          }`}
          type="password"
          placeholder={
            errors.password
              ? `${errors.password.message}`
              : "Enter Your Password"
          }
          {...register("password")}
          disabled={isPending}
        />
        {error && (
          <p className="pl-3 py-2 bg-red-400 rounded-[8px] mb-3">{error}!</p>
        )}
        <button
          disabled={isPending}
          type="submit"
          className="w-full h-10 bg-black text-white rounded-[8px]"
        >
          {isPending ? "Creating..." : "Create an account"}
        </button>
        <Social />
        <div className="mt-5">
          <Link href="/auth/login">You have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
