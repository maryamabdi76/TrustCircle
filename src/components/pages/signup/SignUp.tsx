'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useSignUp } from './useSignUp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChromeIcon } from 'lucide-react';

export const SignUp = () => {
  const {
    activeTab,
    emailForm,
    isOtpSent,
    mobileForm,
    setActiveTab,
    onEmailSubmit,
    onMobileSubmit,
    sendOTP,
  } = useSignUp();
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/images/auth-bg.png)' }}
    >
      <div className="bg-white/60 backdrop-blur-lg shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h1>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'email' | 'mobile')}
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={emailForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Register with Email
                </Button>
              </form>
            </Form>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <ChromeIcon className="mr-2 h-4 w-4" />
                Register with Google
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="mobile">
            <Form {...mobileForm}>
              <form
                onSubmit={mobileForm.handleSubmit(onMobileSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={mobileForm.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your mobile number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!isOtpSent && (
                  <Button type="button" onClick={sendOTP} className="w-full">
                    Send OTP
                  </Button>
                )}
                {isOtpSent && (
                  <FormField
                    control={mobileForm.control}
                    name="otp"
                    render={() => (
                      <FormItem>
                        <FormLabel>OTP</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {isOtpSent && (
                  <Button type="submit" className="w-full">
                    Verify and Register
                  </Button>
                )}
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
