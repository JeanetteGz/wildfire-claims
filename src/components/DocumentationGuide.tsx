import React from 'react';

interface GuideSection {
  title: string;
  icon: JSX.Element;
  steps: string[];
  tips?: string[];
  link?: {
    url: string;
    text: string;
  };
  keywords?: string[];
}

const DocumentationGuide: React.FC = () => {
  const guides: GuideSection[] = [
    {
      title: 'Amazon Purchase History',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      steps: [
        'Sign in to your Amazon account',
        'Go to "Your Orders"',
        'Use the search bar or filter by year',
        'Download order details or take screenshots of receipts'
      ],
      link: {
        url: 'https://www.amazon.com/gp/your-account/order-history',
        text: 'Go to Amazon Orders'
      }
    },
    {
      title: 'Walmart Purchase Records',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      steps: [
        'Log into your Walmart account',
        'Navigate to "Purchase History"',
        'Filter by date range',
        'Download receipts individually'
      ],
      link: {
        url: 'https://www.walmart.com/account/purchase-history',
        text: 'View Walmart History'
      }
    },
    {
      title: 'Email Search Tips',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      steps: [
        'Open your email inbox',
        'Use the search function',
        'Try different date ranges',
        'Save or screenshot relevant emails'
      ],
      keywords: [
        'receipt', 'order confirmation', 'purchase', 'invoice',
        'delivery', 'shipment', 'insurance', 'renovation'
      ],
      tips: [
        'Check spam/archived folders',
        'Search by store names',
        'Look for confirmation emails'
      ]
    },
    {
      title: 'Photos App Search',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      steps: [
        'Open your photos app (Google Photos, Apple Photos, etc.)',
        'Use the search function',
        'Look through different time periods',
        'Check social media photo albums'
      ],
      keywords: [
        'home decor', 'furniture', 'appliance', 'living room',
        'bedroom', 'kitchen', 'house', 'apartment', 'renovation'
      ],
      tips: [
        'Search by room names',
        'Look for renovation photos',
        'Check delivery/unboxing photos'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {guides.map((guide, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
              {guide.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {guide.title}
            </h3>
          </div>

          <div className="space-y-4">
            {/* Steps */}
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Steps:</h4>
              <ol className="list-decimal list-inside space-y-1">
                {guide.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-gray-600 dark:text-gray-400">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Keywords */}
            {guide.keywords && (
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Keywords:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {guide.keywords.map((keyword, keywordIndex) => (
                    <span
                      key={keywordIndex}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {guide.tips && (
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Tips:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {guide.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-gray-600 dark:text-gray-400">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Link */}
            {guide.link && (
              <div className="mt-4">
                <a
                  href={guide.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-500 hover:text-blue-600"
                >
                  {guide.link.text}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentationGuide;