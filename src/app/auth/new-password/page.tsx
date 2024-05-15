"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewPasswordSchema } from "@/schemas/schemas";
import { useState, useTransition } from "react";
import { NewPasswordZodFormType } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

const NewPasswordPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewPasswordZodFormType>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: NewPasswordZodFormType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(data, token)
        .then((res) => {
          setError(res?.error);
          setSuccess(res?.success);
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
            errors.password ? "border-red-600 placeholder:text-red-600" : ""
          }`}
          type="password"
          placeholder={
            errors.password ? `${errors.password.message}` : "Reset Password"
          }
          {...register("password")}
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
          {isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default NewPasswordPage;
