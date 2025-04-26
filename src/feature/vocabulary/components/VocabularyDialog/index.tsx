import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Textarea } from "@/components/ui/textarea";
import { vocabularyDialogSchema } from "./schema";
import { usePexelsImage } from "@/feature/vocabulary/hooks/usePexelsImage";
import { useEffect } from "react";
import Image from "next/image";

interface VocabularyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof vocabularyDialogSchema>) => void;
}

export default function VocabularyDialog({
  open,
  onOpenChange,
  onSubmit,
}: VocabularyDialogProps) {
  const form = useForm<z.infer<typeof vocabularyDialogSchema>>({
    resolver: zodResolver(vocabularyDialogSchema),
    defaultValues: {
      term: "",
      meaning: [""],
      exampleSentence: "",
      imageUrl: "",
      referenceLink: "",
      referenceName: "",
      tags: [],
      repetitionLevel: 0,
    },
  });

  const { searchImage, isLoading: isImageLoading, imageUrl } = usePexelsImage();

  const term = useWatch({
    control: form.control,
    name: "term",
  });

  useEffect(() => {
    if (term) {
      searchImage(term);
    }
  }, [term, searchImage]);

  useEffect(() => {
    if (imageUrl) {
      form.setValue("imageUrl", imageUrl);
    }
  }, [imageUrl, form]);

  const handleSubmit = (data: z.infer<typeof vocabularyDialogSchema>) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Vocabulary</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Term</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter term" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="meaning"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meaning</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter meanings (one per line)"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value.split("\n"));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exampleSentence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Example Sentence</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter example sentence" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input type="hidden" {...field} />
                      {field.value && (
                        <Image
                          src={field.value}
                          alt="Vocabulary"
                          className="h-32 w-full rounded-md object-cover"
                          width={100}
                          height={100}
                        />
                      )}
                      {isImageLoading && (
                        <div className="flex h-32 items-center justify-center rounded-md bg-gray-100">
                          <p>Loading image...</p>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="referenceLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter reference link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="referenceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter reference name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
