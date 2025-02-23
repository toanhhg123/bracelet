"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import FormItem from "@/shared/FormItem";
import Input from "@/shared/Input/Input";
import { LINKS, type SUBMIT_RESPONSE, TOAST_TYPE } from "@/utils/AppConfig";

type Props = {
  registerUser: (form: FormData) => Promise<SUBMIT_RESPONSE>;
};

const FormRegister = ({ registerUser }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const response = await registerUser(formData);
      toast[response.type](response.message);

      if (response.type === TOAST_TYPE.SUCCESS) {
        router.push(LINKS.HOME);
      }
    });
  };

  return (
    <form action={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <FormItem label="Tên của bạn">
          <Input
            required
            name="name"
            type="text"
            rounded="rounded-full"
            sizeClass="h-12 px-4 py-3"
            placeholder="Nhập tên của bạn"
            className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
          />
        </FormItem>
        <FormItem label="Email address">
          <Input
            required
            name="email"
            type="email"
            rounded="rounded-full"
            sizeClass="h-12 px-4 py-3"
            placeholder="example@example.com"
            className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
          />
        </FormItem>
        <FormItem label="Password">
          <Input
            required
            name="password"
            type="password"
            rounded="rounded-full"
            sizeClass="h-12 px-4 py-3"
            className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
            placeholder="********"
            min={6}
          />
        </FormItem>
        <ButtonPrimary disabled={isPending}>Tiếp tục</ButtonPrimary>
      </div>
      <span className="block text-center text-sm text-neutral-500">
        Bạn đã có tài khoản ?
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </span>
    </form>
  );
};

export default FormRegister;
