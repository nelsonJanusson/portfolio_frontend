import { useQuery } from '@tanstack/react-query';

// Define the type of the data you're fetching
interface Data {
  id: string;
  title: string;
  link: Link;
  description: string;
  tags: string[];
}
interface Link {
  name: string;
  url: string;
}
// Fetch function



// Fetch function
const fetchData = async (): Promise<Data[]> => {
  const response = await fetch('http://project-service-service.default.svc.cluster.local:8080/api/projects');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json(); // Return the data as an array of Data objects
};

export default function HomePage() {
  // Using useQuery with proper typing for the data, error, and query key
  const { data, isLoading, error } = useQuery<Data[], Error>({
    queryKey: ['data'], // This is the query key (it can be a string or an array)
    queryFn: fetchData, // The fetchData function will be called to get the data
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>Home Page new</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}