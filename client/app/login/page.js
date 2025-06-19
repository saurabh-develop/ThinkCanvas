import LoginCard from "@/components/login/Login.js";
import Image from "next/image";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center font-sans bg-gradient-to-br from-[#1e1e2f] via-[#2c2c3e] to-[#1e1e2f] relative overflow-hidden px-4">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:20px_20px]" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center max-w-6xl w-full gap-12">
        <div className="flex flex-col items-start text-white max-w-md">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/logo.png"
              alt="Think Canvas"
              width={250}
              height={250}
              priority
            />
          </div>
          <h2 className="text-4xl font-extrabold mb-4">
            Unleash your creativity.
          </h2>
          <p className="text-gray-300 text-lg">
            Think freely. Design collaboratively. Turn your ideas into reality
            with Think Canvas.
          </p>
        </div>

        <div className="w-full max-w-md">
          <LoginCard />
        </div>
      </div>
    </div>
  );
}

export default Login;
