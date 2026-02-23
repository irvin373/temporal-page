import React from 'react';

export default function Step4JobInterests({ formData, updateFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded uppercase tracking-wide">
          Step 4 of 5
        </span>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Job Interests</h2>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Desired position (e.g., HSE Manager, Coordinator, Supervisor)</label>
          <select
            name="desiredPosition"
            value={formData.desiredPosition || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value=""></option>
            <option value="HSE Manager">HSE Manager</option>
            <option value="HSE Coordinator">HSE Coordinator</option>
            <option value="HSE Supervisor">HSE Supervisor</option>
            <option value="Safety Officer">Safety Officer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Preferred work arrangement (onsite, hybrid, remote)</label>
          <select
            name="workArrangement"
            value={formData.workArrangement || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value=""></option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Availability to start</label>
          <select
            name="availability"
            value={formData.availability || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
          >
            <option value="" disabled hidden>Select option</option>
            <option value="Immediately">Immediately</option>
            <option value="1-2 weeks">1-2 weeks</option>
            <option value="2-4 weeks">2-4 weeks</option>
            <option value="More than 1 month">More than 1 month</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Salary expectations (optional)</label>
          <input
            type="number"
            name="salary"
            value={formData.salary || ''}
            onChange={handleChange}
            placeholder="0"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
