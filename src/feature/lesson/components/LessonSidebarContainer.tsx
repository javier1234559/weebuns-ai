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

export type LessonSidebarFilter = {
  title: string;
  items: {
    label: string;
    value: string;
  }[];
};

interface ContainerSidebarProps {
  children: React.ReactNode;
  filters: LessonSidebarFilter[];
}

export function ContainerSidebar({ children, filters }: ContainerSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentTypes = params.getAll("lesson_type");

    if (checked) {
      params.append("lesson_type", value);
    } else {
      const newTypes = currentTypes.filter((type) => type !== value);
      params.delete("lesson_type");
      newTypes.forEach((type) => params.append("lesson_type", type));
    }

    router.push(`?${params.toString()}`);
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
                          checked={searchParams
                            .getAll("lesson_type")
                            .includes(item.value)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(item.value, checked as boolean)
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

      <SidebarInset className="p-4 py-8">{children}</SidebarInset>
    </SidebarProvider>
  );
}
