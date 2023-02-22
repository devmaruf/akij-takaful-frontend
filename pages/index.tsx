import Card from "@/components/card";

export default function Home() {
  return (
    <>
      <div className="pt-6 px-4">
        <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  282
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  PROPOSAL SUBMITTED
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                39,301৳
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-blue-900">
                  20
                </span>
                <h3 className="text-base font-normal text-blue-500">
                  PAYMENT PENDING
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-blue-500 text-base font-bold">
                12,301৳
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-blue-900">
                  5
                </span>
                <h3 className="text-base font-normal text-blue-500">
                  PENDING UND APPROVAL
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-blue-500 text-base font-bold">
                5,301৳
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-blue-900">
                  4
                </span>
                <h3 className="text-base font-normal text-blue-500">
                  PENDING PROPOSAL
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-blue-500 text-base font-bold">
                3,301৳
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  100
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  APPROVED PROPOSAL
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                63,301৳
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-red-900">
                  2
                </span>
                <h3 className="text-base font-normal text-red-500">
                  EXPIRED PROPOSAL
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                2,301৳
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  130
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  COMPLETED POLICY
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                90,301৳
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
