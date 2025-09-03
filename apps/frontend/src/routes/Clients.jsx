import { useAppStore } from '../store';

export default function Clients() {
  const count = useAppStore((state) => state.count);
  return (
    <div>
      <h1>Clients</h1>
      <p>Shared count: {count}</p>
    </div>
  );
}
