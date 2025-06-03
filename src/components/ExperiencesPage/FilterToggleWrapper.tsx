"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import React from "react";

interface FilterToggleWrapperProps {
  children: React.ReactNode;
}

const FilterToggleWrapper: React.FC<FilterToggleWrapperProps> = ({ children }) => {
  return (
    <div className="lg:hidden mb-4 flex justify-end">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="backdrop-blur-md bg-white/90 w-[90vw] sm:w-[400px] overflow-auto p-6">
          <SheetTitle className="text-2xl font-bold text-blue-800 mb-1">Filters</SheetTitle>
          <div>
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FilterToggleWrapper;
