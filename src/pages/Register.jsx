import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Sparkles, Rocket, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../redux/slices/authSlice';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(registerRequest(data));
  };

  useEffect(() => {
    if (user) {
      toast.success('Account created successfully!');
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
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-400/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[32px] shadow-premium overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-700">
        
        {/* Visual Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] bg-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/30 to-transparent" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Sparkles className="text-pink-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">Member.</span>
            </div>
            
            <h2 className="text-4xl font-extrabold text-white leading-[1.1] tracking-tight">
              Start your <br />
              <span className="text-pink-400">journey</span> <br />
              with us today.
            </h2>

            <div className="mt-12 space-y-4">
              {[
                'Unlimited member management',
                'Visual data analytics',
                'Secure cloud storage',
                'Cloudinary image integration'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-pink-400" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                <Rocket className="text-pink-400 h-6 w-6" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Ready to scale?</p>
                <p className="text-pink-200/60 text-xs">Build and grow your community.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-10 lg:hidden flex flex-col items-center">
            <div className="w-14 h-14 bg-pink-600 rounded-2xl shadow-lg shadow-pink-200 flex items-center justify-center mb-4">
              <UserPlus className="text-white h-7 w-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-800">Join Us</h1>
          </div>

          <div className="hidden lg:block mb-10">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Create Account</h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">Join 10,000+ members worldwide</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Arjun Sharma"
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
              className="h-11"
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="arjun@company.com"
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message}
              className="h-11"
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' }
              })}
              error={errors.password?.message}
              className="h-11"
            />

            <div className="flex items-start gap-3 py-2">
              <input type="checkbox" className="mt-1 rounded border-slate-300 text-pink-600 focus:ring-pink-600/20 cursor-pointer" required />
              <p className="text-xs text-slate-500 leading-normal">
                By signing up, you agree to our <Link to="#" className="text-pink-600 font-bold hover:underline">Terms</Link> and <Link to="#" className="text-pink-600 font-bold hover:underline">Privacy</Link>.
              </p>
            </div>

            <Button type="submit" className="w-full h-12 text-sm font-black uppercase tracking-widest bg-pink-600 hover:bg-pink-700 shadow-pink-200" isLoading={isLoading}>
              Get Started
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-500 text-center font-medium">
              Already a member?{' '}
              <Link to="/login" className="font-black text-pink-600 hover:text-pink-700 transition-colors">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
