import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addMemberRequest, 
  fetchMembersRequest, 
  deleteMemberRequest, 
  updateMemberRequest 
} from '../redux/slices/memberSlice';
import HeaderName from '../components/ui/HeaderName';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Edit, Trash2, UserPlus, UserCheck, X } from 'lucide-react';

const AddMember = () => {
  const dispatch = useDispatch();
  const { members, isLoading, error } = useSelector((state) => state.member);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
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

  useEffect(() => {
    if (members.length === 0) {
      dispatch(fetchMembersRequest());
    }
  }, [dispatch, members.length]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
    }

    if (editingMemberId) {
      dispatch(updateMemberRequest({ id: editingMemberId, formData }));
      toast.success('Member updated successfully');
      handleCancelEdit();
    } else {
      if (!data.photo || !data.photo[0]) {
        toast.error('Please upload a photo');
        return;
      }
      dispatch(addMemberRequest(formData));
      toast.success('Member added successfully');
      reset();
      setShowForm(false);
    }
  };

  const handleEdit = (member) => {
    setEditingMemberId(member._id);
    setShowForm(true);
    reset({
      name: member.name,
      email: member.email,
      phone: member.phone,
      married: member.married,
      dob: member.dob ? member.dob.split('T')[0] : '',
      amount: member.amount
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingMemberId(null);
    setShowForm(false);
    reset({
      name: '',
      email: '',
      phone: '',
      married: 'Single',
      dob: '',
      amount: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      dispatch(deleteMemberRequest(id));
      toast.success('Member deleted successfully');
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val || 0);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
            <UserPlus className="text-white h-6 w-6" />
          </div>
          <div>
            <HeaderName className="text-2xl">Member Management</HeaderName>
            <p className="text-slate-500 text-xs font-medium">Manage and track your community members efficiently.</p>
          </div>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 h-12 px-8 rounded-xl shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all duration-300"
        >
          <UserPlus className="h-4 w-4" />
          Add New Member
        </Button>
      </div>

      {/* Modal Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={handleCancelEdit}
          />
          
          {/* Form Modal */}
          <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl border border-white/20 animate-in zoom-in-95 slide-in-from-bottom-12 duration-500 overflow-hidden">
            <div className="flex justify-between items-center p-8 border-b border-slate-50 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${editingMemberId ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                  {editingMemberId ? <Edit className="h-6 w-6" /> : <UserPlus className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none">
                    {editingMemberId ? 'Update Member' : 'New Member Registration'}
                  </h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">
                    {editingMemberId ? 'Modify member profile' : 'Complete the form below'}
                  </p>
                </div>
              </div>
              <button 
                onClick={handleCancelEdit}
                className="p-3 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 bg-white border border-slate-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input
                  label="Full Name"
                  placeholder="e.g. Jane Doe"
                  {...register('name', { required: 'Name is required' })}
                  error={errors.name?.message}
                  className="h-12 bg-slate-50/50 border-slate-100 focus:bg-white"
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
                  className="h-12 bg-slate-50/50 border-slate-100 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input
                  label="Phone Number"
                  type="number"
                  placeholder="e.g. 1234567890"
                  {...register('phone', { required: 'Phone number is required' })}
                  error={errors.phone?.message}
                  className="h-12 bg-slate-50/50 border-slate-100 focus:bg-white"
                />
                <Input
                  label="Joining Amount"
                  placeholder="e.g. 1000"
                  {...register('amount', { required: 'Amount is required' })}
                  error={errors.amount?.message}
                  className="h-12 bg-slate-50/50 border-slate-100 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Marital Status</label>
                  <select
                    {...register('married', { required: 'Status is required' })}
                    className="px-4 h-12 rounded-xl border border-slate-100 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 focus:bg-white transition-all duration-300 font-bold"
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
                  className="h-12 bg-slate-50/50 border-slate-100 focus:bg-white"
                />
              </div>

              <div className="p-6 bg-blue-50/30 rounded-3xl border border-blue-100/50 space-y-4">
                <label className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  Profile Photo 
                  {editingMemberId && <span className="text-[10px] font-bold text-blue-400 bg-white px-2 py-0.5 rounded-full border border-blue-100 tracking-normal">OPTIONAL</span>}
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    {...register('photo', { required: !editingMemberId ? 'Photo is required' : false })}
                    className="block w-full text-sm text-slate-500 file:mr-6 file:py-3 file:px-8 file:rounded-2xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-slate-900 file:text-white hover:file:bg-blue-600 transition-all duration-300 cursor-pointer"
                  />
                </div>
                {errors.photo && <p className="text-xs text-red-500 mt-2 font-bold flex items-center gap-1.5"><X className="h-3 w-3" /> {errors.photo.message}</p>}
              </div>
            </form>

            <div className="flex justify-end items-center p-8 bg-slate-50/50 border-t border-slate-100 gap-4">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={handleCancelEdit}
                disabled={isLoading}
                className="px-8 h-12 rounded-xl text-slate-600 font-bold"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                onClick={handleSubmit(onSubmit)}
                isLoading={isLoading}
                className={`px-10 h-12 rounded-xl shadow-xl transition-all duration-300 ${editingMemberId ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'}`}
              >
                {editingMemberId ? (
                  <span className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    Update Member
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Register Member
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center gap-4 px-2">
          <div className="h-10 w-1.5 bg-blue-600 rounded-full" />
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Active Members</h2>
            <p className="text-slate-400 text-xs font-medium">A complete list of all registered members in the system.</p>
          </div>
        </div>
        
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100/50">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Member</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {members.length > 0 ? (
                  members.map((member) => (
                    <tr key={member._id} className="hover:bg-blue-50/20 transition-all duration-300 group">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-6">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-[24px] bg-white border border-slate-100 overflow-hidden flex-shrink-0 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
                              {member.photo ? (
                                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-blue-600 bg-blue-50 font-black text-2xl">
                                  {member.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white ${member.married === 'Married' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                          </div>
                          <div>
                            <p className="font-black text-slate-800 text-lg tracking-tight leading-tight">{member.name}</p>
                            <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">{new Date(member.dob).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <p className="text-sm font-bold text-slate-700">{member.email}</p>
                        <p className="text-[11px] text-slate-400 font-black mt-1 tracking-[0.1em]">{member.phone}</p>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex flex-col gap-2">
                          <span className={`inline-flex items-center px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit border ${
                            member.married === 'Married' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                          }`}>
                            {member.married}
                          </span>
                          <p className="text-lg font-black text-slate-800 tracking-tight">{formatCurrency(member.amount)}</p>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-3 transition-all duration-300">
                          <button 
                            onClick={() => handleEdit(member)}
                            className="p-3.5 rounded-2xl text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm border border-blue-100/50"
                            title="Edit Member"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(member._id)}
                            className="p-3.5 rounded-2xl text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm border border-red-100/50"
                            title="Delete Member"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-10 py-24 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 border border-slate-100 shadow-inner">
                          <UserPlus className="h-10 w-10" />
                        </div>
                        <div>
                          <p className="text-slate-500 font-black uppercase tracking-widest text-xs">
                            {isLoading ? 'Synchronizing Data...' : 'No Members Registered'}
                          </p>
                          <p className="text-slate-400 text-[10px] mt-1">Start by adding a new member to your directory.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
