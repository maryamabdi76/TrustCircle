import Form from 'antd/es/form/Form';
import Button from 'antd/es/button';
import Link from 'next/link';
import { PATHS } from '@/constants/PATHS';
import Input from 'antd/es/input/Input';
import FormItem from 'antd/es/form/FormItem';
import { useTranslations } from 'next-intl';

export const SignUp = () => {
  const t = useTranslations('SignUpPage');
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/images/auth-bg.png)' }}
    >
      <div className="bg-white/30 backdrop-blur-lg shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {t('title')}
        </h1>
        {/* Signup Form */}
        <Form>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <FormItem rules={[{ required: true }]}>
              <Input type="text" placeholder="John Doe" />
            </FormItem>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <FormItem rules={[{ required: true }]}>
              <Input type="email" placeholder="you@example.com" />
            </FormItem>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <FormItem rules={[{ required: true }]}>
              <Input type="password" placeholder="••••••••" />
            </FormItem>
          </div>
          <Button htmlType="submit" type="primary" className="w-full">
            Sign Up
          </Button>
        </Form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link
            href={PATHS.SIGNUP.ROOT}
            className="text-blue-500 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
