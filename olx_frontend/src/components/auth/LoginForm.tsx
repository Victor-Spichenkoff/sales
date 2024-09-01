"use client"

import { useState, useTransition } from 'react'
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import { LoginSchema } from '@/schemas/auth'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
// import { FormError } from '../formError'
// import { FormSuccess } from '../formSuccess'
import { ToastContainer, toast } from 'react-toastify'



import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [showTwoFactor, setShowTwoFactor] = useState(false)

  //error para o óbvio
  const notifySuccess = () => toast.success('Operação realizada com sucesso!')

  //email duplicados
  const serachParamns = useSearchParams()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      //fazer login aqui
        // .catch(() => setError("Server error!"))//mensagens na hora errada
    })
  }


  return (
    // <CardWrapper
    //   headerLabel="Welcome Back!"
    //   backButtonLabel="Don't have an account?"
    //   backButtonHref="/auth/register"
    //   showSocial//já é true
    // >
      <Form {...form}>
        <ToastContainer />
        <form onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            {/* Normal */}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name={'email'}

                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field}
                          placeholder='meu-email@exemplo.com'
                          type='email'
                          disabled={isPending}
                          autoComplete='email'
                        />

                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={'password'}

                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input {...field}
                          placeholder='******'
                          type='password'
                          autoComplete='current-password'
                        />
                      </FormControl>
                      <Button
                        size={'sm'}
                        variant={'link'}
                        asChild//usa link dentro
                        className='px-0 font-normal'
                      >
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {/* <FormError message={error || urlError} />
            <FormSuccess message={success} /> */}
            <Button
              type='submit'
              className="w-full"
              disabled={isPending}
            >
              { showTwoFactor ? 'Confirm' : "login" }
            </Button>
          </div>
        </form>

      </Form>
    // </CardWrapper>
  )
}


