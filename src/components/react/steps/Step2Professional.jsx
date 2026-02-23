import React from 'react';

export default function Step2Professional({ formData, updateFormData }) {
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
          Step 2 of 5
        </span>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Professional Profile</h2>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Current or most recent job title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Total years of experience *</label>
          <select
            name="yearsExperience"
            value={formData.yearsExperience || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            required
          >
            <option value=""></option>
            <option value="0-2 years">0-2 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="6-10 years">6-10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Main industries worked in (e.g., construction, healthcare, hospitality, data centers, etc.)</label>
          <input
            type="text"
            name="industries"
            value={formData.industries || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Short professional summary (2–3 lines)</label>
          <textarea
            name="summary"
            value={formData.summary || ''}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
