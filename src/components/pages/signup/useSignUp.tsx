import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useSignUp = () => {
  const t = useTranslations('SignUpPage');

  const formSchema = z.object({
    fullName: z.string().nonempty(t('required')),
    email: z.string().nonempty(t('required')).email(t('invalid-email')),
    password: z.string().nonempty(t('required')).min(6, t('password-length')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('🚀 ~ onSubmit ~ values:', values);
  };
  return { form, onSubmit };
};
