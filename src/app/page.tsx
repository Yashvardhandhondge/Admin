'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useAirlineStore } from '@/store/useAirlineStore'

const formSchema = z.object({
  LoginId: z.string().nonempty('Login ID is required'),
  Password: z.string().min(3, 'Password must be at least 6 characters'),
  AgencyId: z.number().int().positive('Agency ID must be a positive number'),
})

type FormData = z.infer<typeof formSchema>

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, loading, error } = useAirlineStore()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      // Prevent form from submitting as a GET request
      event?.preventDefault();

      await login({
        ...data,
        MachineId: 'test',
        IPAddress: 'test',
      })
      console.log('Login successful!')
      router.push('/airlines')
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-semibold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="LoginId">Login ID</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <Input
                  {...register('LoginId')}
                  id="LoginId"
                  placeholder="Enter your Login ID"
                  className={cn(
                    'pl-10',
                    errors.LoginId && 'border-red-500 focus-visible:ring-red-500'
                  )}
                />
              </div>
              {errors.LoginId && (
                <p className="text-sm text-red-500">{errors.LoginId.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="Password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <Input
                  {...register('Password')}
                  id="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={cn(
                    'pl-10',
                    errors.Password && 'border-red-500 focus-visible:ring-red-500'
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1 h-8 w-8 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                  <span className="sr-only">
                    {showPassword ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
              {errors.Password && (
                <p className="text-sm text-red-500">{errors.Password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="AgencyId">Agency ID</Label>
              <Input
                {...register('AgencyId', { valueAsNumber: true })}
                id="AgencyId"
                type="number"
                placeholder="Enter your Agency ID"
                className={cn(
                  errors.AgencyId && 'border-red-500 focus-visible:ring-red-500'
                )}
              />
              {errors.AgencyId && (
                <p className="text-sm text-red-500">{errors.AgencyId.message}</p>
              )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-[#BC1110] hover:bg-[#A00D0C] text-white"
              disabled={loading || isSubmitting}
            >
              {loading || isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

