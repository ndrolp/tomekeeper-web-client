import { createBrowserRouter } from "react-router";
import { BaseLayout } from "./common/layout/BaseLayout";
import App from "./App";
import { BooksHome } from "./features/books/pages/BooksHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "books", element: <BooksHome /> },
    ],
  },
]);
