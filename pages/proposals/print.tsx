import { useState } from "react";

import PageHeader from "@/components/layouts/PageHeader";
import { PageContent } from "@/components/layouts/PageContent";
import { PrintForm } from "@/components/proposals/PrintForm";
import Button from "@/components/button";

export default function PropoalPrintPage() {
  const [isAssign, setIsAssign] = useState<boolean>(true);

  return (
    <div>
      <PageHeader
        title={`${isAssign ? 'Allotment' : 'Print'} Proposal`}
        hasSearch={false}
        pageTitleRightSide={
          <Button
            title={`Toggle ${isAssign ? 'Print' : 'Allotment'} mode`}
            onClick={() => setIsAssign(!isAssign)}
            variant="default"
            iconLeft={<i className="bi bi-check2-circle mr-2"></i>}
          />
        }
      />

      <PageContent>
        <PrintForm isAssign={isAssign} />
      </PageContent>
    </div>
  );
}
