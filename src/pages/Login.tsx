import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/auth.context";

const Login = () => {
  const context = useContext(AuthContext);
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <section>
        {context?.userIqbal ? (
          <div
            className="text-white flex gap-4 items-center p-6 text-2xl bg-slate-800 rounded-lg cursor-pointer"
            onClick={() => {
              context.signOut();
            }}
          >
            <h1>username {context.userIqbal.displayName}</h1>
            Logout
          </div>
        ) : (
          <div
            className="text-white flex gap-4 items-center p-6 text-2xl bg-slate-800 rounded-lg cursor-pointer"
            onClick={() => {
              context?.signIn();
            }}
          >
            <FcGoogle /> SignIn with Google
          </div>
        )}
      </section>
    </main>
  );
};

export default Login;
