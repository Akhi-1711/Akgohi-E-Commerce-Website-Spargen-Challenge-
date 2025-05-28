
import React, { useState, useEffect } from 'react';
import { Search, Mic, MicOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = "" }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognitionConstructor();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        handleSearch(transcript);
      };

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Search Error",
          description: "Unable to process voice input. Please try again.",
          variant: "destructive"
        });
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim()) {
      // Search through categories first
      const categories = [
        'apparel', 'books', 'cosmetics', 'digital', 'electronics', 'footwear',
        'groceries', 'home', 'icecream', 'jewelry', 'kitchen', 'laptops',
        'mobiles', 'nutrition', 'organic', 'pets', 'quickmeals', 'ridegear',
        'stationery', 'toys', 'underwear', 'vegetables', 'watches', 'xtreme',
        'yoga', 'zipwear'
      ];
      
      const foundCategory = categories.find(cat => 
        cat.toLowerCase().includes(query.toLowerCase()) ||
        query.toLowerCase().includes(cat.toLowerCase())
      );
      
      if (foundCategory) {
        navigate(`/category/${foundCategory}`);
      } else {
        // If no category found, search in electronics as default
        navigate(`/category/electronics`);
        toast({
          title: "Search Results",
          description: `Showing results for "${query}" in Electronics category.`,
        });
      }
      
      if (onSearch) {
        onSearch(query);
      }
    }
  };

  const startVoiceSearch = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
      toast({
        title: "Voice Search Active",
        description: "Speak now to search...",
      });
    } else {
      toast({
        title: "Voice Search Unavailable",
        description: "Your browser doesn't support voice search.",
        variant: "destructive"
      });
    }
  };

  const stopVoiceSearch = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search products, categories..." 
          className="pl-10 pr-12 bg-gray-50 border-gray-200 text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className={`absolute right-1 top-1 h-8 w-8 p-0 ${
            isListening ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-gray-600'
          }`}
          onClick={isListening ? stopVoiceSearch : startVoiceSearch}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
      </div>
      <Button 
        onClick={() => handleSearch()}
        className="ml-2 bg-blue-600 hover:bg-blue-700 text-white"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
