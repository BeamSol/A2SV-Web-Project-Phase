'use client';
import React from 'react';

type TagProps = {
  category: string;
};

const categoryStyles: Record<string, string> = {
  Marketing: 'border-2 border-pink-100 text-pink-900',
  Design: 'border-2 border-purple-100 text-purple-900',
  IT: 'border-2 border-blue-100 text-blue-900',
  Development: 'border-2 border-green-100 text-green-900',
  'Data Science': 'border-2 border-yellow-100 text-yellow-900',
  Analytics: 'border-2 border-red-100 text-red-900',
  'Customer Service': 'border-2 border-cyan-100 text-cyan-900',
  Support: 'border-2 border-teal-100 text-teal-900',
  Art: 'border-2 border-orange-100 text-orange-900',
  default: 'border-2 border-gray-100 text-gray-900',
};

const Tag: React.FC<TagProps> = ({ category }) => {
  const styles = categoryStyles[category] || categoryStyles.default;

  return (
    <span
      className={`text-sm font-medium px-3 py-1 rounded-full ${styles}`}
    >
      {category}
    </span>
  );
};

export default Tag;
