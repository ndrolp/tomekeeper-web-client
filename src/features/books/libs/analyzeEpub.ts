import { api } from "@/common/libs/api";

/**
 *
 * Select an epub file and analyze it's metadata
 */

export async function analyzeEpub(): Promise<AnalyzeEbupResult> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";

    input.onerror = () => {
      reject();
    };
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        reject(new Error("No file selected."));
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await api.post("/books/analyze", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    };

    input.click();
  });
}

export interface AnalyzeEbupResult {
  metadata: {
    title?: string;
    author?: string;
    language?: string;
    subject?: string;
    description?: string;
    date?: string;
  };
  extras: {
    meta: {
      date?: string;
    };
  };
  coverImage: {
    img: string | undefined | null;
    mime: string | undefined | null;
  };
}
