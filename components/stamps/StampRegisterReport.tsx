import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

import { PageContentList } from '@/components/layouts/PageContentList';
import PageHeader from '@/components/layouts/PageHeader';
import Input from '@/components/input';
import Button from '@/components/button';
import { getCurrentDate, getDateBeforeMonth } from '@/utils/date-helper';
import { stampRegistarReportDownload } from '@/redux/actions/stamp-register-action';

export default function StampRegisterReport() {
  const dispatch: Dispatch = useDispatch();
  const [startDate, setStartDate] = useState<string>(getDateBeforeMonth(1));
  const [endDate, setEndDate] = useState<string>(getCurrentDate());
  const { isSubmitting } = useSelector((state: RootState) => state.stamp);

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(stampRegistarReportDownload(startDate, endDate));
  }

  return (
    <div>
      <PageHeader
        title='Stamp Register Report'
        hasSearch={false}
      />

      <PageContentList>
        <form method='post' autoComplete="off" onSubmit={onSubmit}>
          <div className="flex flex-col md:flex-row">
            <Input
              type='date'
              label="Start date"
              name="start_date"
              value={startDate}
              isRequired={true}
              inputChange={(name: string, value: string) => setStartDate(value)}
              areaClassNames={'flex-1 mr-3'}
            />
            <Input
              type='date'
              label="End date"
              name="end_date"
              value={endDate}
              isRequired={true}
              inputChange={(name: string, value: string) => setEndDate(value)}
              areaClassNames={'flex-1 mr-3'}
            />
          </div>
          <div className="flex flex-start mt-3">
            <Button
              title='Download Report'
              loading={isSubmitting}
              disabled={isSubmitting}
              loadingTitle='Downloading report...'
              iconLeft={<i className='bi bi-file-earmark-spreadsheet mr-2'></i>}
            />
          </div>
        </form>
      </PageContentList>
    </div>
  );
}
