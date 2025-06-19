"use client";

import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

function LoginCard() {
  return (
    <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-10 w-full transition-all duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Login to Think Canvas</h2>
        <p className="text-sm text-gray-200 mt-2">
          Collaborate & create amazing ideas
        </p>
      </div>

      <Button
        variant="outline"
        className="w-full border-white/40 hover:border-[#8b3dff] text-white hover:text-[#8b3dff] bg-white/10 hover:bg-white/20 transition-all duration-300 py-5 px-6 rounded-xl flex items-center justify-center gap-3"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <div className="bg-white p-2 rounded-full flex items-center justify-center shadow-sm">
          <LogIn className="w-5 h-5 text-gray-700 group-hover:text-[#8b3dff] transition-colors duration-300" />
        </div>
        <span className="font-semibold">Continue with Google</span>
      </Button>

      <div className="mt-6 text-center text-gray-300 text-xs">
        By signing in, you agree to Think Canvas’s{" "}
        <span className="underline hover:text-white cursor-pointer">Terms</span>{" "}
        and{" "}
        <span className="underline hover:text-white cursor-pointer">
          Privacy Policy
        </span>
        .
      </div>
    </div>
  );
}

export default LoginCard;
