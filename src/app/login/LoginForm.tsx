"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/authSlice";
import { useAppDispatch } from "@/redux/store";
import { TLoginSignup } from "@/types/loginSingup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export default function SignupForm() {
  // rtk
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [credential, setCredential] = useState<TLoginSignup>({
    email: "",
    password: "",
  });
  //   handle submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await loginUser(credential).unwrap();
    if (res.token) {
      dispatch(setUser(res));
      toast.success("Login successful");
      router.push("/");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <Card className="w-full max-w-sm bg-black text-whiter border-slate-900 ">
      <CardHeader>
        <CardTitle className="text-whiter">Login to your account</CardTitle>
        <CardDescription>
          Enter your information below to login account
        </CardDescription>
        <CardAction>
          <Link href={"/signup"}>
            <Button
              variant="link"
              className="font-bold text-whiter cursor-pointer"
            >
              Signup
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={credential.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCredential((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="m@example.com"
                className="border-slate-800 outline-none"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credential.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCredential((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="****** "
                className="border-slate-800 outline-none"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-5 cursor-pointer">
            {isLoading ? "Logging.." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
