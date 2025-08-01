import { useQuery } from '@tanstack/react-query';
import { GeoJSONData, GraphData } from 'src/types/spatial';
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
                body: JSON.stringify({ "filename": `${filename}` }),
            });
            if (!response.ok) {
                throw new Error(
                    `Network response was not ok ${response.status}`,
                );
            }
            const data = await response.json();
            const geojsonData: GeoJSONData = JSON.parse(data.message)
            return geojsonData;
        },
        staleTime: 60 * 60 * 1000
    });

    return { data, error, isLoading };
};


export const useFetchGraphData = (endpoint: string, filename: string) => {

    const { data, error, isLoading } = useQuery({
        queryKey: [endpoint, filename],
        
        queryFn: async () => {
            const response = await fetch(`${getBaseUrl()}/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "filename": `${filename}` }),
            });
            if (!response.ok) {
                throw new Error(
                    `Network response was not ok ${response.status}`,
                );
            }
            const data = await response.json();
            const geojsonData: GraphData = JSON.parse(data.message)
            return geojsonData;
        },
        staleTime: 60 * 60 * 1000
    });

    return { data, error, isLoading };
};
