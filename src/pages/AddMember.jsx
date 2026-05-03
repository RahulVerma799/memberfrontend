import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addMemberRequest } from '../redux/slices/memberSlice';
import HeaderName from '../components/ui/HeaderName';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const AddMember = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.member);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      married: 'Single',
      dob: '',
      amount: ''
    }
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('married', data.married);
    formData.append('dob', data.dob);
    formData.append('amount', data.amount);
    
    if (data.photo && data.photo[0]) {
      formData.append('photo', data.photo[0]);
    } else {
      toast.error('Please upload a photo');
      return;
    }

    dispatch(addMemberRequest(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // We need a way to track success to reset the form. 
  // For simplicity, we could check if error is null after loading finishes, 
  // but a dedicated success flag in the slice would be better.
  // For now, let's assume it works if loading stops and no error exists.

  return (
    <div className="max-w-2xl">
      <HeaderName className="mb-6">Add New Member</HeaderName>
      
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              placeholder="e.g. Jane Doe"
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. jane@example.com"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Phone Number"
              type="number"
              placeholder="e.g. 1234567890"
              {...register('phone', { required: 'Phone number is required' })}
              error={errors.phone?.message}
            />
            <Input
              label="Amount"
              placeholder="e.g. 1000"
              {...register('amount', { required: 'Amount is required' })}
              error={errors.amount?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Marital Status</label>
              <select
                {...register('married', { required: 'Status is required' })}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all duration-200"
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>
            <Input
              label="Date of Birth"
              type="date"
              {...register('dob', { required: 'DOB is required' })}
              error={errors.dob?.message}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register('photo', { required: 'Photo is required' })}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200"
            />
            {errors.photo && <p className="text-xs text-red-500">{errors.photo.message}</p>}
          </div>

          <div className="flex justify-end pt-4 gap-3">
            <Button type="button" variant="secondary" onClick={() => reset()}>
              Reset
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Add Member
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
