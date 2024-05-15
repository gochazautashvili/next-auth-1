import Link from "next/link";

const AuthError = () => {
  return (
    <div>
      <h1>This Is Error Page </h1>
      <Link href="/auth/login">Return Login Page</Link>
    </div>
  );
};

export default AuthError;
