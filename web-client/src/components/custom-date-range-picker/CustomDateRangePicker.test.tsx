import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import CustomDateRangePicker from '.';


describe('CustomDateRangePicker Component', () => {
    beforeAll(() => {
    });

    test('opens date selector on click', async () => {
        const { getByTestId } = render(<CustomDateRangePicker selectedDate={[{ startDate: new Date(), endDate: new Date(), key: 'selector' }]} dateSelectHandler={() => { }} />)
        fireEvent.click(getByTestId('date-selector'));
        expect(screen.getByText('Today')).toBeInTheDocument()
    });

});
