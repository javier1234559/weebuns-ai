"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export type LessonSidebarFilter = {
  title: string;
  queryParam: string;
  items: {
    label: string;
    value: string;
  }[];
};

interface ContainerSidebarProps {
  children: React.ReactNode;
  filters: LessonSidebarFilter[];
  onFilterChange: (value: string, checked: boolean, queryParam: string) => void;
}

export function ContainerSidebar({
  children,
  filters,
  onFilterChange,
}: ContainerSidebarProps) {
  const searchParams = useSearchParams();
  const [filterStates, setFilterStates] = useState<Record<string, string[]>>(
    {},
  );

  // Khởi tạo state từ URL params
  useEffect(() => {
    const initialStates: Record<string, string[]> = {};
    filters.forEach((filter) => {
      const values = searchParams.getAll(filter.queryParam);
      initialStates[filter.queryParam] = values;
    });
    setFilterStates(initialStates);
  }, [filters, searchParams]);

  const handleCheckboxChange = (
    value: string,
    checked: boolean,
    queryParam: string,
  ) => {
    setFilterStates((prev) => {
      const currentValues = prev[queryParam] || [];
      const newValues = checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      return {
        ...prev,
        [queryParam]: newValues,
      };
    });

    onFilterChange(value, checked, queryParam);
  };

  return (
    <SidebarProvider defaultOpen>
      <Sidebar
        variant="inset"
        collapsible="offcanvas"
        className=""
        displayMode="inline"
      >
        <SidebarHeader>
          <h1 className="px-2 py-4 text-2xl font-semibold">Filters</h1>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {filters.map((section) => (
              <Collapsible
                key={section.title}
                className="group/collapsible p-2"
                defaultOpen
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex w-full items-center justify-between p-2 font-medium"
                  >
                    {section.title}
                    <ChevronDown className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="ml-2 mt-2 space-y-4">
                    {section.items.map((item) => (
                      <div
                        key={item.value}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={item.value}
                          checked={(
                            filterStates[section.queryParam] || []
                          ).includes(item.value)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              item.value,
                              checked as boolean,
                              section.queryParam,
                            )
                          }
                        />
                        <label
                          htmlFor={item.value}
                          className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="px-4 py-8 md:p-4">{children}</SidebarInset>
    </SidebarProvider>
  );
}
