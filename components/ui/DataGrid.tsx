import React from 'react';
import { cn } from '@/lib/utils';

interface DataGridProps extends React.TableHTMLAttributes<HTMLTableElement> {
  data: Record<string, any>[];
  columns: { key: string; label: string; render?: (val: any, row: any) => React.ReactNode }[];
}

export const DataGrid: React.FC<DataGridProps> = ({ data, columns, className, ...props }) => {
  return (
    <div className="w-full overflow-x-auto border border-white/10 bg-black/20 backdrop-blur-sm">
      <table className={cn("w-full text-left text-sm font-mono text-gray-300", className)} {...props}>
        <thead className="text-xs text-cyan-400 uppercase bg-white/5 border-b border-white/10">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium tracking-wider">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors group">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 group-hover:text-cyan-100 transition-colors">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500 italic">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
