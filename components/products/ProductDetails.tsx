import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Loading from '@/components/loading';
import StatusBadge from '@/components/badge/StatusBadge';

export default function ProductDetails() {
    const { productDetails, loadingDetails } = useSelector((state: RootState) => state.product);
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
                                        <h6>Bank name</h6>
                                        <h6>:</h6>
                                    </div>
                                    <h6>{productDetails.project_name}</h6>
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
