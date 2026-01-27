import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterControls = ({ onFilterChange, onSearchChange, onSortChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSort, setSelectedSort] = useState("date-desc");

  const filterOptions = [
    { value: "all", label: "All Memes" },
    { value: "completed", label: "Completed" },
    { value: "processing", label: "Processing" },
    { value: "failed", label: "Failed" }
  ];

  const sortOptions = [
    { value: "date-desc", label: "Newest First" },
    { value: "date-asc", label: "Oldest First" },
    { value: "title-asc", label: "Title (A-Z)" },
    { value: "title-desc", label: "Title (Z-A)" },
    { value: "size-desc", label: "Largest First" },
    { value: "size-asc", label: "Smallest First" }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    onFilterChange(value);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
    onSortChange(value);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedFilter("all");
    setSelectedSort("date-desc");
    onSearchChange("");
    onFilterChange("all");
    onSortChange("date-desc");
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 lg:mb-0">
        <div className="flex items-center gap-3 flex-1">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            Filter & Search
          </h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-foreground"
          aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
        >
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
        </button>
      </div>

      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block mt-4 lg:mt-6`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <Input
              type="search"
              placeholder="Search memes by title or source..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>

          <Select
            options={filterOptions}
            value={selectedFilter}
            onChange={handleFilterChange}
            placeholder="Filter by status"
          />

          <Select
            options={sortOptions}
            value={selectedSort}
            onChange={handleSortChange}
            placeholder="Sort by"
          />
        </div>

        {(searchQuery || selectedFilter !== "all" || selectedSort !== "date-desc") && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">
              Active filters applied
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterControls;