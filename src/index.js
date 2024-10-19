import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PuzzlePage from './pages/puzzle';
import Layout from './pages/Layout';
import Chat from './pages/chat';
import ChatComponent from './components/new-chat';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Chat />} />
          {/* <Route index element={<ChatComponent />} /> */}
          <Route path="puzzle" element={<PuzzlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);