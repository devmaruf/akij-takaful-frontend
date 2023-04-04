import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Loading from '@/components/loading';
import StatusBadge from '@/components/badge/StatusBadge';
import { formatCurrency } from '@/utils/currency';
import { IProductRate } from '@/redux/interfaces';

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
                                        <h6>Code</h6>
                                        <h6>:</h6>
                                    </div>
                                    <h6>{productDetails.code}</h6>
                                    <div className='flex justify-between'>
                                        <h6>Product status</h6>
                                        <h6>:</h6>
                                    </div>
                                    <StatusBadge status={productDetails?.status ?? ''} />
                                    <div className='flex justify-between'>
                                        <h6>Product rates</h6>
                                        <h6>:</h6>
                                    </div>
                                    <div>
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='bg-slate-100'>
                                                    <th className='p-1 text-left'>Age</th>
                                                    <th className='p-1 text-left'>Term</th>
                                                    <th className='p-1 text-left'>Rate</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    productDetails.rates.map((rate: IProductRate, index: number) => (
                                                        <tr key={index}>
                                                            <td className='p-1 pb-2 border-b text-sm'>{rate.age}</td>
                                                            <td className='p-1 pb-2 border-b text-sm'>{rate.term}</td>
                                                            <td className='p-1 pb-2 border-b text-sm'>{formatCurrency(rate.rate)}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
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
