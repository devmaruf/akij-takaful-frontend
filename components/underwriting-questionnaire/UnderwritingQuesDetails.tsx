import { memo } from "react";

function UnderwritingQuesDetails({ data }: any) {

    return (
        <div className="grid gap-2 grid-cols-2">
            <div className='flex justify-between'>
                <h6>Requirement Name (en)</h6>
                <h6>:</h6>
            </div>
            <h6>{data.requirement_name_en}</h6>
            <div className='flex justify-between'>
                <h6>Requirement Name (bn)</h6>
                <h6>:</h6>
            </div>
            <h6>{data.requirement_name_bn}</h6>
            <div className='flex justify-between'>
                <h6>Input Type</h6>
                <h6>:</h6>
            </div>
            <h6>{data.input_type}</h6>
            <div className='flex justify-between'>
                <h6>Gender</h6>
                <h6>:</h6>
            </div>
            <h6>{data.gender}</h6>
        </div>
    )
}

export default memo(UnderwritingQuesDetails);