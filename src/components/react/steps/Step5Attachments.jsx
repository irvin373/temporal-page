import React, { useRef } from 'react';

export default function Step5Attachments({ formData, updateFormData }) {
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateFormData({
        ...formData,
        resume: file.name // Just saving name for UI preview purposes
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded uppercase tracking-wide">
          Step 5 of 5
        </span>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Attachments / Supporting Documents</h2>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Updated resume (PDF or Word)</label>
          <div
            className="w-full relative flex items-center justify-between rounded-md border border-gray-300 px-4 py-3 bg-white cursor-pointer hover:border-blue-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className={`text-sm ${formData.resume ? 'text-gray-900' : 'text-gray-400'}`}>
              {formData.resume || "Select a file..."}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Cover letter (optional)</label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter || ''}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">LinkedIn profile link</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

      </div>

      <div className="flex items-start mt-8 mb-4">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id="agreement"
            name="agreement"
            checked={formData.agreement || false}
            onChange={handleChange}
            className="h-5 w-5 rounded border-gray-400 text-blue-600 focus:ring-blue-500 cursor-pointer"
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="agreement" className="font-medium text-gray-700 cursor-pointer">
            I agree to the collection and processing of my personal data for employment purposes. *
          </label>
        </div>
      </div>
    </div>
  );
}
