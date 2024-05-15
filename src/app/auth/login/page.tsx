"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/schemas";
import { login } from "@/actions/auth";
import { useState, useTransition } from "react";
import { LoginZodFormType } from "@/types/types";
import Link from "next/link";
import Social from "../Social";

const Login = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [twoFactor, setTwoFactor] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginZodFormType>({
    resolver: zodResolver(LoginSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: LoginZodFormType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(data)
        .then((res) => {
          if (res?.error) {
            reset();
            setError(res?.error);
          }

          if (res?.success) {
            reset();
            setSuccess(res?.success);
          }

          if (res?.twoFactor) {
            setTwoFactor(true);
          }
        })
        .catch(() => {
          setError("Something went error");
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
        {!twoFactor ? (
          <>
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
              className={`w-full h-10 border-2 border-black rounded-[8px] text-base px-3 ${
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
          </>
        ) : (
          <input
            className={`w-full h-10 border-2 border-black rounded-[8px] text-base px-3 ${
              errors.code ? "border-red-600 placeholder:text-red-600" : ""
            }`}
            type="string"
            placeholder={errors.code ? `${errors.code.message}` : "123456"}
            {...register("code")}
            disabled={isPending}
          />
        )}
        {error && (
          <p className="pl-3 py-2 mt-5 bg-red-400 rounded-[8px] mb-3">
            {error}
          </p>
        )}
        {success && (
          <p className="pl-3 mt-5 py-2 bg-green-300 rounded-[8px] mb-3">
            {success}
          </p>
        )}
        <Link className="mb-5 mt-2 font-medium" href="/auth/reset">
          Forgot password?
        </Link>
        <button
          disabled={isPending}
          type="submit"
          className="w-full h-10 bg-black text-white rounded-[8px]"
        >
          {isPending ? "Wait..." : twoFactor ? "Confirm" : "Login"}
        </button>
        <Social />
        <div className="mt-5">
          <Link href="/auth/register">Don't have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
