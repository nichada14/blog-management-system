// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import BlogDetail from "./pages/BlogDetail";
import BlogEdit from "./pages/BlogEdit";
import BlogCreate from "./pages/BlogCreate";
import RegisterLogin from "./pages/RegisterLogin";
import BlogList from "./pages/BlogList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterLogin />} />
      <Route path="/blogs/list" element={<BlogList />} />
      <Route path="/blogs/create" element={<BlogCreate />} />
      <Route path="/blogs/:id/edit" element={<BlogEdit />} />
      <Route path="/blogs/:id" element={<BlogDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
