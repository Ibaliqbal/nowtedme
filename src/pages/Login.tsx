import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/auth.context";

const Login = () => {
  const user = useContext(AuthContext);
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <section>
        <div
          className="text-white flex gap-4 items-center p-6 text-2xl bg-slate-800 rounded-lg cursor-pointer"
          onClick={() => {
            user?.signIn();
          }}
        >
          <FcGoogle /> SignIn with Google
        </div>
      </section>
    </main>
  );
};

export default Login;
