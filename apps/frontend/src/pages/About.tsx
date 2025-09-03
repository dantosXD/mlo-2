import { useGlobalStore } from '../store/useGlobalStore';

export default function About() {
  const count = useGlobalStore((state) => state.count);
  return (
    <div>
      <h2>About</h2>
      <p>Current count: {count}</p>
    </div>
  );
}
