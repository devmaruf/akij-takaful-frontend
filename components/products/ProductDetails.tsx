import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import Loading from '@/components/loading';
import { useCallback, useEffect } from 'react';
import { getProductDetailsAction } from '@/redux/actions/product-action';
import { debounce } from "lodash";
import StatusBadge from '@/components/badge/StatusBadge';

interface IProductDetails {
    productID: string;
}

export default function ProductDetails({ productID }: IProductDetails) {

    // const dispatch: Dispatch = useDispatch();
    const { productDetails, loadingDetails } = useSelector((state: RootState) => state.product);


    // const debouncedDispatch = useCallback(
    //     debounce(() => {
    //         dispatch(getProductDetailsAction(productID));
    //     }, 1000),
    //     [productID]
    // );

    // useEffect(() => {
    //     if (typeof productID !== "undefined") {
    //         debouncedDispatch();
    //         return debouncedDispatch.cancel;
    //     }
    // }, [debouncedDispatch, productID]);

    return (

        <div>
            {
                loadingDetails === true ?
                    <div className="text-center">
                        <Loading loadingTitle="Product Details" />
                    </div> :
                    <div className="text-gray-900">
                        {
                            (typeof productDetails !== "undefined" && productDetails !== null) ? (
                                <div className="grid gap-2 grid-cols-2">
                                    <div className='flex justify-between'>
                                        <h6>Product Name</h6>
                                        <h6>:</h6>
                                    </div>
                                    <h6>{productDetails.name}</h6>
                                    <div className='flex justify-between'>
                                        <h6>Project Name</h6>
                                        <h6>:</h6>
                                    </div>
                                    <h6>{productDetails.code}</h6>
                                    <div className='flex justify-between'>
                                        <h6>Product status</h6>
                                        <h6>:</h6>
                                    </div>
                                    <StatusBadge status={productDetails?.status ?? ''} />

                                </div>
                            ) : (
                                <div>Something Went wrong!</div>
                            )
                        }
                    </div>
            }
        </div>

    );
}
