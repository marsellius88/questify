import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import Todo from "./pages/Todo";
import Journal from "./pages/Journal";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/journal" element={<Journal />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
