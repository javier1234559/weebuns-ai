"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Define schema for form validation
const formSchema = z.object({
  target_study_duration: z.number().min(0),
  target_reading: z.number().min(0).max(9).step(0.5),
  target_listening: z.number().min(0).max(9).step(0.5),
  target_writing: z.number().min(0).max(9).step(0.5),
  target_speaking: z.number().min(0).max(9).step(0.5),
  next_exam_date: z.string().datetime()
});

export type TargetFormData = z.infer<typeof formSchema>;

interface TargetSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TargetFormData) => void;
  initialData: Omit<TargetFormData, "next_exam_date"> & {
    next_exam_date: string;
  };
}

export const TargetSettingModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: TargetSettingModalProps) => {
  const form = useForm<TargetFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      next_exam_date: initialData.next_exam_date,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        ...initialData,
        next_exam_date: initialData.next_exam_date,
      });
    }
  }, [isOpen, initialData, form]);

  const handleSubmit = (data: TargetFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật mục tiêu</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="target_reading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reading</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.5"
                        min="0"
                        max="9"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="target_listening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Listening</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.5"
                        min="0"
                        max="9"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="target_writing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Writing</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.5"
                        min="0"
                        max="9"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="target_speaking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Speaking</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.5"
                        min="0"
                        max="9"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="next_exam_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày thi</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto size-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        disabled={(date) =>
                          date < new Date() || date > new Date("2025-12-31")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button type="submit">Lưu thay đổi</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
