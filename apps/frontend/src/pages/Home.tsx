import { useGlobalStore } from '../store/useGlobalStore';

export default function Home() {
  const { count, increment } = useGlobalStore();
  return (
    <div>
      <h2>Home</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
