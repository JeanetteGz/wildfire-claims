import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: FileCategory;
  status: 'uploading' | 'complete' | 'error';
  category: string;
}

type FileCategory = 'receipt' | 'photo' | 'warranty' | 'manual' | 'invoice' | 'other';

const categoryOptions: { value: FileCategory; label: string; icon: string }[] = [
  { value: 'receipt', label: 'Receipts & Proofs of Purchase', icon: '🧾' },
  { value: 'photo', label: 'Photos of Items', icon: '📸' },
  { value: 'warranty', label: 'Warranty Documents', icon: '📋' },
  { value: 'manual', label: 'Product Manuals', icon: '📖' },
  { value: 'invoice', label: 'Invoices', icon: '📝' },
  { value: 'other', label: 'Other Documentation', icon: '📄' }
];

const DocumentationPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [activeView, setActiveView] = useState<'upload' | 'guide'>('guide');
  const [selectedCategory, setSelectedCategory] = useState<FileCategory>('receipt');
  const [activeCategory, setActiveCategory] = useState<FileCategory | 'all'>('all');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      type: (file.type.startsWith('image/') ? 'photo' : 'receipt') as FileCategory,
      status: 'complete' as const,
      category: selectedCategory
    }));
    setUploadedFiles(prev => [...prev, ...newFiles] as UploadedFile[]);
  }, [selectedCategory]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    }
  });

  const changeFileCategory = (fileId: string, category: FileCategory) => {
    setUploadedFiles(files =>
      files.map(file =>
        file.id === fileId ? { ...file, category } : file
      )
    );
  };

  const filteredFiles = uploadedFiles.filter(file => 
    activeCategory === 'all' || file.category === activeCategory
  );

  const getFileCountByCategory = (category: FileCategory | 'all') => {
    if (category === 'all') return uploadedFiles.length;
    return uploadedFiles.filter(file => file.category === category).length;
  };

  const UploadView = () => (
    <div className="space-y-6">
      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Document Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as FileCategory)}
          className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {categoryOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.icon} {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 ${
          isDragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="text-gray-700 dark:text-gray-300">
            <p className="font-medium">Drag and drop files for {categoryOptions.find(c => c.value === selectedCategory)?.label}</p>
            <p className="text-sm">Supports images and PDFs</p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      {uploadedFiles.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              All Files ({getFileCountByCategory('all')})
            </button>
            {categoryOptions.map(category => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {category.icon} {category.label} ({getFileCountByCategory(category.value)})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* File Grid */}
      {filteredFiles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFiles.map(file => (
            <div key={file.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              {file.type === 'photo' ? (
                <img
                  src={file.preview}
                  alt="preview"
                  className="w-full h-32 object-cover rounded mb-3"
                />
              ) : (
                <div className="w-full h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded mb-3">
                  <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {file.file.name}
                </p>
                <select
                  value={file.category}
                  onChange={(e) => changeFileCategory(file.id, e.target.value as FileCategory)}
                  className="w-full text-sm px-2 py-1 border rounded 
                          dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const GuideView = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Finding Your Documents</h3>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Follow these steps to gather your documentation:
          </p>
          <ol className="list-decimal list-inside space-y-4">
            <li className="text-gray-600 dark:text-gray-300">
              Check your email for:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Purchase confirmations</li>
                <li>Order receipts</li>
                <li>Digital invoices</li>
              </ul>
            </li>
            <li className="text-gray-600 dark:text-gray-300">
              Search your photos for:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Pictures of items in your home</li>
                <li>Renovation photos</li>
                <li>Move-in documentation</li>
              </ul>
            </li>
            <li className="text-gray-600 dark:text-gray-300">
              Gather physical documents:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Paper receipts</li>
                <li>Warranty cards</li>
                <li>User manuals</li>
              </ul>
            </li>
          </ol>
        </div>
        <button
          onClick={() => setActiveView('upload')}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Uploading →
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documentation</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveView('guide')}
            className={`px-4 py-2 rounded-lg ${
              activeView === 'guide'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Find Documents
          </button>
          <button
            onClick={() => setActiveView('upload')}
            className={`px-4 py-2 rounded-lg ${
              activeView === 'upload'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Upload Files
          </button>
        </div>
      </div>

      {activeView === 'guide' ? <GuideView /> : <UploadView />}
    </div>
  );
};

export default DocumentationPage;