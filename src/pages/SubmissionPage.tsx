import React from 'react';

const SubmissionPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Submission</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-700 dark:text-gray-200">Review and submit your claim here.</p>
      </div>
    </div>
  );
};

export default SubmissionPage;