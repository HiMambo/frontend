"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import FilterSidebar from "@/components/ExperiencesPage/FilterSidebar";

export default function FilterToggle() {
  return (
    <div className="xl:hidden mb-4 flex justify-end">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[90vw] sm:w-[400px] overflow-auto">
          <SheetHeader>
            <SheetTitle>Filter Experiences</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <FilterSidebar />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
