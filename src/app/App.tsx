import { RouterProvider } from 'react-router';
import { router } from './routes';
import { EditProvider } from './context/EditContext';
import { CursorGlow } from './components/SketchyUI';

export default function App() {
  return (
    <EditProvider>
      <CursorGlow />
      <RouterProvider router={router} />
    </EditProvider>
  );
}
