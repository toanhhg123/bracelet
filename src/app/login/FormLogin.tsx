'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import toast from 'react-hot-toast'

import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import FormItem from '@/shared/FormItem'
import Input from '@/shared/Input/Input'
import { LINKS, type SUBMIT_RESPONSE, TOAST_TYPE } from '@/utils/AppConfig'

type Props = {
  login: (form: FormData) => Promise<SUBMIT_RESPONSE>
}

const FormLogin = ({ login }: Props) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const onSubmit = (formData: FormData) => {
    console.log({ formData })
    startTransition(async () => {
      const response = await login(formData)
      toast[response.type](response.message)

      if (response.type === TOAST_TYPE.SUCCESS) {
        router.push(LINKS.HOME)
      }
    })
  }

  return (
    <form action={onSubmit} className='space-y-6'>
      <div className='grid grid-cols-1 gap-6'>
        <FormItem label='Email address'>
          <Input
            required
            name='email'
            type='email'
            rounded='rounded-full'
            sizeClass='h-12 px-4 py-3'
            placeholder='example@example.com'
            className='border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary'
          />
        </FormItem>
        <FormItem label='Password'>
          <Input
            required
            name='password'
            type='password'
            rounded='rounded-full'
            sizeClass='h-12 px-4 py-3'
            className='border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary'
            placeholder='********'
            min={6}
          />
        </FormItem>
        <ButtonPrimary type='submit' disabled={isPending}>
          Đăng nhập
        </ButtonPrimary>
      </div>
      <span className='block text-center text-sm text-neutral-500'>
        Bạn chưa có tài khoản ?
        <Link href={LINKS.REGISTER} className='text-primary'>
          Đăng kí
        </Link>
      </span>
    </form>
  )
}

export default FormLogin
