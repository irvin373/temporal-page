import React, { useState, useEffect, useMemo } from 'react';
import { getApplications, updateApplicationStatus, deleteApplication } from '../../service/applicationService';

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
  { value: 'reviewing', label: 'Reviewing', color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
  { value: 'interview', label: 'Interview', color: 'bg-purple-100 text-purple-800', dot: 'bg-purple-500' },
  { value: 'accepted', label: 'Accepted', color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800', dot: 'bg-red-500' },
];

const getStatusStyle = (status) => STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];

const formatDate = (timestamp) => {
  if (!timestamp) return '—';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

// ============================================================================
// Sub Components
// ============================================================================

function StatsCard({ label, count, color, textColor, dotColor, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`${color} rounded-xl shadow-sm border p-3 text-center transition-all ${
        active ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
      } ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="flex items-center justify-center gap-1.5 mb-1">
        {dotColor && <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>}
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
      </div>
      <p className={`text-2xl font-bold ${textColor}`}>{count}</p>
    </button>
  );
}

function StatusBadge({ status }) {
  const style = getStatusStyle(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${style.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
      {style.label}
    </span>
  );
}

// ============================================================================
// Modal & Detail Components
// ============================================================================

function Section({ title, icon, children }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-base font-bold text-gray-800 mb-3">
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}

function InfoGrid({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">{children}</div>;
}

function InfoItem({ label, value, isLink }) {
  const display = value || '—';
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
      {isLink && value ? (
        <a href={isLink} className="text-sm text-blue-600 hover:underline font-medium">{display}</a>
      ) : (
        <p className="text-sm text-gray-800 font-medium capitalize">{display}</p>
      )}
    </div>
  );
}

function ModalHeader({ app, onClose }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-5 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{app.fullName || 'No Name'}</h2>
          <p className="text-blue-100 text-sm mt-1">{app.desiredPosition || app.jobTitle || 'General Application'}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function StatusSection({ status, setStatus, app, saving, onStatusChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-gray-100">
      <span className="text-sm font-medium text-gray-500">Status:</span>
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {STATUS_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <button
        onClick={() => onStatusChange(app.id, status)}
        disabled={saving || status === app.status}
        className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {saving ? 'Saving...' : 'Update Status'}
      </button>
      <span className="text-sm text-gray-400 ml-auto">
        Applied: {formatDate(app.createdAt)}
      </span>
    </div>
  );
}

function BasicInfoSection({ app }) {
  return (
    <Section title="Basic Information">
      <InfoGrid>
        <InfoItem label="Full Name" value={app.fullName} />
        <InfoItem label="Email" value={app.email} isLink={`mailto:${app.email}`} />
        <InfoItem label="Phone" value={app.phone} isLink={`tel:${app.phone}`} />
        <InfoItem label="City" value={app.city} />
        <InfoItem label="State" value={app.state} />
        <InfoItem label="Country" value={app.country} />
        <InfoItem label="Willing to Relocate/Travel" value={app.relocate !== undefined ? (app.relocate ? 'Yes' : 'No') : null} />
         <InfoItem label="Agrees to share your data" value={app.agreement !== undefined ? (app.agreement ? 'Yes' : 'No') : null} />
        <InfoItem label="LinkedIn" value={app.linkedin} isLink={app.linkedin} />
      </InfoGrid>
    </Section>
  );
}

function ProfessionalSection({ app }) {
  return (
    <Section title="Professional Profile">
      <InfoGrid>
        <InfoItem label="Current Job Title" value={app.jobTitle} />
        <InfoItem label="Years of Experience" value={app.yearsExperience} />
        <InfoItem label="Industries Worked In" value={app.industries} />
      </InfoGrid>
      {app.summary && (
        <div className="mt-3">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Professional Summary</p>
          <p className="text-sm text-gray-700 whitespace-pre-line bg-gray-50 rounded-lg p-3">{app.summary}</p>
        </div>
      )}
      {app.technicalCompetencies && (
        <div className="mt-3">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Technical Competencies</p>
          <p className="text-sm text-gray-700 whitespace-pre-line bg-gray-50 rounded-lg p-3">{app.technicalCompetencies}</p>
        </div>
      )}
    </Section>
  );
}

function EducationSection({ app }) {
  return (
    <Section title="Education & Certifications">
      <InfoGrid>
        <InfoItem label="Highest Education" value={app.educationLevel} />
        <InfoItem label="Certifications" value={app.certifications} />
      </InfoGrid>
      {app.languages && Array.isArray(app.languages) && app.languages.length > 0 && app.languages[0]?.language && (
        <div className="mt-3">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Languages</p>
          <div className="flex flex-wrap gap-2">
            {app.languages.filter(l => l.language).map((l, i) => (
              <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                {l.language} {l.proficiency && `(${l.proficiency})`}
              </span>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

function JobInterestsSection({ app }) {
  return (
    <Section title="Job Interests">
      <InfoGrid>
        <InfoItem label="Desired Position" value={app.desiredPosition} />
        <InfoItem label="Work Arrangement" value={app.workArrangement} />
        <InfoItem label="Salary Expectations" value={app.salary ? `$${app.salary}` : null} />
        <InfoItem label="Availability to Start" value={app.availability} />
      </InfoGrid>
    </Section>
  );
}

function CoverLetterSection({ app }) {
  if (!app.coverLetter) return null;
  return (
    <Section title="Cover Letter">
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-700 whitespace-pre-line">{app.coverLetter}</p>
      </div>
    </Section>
  );
}

function ResumeSection({ app }) {
  if (!app.resumeURL) return null;
  return (
    <Section title="Resume / CV">
      <a
        href={app.resumeURL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md text-sm font-medium"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download Resume / CV
      </a>
    </Section>
  );
}

function DeleteConfirmation({ confirmDelete, setConfirmDelete, deleting, onDelete }) {
  if (!confirmDelete) {
    return (
      <button
        onClick={() => setConfirmDelete(true)}
        className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
      >
        Delete Application
      </button>
    );
  }
  return (
    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
      <span className="text-sm text-red-700">Are you sure? This action cannot be undone.</span>
      <button
        onClick={onDelete}
        disabled={deleting}
        className="px-3 py-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50 transition-colors"
      >
        {deleting ? 'Deleting...' : 'Yes, Delete'}
      </button>
      <button
        onClick={() => setConfirmDelete(false)}
        className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
      >
        Cancel
      </button>
    </div>
  );
}

function DetailModal({ app, onClose, onStatusChange, onDelete }) {
  const [status, setStatus] = useState(app.status || 'new');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleStatusSave = async () => {
    setSaving(true);
    try {
      await onStatusChange(app.id, status);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(app.id);
      onClose();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <ModalHeader app={app} onClose={onClose} />

        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6 space-y-6">
          <StatusSection status={status} setStatus={setStatus} app={app} saving={saving} onStatusChange={handleStatusSave} />
          <BasicInfoSection app={app} />
          <ProfessionalSection app={app} />
          <EducationSection app={app} />
          <JobInterestsSection app={app} />
          <CoverLetterSection app={app} />
          <ResumeSection app={app} />

          <div className="pt-4 border-t border-gray-100">
            <DeleteConfirmation
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
              deleting={deleting}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 text-sm">Loading applications...</p>
    </div>
  );
}

function ErrorState({ error, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <p className="text-red-600 font-medium">{error}</p>
      <button onClick={onRetry} className="mt-3 text-sm text-red-500 underline">Try again</button>
    </div>
  );
}

function EmptyState({ hasApplications }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
      <div className="text-5xl mb-4">📋</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {hasApplications ? 'No matching applications' : 'No applications yet'}
      </h3>
      <p className="text-gray-500 text-sm">
        {hasApplications
          ? 'Try adjusting your search or filter criteria.'
          : 'Applications submitted through the form will appear here.'
        }
      </p>
    </div>
  );
}

// ============================================================================
// List Components
// ============================================================================

function ApplicationsTable({ filteredApps, onAppSelect }) {
  return (
    <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Applicant</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Position</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Location</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Experience</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Resume</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filteredApps.map(app => (
            <tr
              key={app.id}
              className="hover:bg-blue-50/50 cursor-pointer transition-colors"
              onClick={() => onAppSelect(app)}
            >
              <td className="px-6 py-4">
                <div className="font-semibold text-gray-900 text-sm">{app.fullName || '—'}</div>
                <div className="text-xs text-gray-500">{app.email || '—'}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{app.desiredPosition || app.jobTitle || '—'}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {[app.city, app.state, app.country].filter(Boolean).join(', ') || '—'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {app.yearsExperience || '—'}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={app.status || 'new'} />
              </td>
              <td className="px-6 py-4 text-xs text-gray-500">{formatDate(app.createdAt)}</td>
              <td className="px-6 py-4">
                {app.resumeURL ? (
                  <a
                    href={app.resumeURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    CV
                  </a>
                ) : (
                  <span className="text-xs text-gray-400">No file</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ApplicationCardRow({ app, onAppSelect }) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 cursor-pointer hover:border-blue-300 transition-colors"
      onClick={() => onAppSelect(app)}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{app.fullName || '—'}</h3>
          <p className="text-xs text-gray-500">{app.email || '—'}</p>
        </div>
        <StatusBadge status={app.status || 'new'} />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
        {app.jobTitle && <span>{app.jobTitle}</span>}
        {app.city && <span>{app.city}</span>}
        {app.yearsExperience && <span>{app.yearsExperience}</span>}
      </div>
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-400">{formatDate(app.createdAt)}</span>
        {app.resumeURL && (
          <a
            href={app.resumeURL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-xs text-blue-600 font-medium"
          >
            📄 View CV
          </a>
        )}
      </div>
    </div>
  );
}

function ApplicationsCardList({ filteredApps, onAppSelect }) {
  return (
    <div className="md:hidden space-y-3 mb-12">
      {filteredApps.map(app => (
        <ApplicationCardRow key={app.id} app={app} onAppSelect={onAppSelect} />
      ))}
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Applications Dashboard</h1>
        <p className="text-blue-100 mt-2 text-lg">Review and manage applicant submissions</p>
      </div>
    </div>
  );
}

function DashboardToolbar({ search, onSearchChange, filterStatus, onFilterChange, loading, onRefresh }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, position, city..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={filterStatus}
          onChange={e => onFilterChange(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 justify-center"
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
    </div>
  );
}

function StatsSection({ stats, filterStatus, onFilterClick }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8">
      <StatsCard label="Total" count={stats.total} color="bg-white" textColor="text-gray-800" />
      {STATUS_OPTIONS.map(s => (
        <StatsCard
          key={s.value}
          label={s.label}
          count={stats.byStatus[s.value] || 0}
          color="bg-white"
          textColor="text-gray-800"
          dotColor={s.dot}
          onClick={() => onFilterClick(filterStatus === s.value ? 'all' : s.value)}
          active={filterStatus === s.value}
        />
      ))}
    </div>
  );
}

function ApplicationsContent({ loading, error, filteredApps, applications, onAppSelect, onRefresh }) {
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={onRefresh} />;
  if (filteredApps.length === 0) return <EmptyState hasApplications={applications.length > 0} />;

  return (
    <>
      <p className="text-sm text-gray-500 mb-3">
        Showing {filteredApps.length} of {applications.length} application{applications.length !== 1 ? 's' : ''}
      </p>
      <ApplicationsTable filteredApps={filteredApps} onAppSelect={onAppSelect} />
      <ApplicationsCardList filteredApps={filteredApps} onAppSelect={onAppSelect} />
    </>
  );
}

export default function ApplicationsDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to load applications. Please check your Firebase configuration.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = !search ||
        (app.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
        (app.email || '').toLowerCase().includes(search.toLowerCase()) ||
        (app.desiredPosition || '').toLowerCase().includes(search.toLowerCase()) ||
        (app.jobTitle || '').toLowerCase().includes(search.toLowerCase()) ||
        (app.city || '').toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filterStatus === 'all' || (app.status || 'new') === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [applications, search, filterStatus]);

  const stats = useMemo(() => {
    const total = applications.length;
    const byStatus = {};
    STATUS_OPTIONS.forEach(s => { byStatus[s.value] = 0; });
    applications.forEach(app => {
      const s = app.status || 'new';
      byStatus[s] = (byStatus[s] || 0) + 1;
    });
    return { total, byStatus };
  }, [applications]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateApplicationStatus(id, newStatus);
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      if (selectedApp?.id === id) setSelectedApp(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteApplication(id);
      setApplications(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('Error deleting application:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/80">
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <StatsSection stats={stats} filterStatus={filterStatus} onFilterClick={setFilterStatus} />
        <DashboardToolbar
          search={search}
          onSearchChange={setSearch}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          loading={loading}
          onRefresh={fetchApplications}
        />
        <ApplicationsContent
          loading={loading}
          error={error}
          filteredApps={filteredApps}
          applications={applications}
          onAppSelect={setSelectedApp}
          onRefresh={fetchApplications}
        />
      </div>
      {selectedApp && (
        <DetailModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
      `}} />
    </div>
  );
}

