
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

interface CategoryMenuProps {
  categories: Category[];
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="relative">
          <Button
            variant="ghost"
            className="w-full md:w-auto flex items-center justify-between py-3 text-black hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="font-medium">All Categories (A-Z)</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
          
          {isOpen && (
            <div className="absolute top-full left-0 right-0 md:right-auto md:w-[800px] bg-white border border-gray-200 shadow-lg rounded-lg mt-1 z-50">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4 max-h-96 overflow-y-auto">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-black truncate">{category.name}</p>
                      <p className="text-xs text-gray-500">{category.count} items</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
