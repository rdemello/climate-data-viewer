import { useQuery } from '@tanstack/react-query';
import { getBaseUrl } from 'src/utils/function';

export const useFetchData = (endpoint: string, filename: string) => {

    const { data, error, isLoading } = useQuery({
        queryKey: [endpoint, filename],
        queryFn: async () => {
            const response = await fetch(`${getBaseUrl()}/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "filename": `${filename}.geojson` }),
            });
            if (!response.ok) {
                throw new Error(
                    `Network response was not ok ${response.status}`,
                );
            }
            const data = await response.json();
            return JSON.parse(data.message);
        },
        staleTime: 60 * 60 * 1000
    });

    return { data, error, isLoading };
};
