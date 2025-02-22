import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

const emailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

const mobileSchema = z.object({
  mobile: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid mobile number' }),
  otp: z.string().length(6, { message: 'OTP must be 6 digits' }),
});

export const useSignUp = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'mobile'>('email');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mobileForm = useForm<z.infer<typeof mobileSchema>>({
    resolver: zodResolver(mobileSchema),
    defaultValues: {
      mobile: '',
      otp: '',
    },
  });

  const onEmailSubmit = (values: z.infer<typeof emailSchema>) => {
    console.log(values);
    // Handle email registration logic here
  };

  const onMobileSubmit = (values: z.infer<typeof mobileSchema>) => {
    console.log(values);
    // Handle mobile registration logic here
  };

  const sendOTP = () => {
    const mobile = mobileForm.getValues('mobile');
    if (mobile) {
      console.log('Sending OTP to', mobile);
      // Here you would typically send the OTP to the user's mobile number
      setIsOtpSent(true);
    }
  };

  return {
    activeTab,
    emailForm,
    isOtpSent,
    mobileForm,
    setActiveTab,
    onEmailSubmit,
    onMobileSubmit,
    sendOTP,
  };
};
