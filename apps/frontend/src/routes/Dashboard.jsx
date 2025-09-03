import { useAppStore } from '../store';

export default function Dashboard() {
  const { count, increment } = useAppStore();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
