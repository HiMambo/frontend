"use client"

import { Compass, Puzzle, Timer, Users } from "lucide-react";
import type { ExperienceDetailsTabsProps } from "./ExperienceDetailsTabs";

export const DescriptionTab: React.FC<ExperienceDetailsTabsProps> = () => {
  return (
    <div className="flex flex-col pt-[var(--spacing-1200)] gap-[var(--spacing-1200)]">
        
        <div className="flex flex-col gap-[var(--spacing-600)]">
            <h3 className="heading-h3 text-secondary">
                What to expect from your experience
            </h3>
            <p className="heading-h5-light text-primary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>

        <div className="flex flex-col gap-[var(--spacing-600)]">
            <h4 className="body-xxl-label text-secondary">Additional Information</h4>
        
            <ul className="grid grid-cols-2 gap-x-[var(--spacing-1200)] gap-y-[var(--spacing-600)]">
                <div className="flex items-center gap-[var(--spacing-250)]">
                    <Timer className="icon-m text-disabled" />
                    <span className="body-xl text-primary">Lorem ipsum dolor</span>
                </div>
                <div className="flex items-center gap-[var(--spacing-250)]">
                    <Users className="icon-m text-disabled" />                
                    <span className="body-xl text-primary">sit amet, consectetur</span>
                </div>
                <div className="flex items-center gap-[var(--spacing-250)]">
                    <Compass className="icon-m text-disabled" />
                    <span className="body-xl text-primary">adipiscing elit, sed do eiusmod tempor incididunt</span>
                </div>
                <div className="flex items-center gap-[var(--spacing-250)]">
                    <Puzzle className="icon-m text-disabled" />
                    <span className="body-xl text-primary"> ut labore et dolore magna aliqua</span>
                </div>
            </ul>
        </div>
    </div>
  );
};