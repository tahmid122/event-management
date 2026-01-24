"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignupUserMutation } from "@/redux/api/authApi";
import { TLoginSignup } from "@/types/loginSingup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export default function SignupForm() {
  const router = useRouter();
  // redux
  const [userSignUp, { isLoading }] = useSignupUserMutation();
  const [credential, setCredential] = useState<TLoginSignup>({
    name: "",
    email: "",
    password: "",
  });
  //   handle submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await userSignUp(credential).unwrap();
    if (res?.user?.email) {
      toast.success("Signup successful");
      router.push("/login");
    } else {
      toast.error("Something went wrong !");
    }
  };
  return (
    <Card className="w-full max-w-sm bg-black text-whiter border-slate-900 ">
      <CardHeader>
        <CardTitle className="text-whiter">Sign up a new account</CardTitle>
        <CardDescription>
          Enter your information below to create account
        </CardDescription>
        <CardAction>
          <Link href={"/login"}>
            <Button
              variant="link"
              className="font-bold text-whiter cursor-pointer"
            >
              Login
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={credential.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCredential((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="John Doe"
                className="border-slate-800 outline-none"
                required
              />
            </div>
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
            {isLoading ? "Signing..." : "Signup"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
