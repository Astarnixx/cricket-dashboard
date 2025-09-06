'use client';

interface PlayerCardProps {
  name: string;
  country: string;
  role: string;
}

export default function PlayerCard({ name, country, role }: PlayerCardProps) {
  return (
    <div className="border rounded-md p-4 shadow-sm bg-white dark:bg-gray-800 transition-colors duration-300">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h2>
      <p className="text-gray-600 dark:text-gray-400">{country}</p>
      <p className="text-gray-600 dark:text-gray-400">{role}</p>
    </div>
  );
}