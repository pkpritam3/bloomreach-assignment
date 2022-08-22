import moment from 'moment';
import React, { useState } from 'react'
import { DateRangePicker } from 'react-date-range'

type CustomDateRangePickerProps = {
    selectedDate: Array<{ startDate: Date, endDate: Date, key: string }>;
    dateSelectHandler: (ranges: any) => void;
}


const CustomDateRangePicker = (props: CustomDateRangePickerProps) => {
    const { selectedDate, dateSelectHandler } = props;
    const [isShowPicker, setIsShowPicker] = useState(false);
    return (
        <div className='position-relative'>
            <div data-testid='date-selector' onClick={() => setIsShowPicker(!isShowPicker)} className='padding-s border-radius-5 cursor-pointer margin-bottom-s border'>
                <div>
                    {moment(selectedDate[0].startDate).format('DD MMM YYYY')}&nbsp;-&nbsp;
                    {moment(selectedDate[0].endDate).format('DD MMM YYYY')}
                </div>
            </div>
            {isShowPicker && <div className='position-absolute right-0'>
                <DateRangePicker
                    className='border'
                    onChange={dateSelectHandler}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    ranges={selectedDate}
                    direction="vertical"
                />
            </div>}
        </div>
    )
}

export default CustomDateRangePicker