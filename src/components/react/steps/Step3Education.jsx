import React from 'react';

export default function Step3Education({ formData, updateFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value
    });
  };

  // Ensure languages is always an array
  const languages = formData.languages || [{ language: '', proficiency: '' }];

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    updateFormData({ ...formData, languages: updatedLanguages });
  };

  const addLanguage = () => {
    updateFormData({
      ...formData,
      languages: [...languages, { language: '', proficiency: '' }]
    });
  };

  const removeLanguage = (indexToRemove) => {
    updateFormData({
      ...formData,
      languages: languages.filter((_, index) => index !== indexToRemove)
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded uppercase tracking-wide">
          Step 3 of 5
        </span>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-6">Education</h2>
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Highest level of education achieved</label>
          <select
            name="educationLevel"
            value={formData.educationLevel || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value=""></option>
            <option value="High School">High School</option>
            <option value="Associate's Degree">Associate's Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate">Doctorate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Relevant certifications (e.g., OSHA, PMP, ISO, NEBOSH)</label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications || ''}
            onChange={handleChange}
            placeholder="List your safety certifications (CSP, CHST, PMP, ISO, NEBOSH, OSHT, OSHA 30/10, etc)"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
          />
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-6">Key Skills</h2>
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Technical competencies (e.g., safety programs, risk assessments, compliance, training)</label>
          <input
            type="text"
            name="technicalCompetencies"
            value={formData.technicalCompetencies || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-3">
            <div>
              <label className="block text-sm font-semibold text-gray-600">Languages and proficiency levels</label>
            </div>
            <div className="hidden md:block">
              <label className="block text-sm font-semibold text-gray-600">Proficiency level</label>
            </div>
          </div>

          {languages.map((lang, index) => (
            <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
              <div className="w-full md:w-1/2">
                <label className="block md:hidden text-xs font-semibold text-gray-500 mb-1">Language</label>
                <select
                  value={lang.language}
                  onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value=""></option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Mandarin">Mandarin</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 flex items-center gap-2">
                <div className="flex-1">
                  <label className="block md:hidden text-xs font-semibold text-gray-500 mb-1">Proficiency level</label>
                  <select
                    value={lang.proficiency}
                    onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value=""></option>
                    <option value="Basic">Basic</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native/Bilingual">Native/Bilingual</option>
                  </select>
                </div>
                {languages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="mt-5 md:mt-0 p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addLanguage}
            className="inline-flex items-center px-4 py-2 mt-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add language
          </button>
        </div>
      </div>
    </div>
  );
}
