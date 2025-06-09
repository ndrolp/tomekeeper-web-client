import { useAppForm } from "@/common/components/form";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Image, ImageUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TabsContent, TabsList, Tabs, TabsTrigger } from "@/components/ui/tabs";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { DataSource } from "@/common/data/Datasource";

export const BookForm = ({ children }: { children: React.ReactNode }) => {
  const { mutate } = useMutation({
    mutationFn: DataSource.Books.registerBook,
  });
  const form = useAppForm({
    defaultValues: {
      title: "",
      author: "",
      language: "",
      description: "",
      genre: "",
      publicationYear: "",
      externalCover: "",
      serie: {
        name: "",
        description: "",
      },
      seriesOrder: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
      mutate(value);
      form.reset();
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-200">
        <DialogHeader>
          <DialogTitle>Register Book</DialogTitle>
        </DialogHeader>
        <form
          className="w-full flex space-x-6 items-start"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="self-start h-full ">
            <AspectRatio className="bg-muted rounded-lg" ratio={2 / 3}>
              <div className="h-full w-full grid place-items-center">
                <Image size={64} className="text-gray-400 opacity-30" />
              </div>
            </AspectRatio>
            <Button className="mt-2 w-full cursor-pointer">
              <ImageUp /> Upload Image
            </Button>
          </div>
          <div className="w-full">
            <Tabs defaultValue="data" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="series">Series</TabsTrigger>
                <TabsTrigger value="editions">Editions</TabsTrigger>
              </TabsList>
              <TabsContent className="space-y-3 w-full" value="data">
                <form.AppField
                  name="title"
                  children={(field) => (
                    <field.TextField label="Title" placeholder="Book title" />
                  )}
                />
                <div className="flex w-full space-x-2">
                  <form.AppField
                    name="author"
                    children={(field) => (
                      <field.TextField
                        className="w-full"
                        label="Author"
                        placeholder="Book author"
                      />
                    )}
                  />
                  <form.AppField
                    name="genre"
                    children={(field) => (
                      <field.TextField label="Genre" placeholder="Book title" />
                    )}
                  />
                </div>
                <div className="flex w-full space-x-2">
                  <form.AppField
                    name="language"
                    children={(field) => (
                      <field.TextField
                        className="w-full"
                        label="Language"
                        placeholder="Book Language"
                      />
                    )}
                  />
                  <form.AppField
                    name="publicationYear"
                    children={(field) => (
                      <field.TextField
                        type="number"
                        label="Publication Year"
                        placeholder="First Published Year"
                      />
                    )}
                  />
                </div>
                <form.AppField
                  name="externalCover"
                  children={(field) => (
                    <field.TextField
                      label="External cover"
                      placeholder="Cover Image URL"
                    />
                  )}
                />
                <form.AppField
                  name="description"
                  children={(field) => (
                    <field.TextAreaField label="Description" />
                  )}
                />
                <div className="flex w-full space-x-2">
                  <Button className="ml-auto" variant="outline">
                    Reset
                  </Button>
                  <form.AppForm
                    children={
                      <form.SubmitButton className="self-center ">
                        Register Book
                      </form.SubmitButton>
                    }
                  />
                </div>
              </TabsContent>
              <TabsContent className="space-y-3 w-full h-full" value="series">
                <div className="flex space-x-3">
                  <form.AppField
                    name="serie.name"
                    children={(field) => (
                      <field.TextField
                        label="Series Name"
                        placeholder="Series which the book is part of"
                      />
                    )}
                  />
                  <form.AppField
                    name="seriesOrder"
                    children={(field) => (
                      <field.TextField
                        fullWidth={false}
                        label="Series Order"
                        type="number"
                        placeholder="Order in the series"
                      />
                    )}
                  />
                </div>
                <form.AppField
                  name="description"
                  children={(field) => (
                    <field.TextAreaField
                      label="Series Description"
                      type="number"
                      className="h-77"
                      placeholder="Order in the series"
                    />
                  )}
                />
              </TabsContent>
              <TabsContent value="editions"></TabsContent>
            </Tabs>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
