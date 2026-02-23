import React from 'react';

export default function Step1BasicInfo({ formData, updateFormData }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded uppercase tracking-wide">
          Step 1 of 5
        </span>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Full name*</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Country of residence</label>
          <select
            name="country"
            value={formData.country || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value=""></option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">State</label>
          <input
            type="text"
            name="state"
            value={formData.state || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id="relocate"
            name="relocate"
            checked={formData.relocate || false}
            onChange={handleChange}
            className="h-5 w-5 rounded border-gray-400 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="relocate" className="font-medium text-gray-700 cursor-pointer">
            Willingness to relocate or travel?
          </label>
        </div>
      </div>
    </div>
  );
}
