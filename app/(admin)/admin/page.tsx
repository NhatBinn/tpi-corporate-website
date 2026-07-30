"use client";

import { signUp } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, loginSchema } from "@/schemas/Login";
import { useActionState, useEffect, useRef } from "react";
import { ChkLoginForm } from "./actions/auth";
import { LoginActionState } from "@/types/common";
import { useRouter } from "next/navigation";
import SubmitLoginBtn from "@/components/admin/SubmitLoginBtn";

const initialState: LoginActionState = {};

function LoginPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(ChkLoginForm, initialState);
  const {
    register,
    trigger,
    reset,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const registerAdminUser = async () => {
    const { data, error } = await signUp.email({
      name: "Papa Kim",
      email: "papa.kim@TPI.com",
      password: "password1234",
    });

    console.log("data: ", data);
    console.log("error: ", error);
    alert("OK!!!");
  };

  const getAdminUser = async () => {
    await navigator.clipboard.writeText("papa.kim@TPI.com");
  };

  const getAdminUserPassword = async () => {
    await navigator.clipboard.writeText("password1234");
  };

  useEffect(() => {
    if (state.success) {
      reset();
      router.push("/admin/dashboard");
    }
  }, [state.success, reset, router]);

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#0a0d12] px-4 py-16">
      {/* nền gradient nhiều lớp cho chiều sâu */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(202,160,76,0.10) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(63,94,140,0.10) 0%, transparent 50%), linear-gradient(180deg, #0d1119 0%, #07090d 100%)",
        }}
      />
      {/* lưới hairline mờ tạo texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* monogram */}
        <div className="mx-auto mb-8 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
          <span className="text-[13px] font-bold tracking-wide text-[#caa04c]">
            TPI
          </span>
        </div>

        {/* card chính */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-10 shadow-[0_25px_70px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm">
          {/* hairline accent trên đỉnh card */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#caa04c]/60 to-transparent" />

          <div className="mb-9 text-center">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
              Admin Portal
            </p>
            <h1 className="font-serif text-[28px] leading-tight text-white">
              Đăng nhập quản trị
            </h1>
          </div>

          <form ref={formRef} action={formAction} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="papa.kim@TPI.com"
                {...register("email")}
                className="w-full border-b border-white/15 bg-transparent pb-3 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#caa04c]"
              />
              {errors.email && (
                <p className="mt-2 text-[12px] text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="w-full border-b border-white/15 bg-transparent pb-3 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#caa04c]"
              />
              {errors.password && (
                <p className="mt-2 text-[12px] text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <SubmitLoginBtn onValidate={trigger} formRef={formRef} />
          </form>
        </div>

        {/* khu vực dev-only, tách biệt hẳn khỏi card đăng nhập thật */}
        <div className="mt-6 rounded-xl border border-dashed border-white/10 p-4">
          <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/30">
            Dev only
          </p>
          <button
            onClick={registerAdminUser}
            className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[12px] font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white/80"
          >
            Tạo user admin thử nghiệm
          </button>

          <button
            onClick={getAdminUser}
            className="my-2.5 w-full cursor-pointer rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[12px] font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white/80"
          >
            Get user admin thử nghiệm
          </button>

          <button
            onClick={getAdminUserPassword}
            className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[12px] font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white/80"
          >
            Get user admin password thử nghiệm
          </button>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
