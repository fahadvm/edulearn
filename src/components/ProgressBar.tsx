import { cn } from '../utils/cn';

interface ProgressBarProps {
  progress: number; // 0-100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={cn('bg-sky-blue h-2.5 rounded-full', progress === 100 ? 'bg-green-500' : '')}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}