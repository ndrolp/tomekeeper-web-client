import { useAppForm } from "@/common/components/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TabsContent, TabsList, Tabs, TabsTrigger } from "@/components/ui/tabs";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataSource } from "@/common/data/Datasource";
import { analyzeEpub } from "../libs/analyzeEpub";
import { BookAudio, LoaderCircle } from "lucide-react";
import { useDebounce } from "use-debounce";
import type { ISeries } from "@/features/series/data/SeriesDataSource";

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
        id: "",
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

  const [debouncedSeriesName] = useDebounce(form.state.values.serie.name, 300);

  const seriesQuery = useQuery({
    queryKey: ["series", { seriesTitle: debouncedSeriesName }],
    queryFn: async () => await DataSource.Series.getSeries(debouncedSeriesName),
  });

  const queryClient = useQueryClient();

  const { mutate: launchEpubAnalyzer, isPending } = useMutation({
    mutationFn: analyzeEpub,
    onSuccess(data) {
      form.setFieldValue("title", data.metadata.title ?? "");
      form.setFieldValue("author", data.metadata.author ?? "");
      form.setFieldValue("language", data.metadata.language ?? "");
      form.setFieldValue("genre", data.metadata.subject ?? "");
      form.setFieldValue("description", data.metadata.description ?? "");
      form.setFieldValue(
        "publicationYear",
        data.extras.meta.date?.split("-")[0] ?? "",
      );
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-200"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Register Book
            <Button
              className="ml-2"
              variant="ghost"
              onClick={() => {
                launchEpubAnalyzer();
              }}
            >
              {isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <BookAudio />
              )}
            </Button>
          </DialogTitle>
        </DialogHeader>
        <form
          className="w-full flex space-x-6 items-start"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="w-full">
            <Tabs defaultValue="data" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="series">Series</TabsTrigger>
                <TabsTrigger value="editions">Editions</TabsTrigger>
                <TabsTrigger className="" value="cover">
                  Cover
                </TabsTrigger>
              </TabsList>
              <TabsContent className="space-y-3 w-full min-h-96" value="data">
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
                      <field.TextField label="Genre" placeholder="Book Genre" />
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
                        placeholder="Publication Year"
                      />
                    )}
                  />
                </div>
                <form.AppField
                  name="description"
                  children={(field) => (
                    <field.TextAreaField
                      label="Description"
                      className="flex-1 h-42"
                      placeholder="Sumary of the book"
                    />
                  )}
                />
              </TabsContent>
              <TabsContent className="space-y-3 w-full h-full" value="series">
                <div className="flex space-x-3">
                  <form.AppField
                    name="serie.name"
                    children={(field) => (
                      <field.AutoCompleteField
                        options={seriesQuery.data ?? ([] as ISeries[])}
                        emptyMessage=""
                        placeholder="Series which the book is part of"
                        getOptionLabel={(item) => item?.name ?? ""}
                        getOptionValue={(item) => item?.name ?? ""}
                        onValueChange={(a) => {
                          const value = a as ISeries;
                          form.setFieldValue("serie.name", value.name ?? "");
                          form.setFieldValue(
                            "serie.description",
                            value.description ?? "",
                          );
                          form.setFieldValue(
                            "serie.id",
                            value.id?.toString() ?? "",
                          );
                        }}
                        label="Series Name"
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
                  name="serie.description"
                  children={(field) => (
                    <field.TextAreaField
                      label="Series Description"
                      type="number"
                      className="h-74"
                      placeholder="Order in the series"
                    />
                  )}
                />
              </TabsContent>
              <TabsContent value="editions" className="min-h-96"></TabsContent>
              <TabsContent value="cover" className="min-h-96">
                <form.AppField
                  name="externalCover"
                  children={(field) => (
                    <field.TextField
                      label="External cover"
                      placeholder="Cover Image URL"
                    />
                  )}
                />
              </TabsContent>
            </Tabs>
            <div className="flex w-full space-x-2 mt-2">
              <DialogClose className={buttonVariants({ variant: "outline" })}>
                Cancel
              </DialogClose>
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
