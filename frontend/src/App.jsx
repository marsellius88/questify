import { useEffect, useRef } from "react";
import axios from "axios";
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

const checkOrCreateDailyRecords = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  try {
    const response = await axios.post("/api/monthly-records", {
      year,
      month,
    });
    console.log(response.data.message);
  } catch (error) {
    console.error("Error checking or creating daily records:", error);
  }
};

function App() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      checkOrCreateDailyRecords();
      hasRun.current = true;
    }
  }, []);
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
