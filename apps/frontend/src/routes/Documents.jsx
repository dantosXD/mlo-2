import { useAppStore } from '../store';

export default function Documents() {
  const count = useAppStore((state) => state.count);
  return (
    <div>
      <h1>Documents</h1>
      <p>Shared count: {count}</p>
    </div>
  );
}
