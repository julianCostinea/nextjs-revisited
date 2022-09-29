import axios, { AxiosError } from "axios";

export async function axiosGetJsonData<T>(url: string) {
    try {
        const response = await axios.get<T>(url);
        return response.data;
    } catch (error) {
        const errors = error as Error | AxiosError;
        if (axios.isAxiosError(error)) {
            throw new Error(`Error in 'axiosGetJsonData(${url})': ${errors.message}`);
        }
        // if (errors instanceof AxiosError) {
        //   throw new Error(
        //     `Error in 'axiosGetJsonData(${url})': ${errors.message}. Status: ${errors.status}`
        //   );
        // }
        console.log(errors);
        throw new Error(`Unexpected error': ${errors.message}`);
    }
}