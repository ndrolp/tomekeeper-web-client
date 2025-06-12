import { createBrowserRouter } from "react-router";
import { BaseLayout } from "./common/layout/BaseLayout";
import App from "./App";
import { BooksHome } from "./features/books/pages/BooksHome";
import BookPage from "./features/books/pages/BookPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      { index: true, element: <App /> },
      {
        path: "books",
        children: [
          { index: true, element: <BooksHome /> },
          { path: "view/:id", element: <BookPage /> },
        ],
      },
    ],
  },
]);
