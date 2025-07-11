import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

 export const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search todos..."
        value={searchQuery}
        onChange={handleSearch}
        className="pl-10 pr-4 py-2 w-full"
      />
    </div>
  );
};