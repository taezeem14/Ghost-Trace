import { FullGraphView } from '@/components/graph/FullGraphView';

export default function GraphPage() {
  return (
    <div className="h-full flex flex-col -m-6 animate-in fade-in duration-500">
      <FullGraphView />
    </div>
  );
}
