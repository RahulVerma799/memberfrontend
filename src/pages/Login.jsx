import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Sparkles, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../redux/slices/authSlice';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(loginRequest(data));
  };

  useEffect(() => {
    if (user) {
      toast.success(`Welcome back, ${user.name}!`);
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-4 md:p-6 overflow-hidden relative">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-400/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[32px] shadow-premium overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-700">
        
        {/* Visual Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80')] bg-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-transparent" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Sparkles className="text-blue-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">Member.</span>
            </div>
            
            <h2 className="text-4xl font-extrabold text-white leading-[1.1] tracking-tight">
              Manage your <br />
              <span className="text-blue-400">organization</span> <br />
              with ease.
            </h2>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <ShieldCheck className="text-blue-400 h-6 w-6" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Secure & Private</p>
                <p className="text-blue-200/60 text-xs">Your data is encrypted and safe.</p>
              </div>
            </div>
            <p className="text-blue-200/40 text-xs">
              &copy; 2026 Member Dashboard. Trusted by 10k+ users.
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-10 lg:hidden flex flex-col items-center">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center mb-4">
              <LogIn className="text-white h-7 w-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-800">Welcome Back</h1>
          </div>

          <div className="hidden lg:block mb-10">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Sign In</h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">Please enter your details to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message}
              className="h-12"
            />

            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <Link to="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot?</Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                {...register('password', { required: 'Password is required' })}
                error={errors.password?.message}
                className="h-12"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-sm font-black uppercase tracking-widest" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-500 text-center font-medium">
              New here?{' '}
              <Link to="/register" className="font-black text-blue-600 hover:text-blue-700 transition-colors">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
