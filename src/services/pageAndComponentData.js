import { toast } from 'react-hot-toast';
import { apiConnector } from './apiConnector';
import { catalogData } from './apis';

export async function getCatalogPageData(categoryId) {

    const toastId = toast.loading('Loading..');

    let result = [];

    try {

        const response = await apiConnector('POST', catalogData.CATALOGPAGEDATA_API, { categoryId })

        console.log('CATALOG PAGE DATA API RESPONSE...', response);

        if (!response.data.success) {

            throw new Error('Could not fetch Category page data');
        }
        result = response.data;

    } catch (error) {

        console.log('CATALOG PAGE DATA API ERROR: ', error);

        toast.error(error.message);

        result = error.response.data;
    }

    toast.dismiss(toastId);

    console.log("RESULT: ", result);

    return result;
}


