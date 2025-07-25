import { MS } from 'src/stores/masterStore';
import './Sidebar.scss';
import Select from "react-select";
import { useState } from 'react';

interface YearOption{
    value: number;
    label: string;
}

interface TypeOption{
    value: string;
    label: string;
}

const Sidebar: React.FC = () => {
    const selectedYear = MS.use.selectedYear();
    const setSelectedYear = MS.getState().setSelectedYear;
    const selectChange = MS.use.baselineChange();
    const setBaselineChange = MS.getState().setBaselineChange;

    const yearOptions: YearOption[] = [
        { value: 2030, label: '2030' },
        { value: 2050, label: '2050' },
        { value: 2080, label: '2080' },
    ];

    const baselineOptions: TypeOption[] = [
        { value: 'Absolute', label: 'Absolute' },
        { value: 'Change', label: 'Change' },
    ];

    const handleYearOption = (selection: YearOption | null) => {
        if (selection) {
            setSelectedYear(selection.value);
        }
    };

    const handleBaselineOption = (selection: TypeOption | null) => {
        if (selection) {
            setBaselineChange(selection.value);
        }
    };

    return (
        <div className="map-sidebar">
            <p className="subtitle">Year</p>
            <Select
                options={yearOptions}
                value={{value: selectedYear, label: String(selectedYear)}}
                onChange={handleYearOption}
            />
            <p className="subtitle">Value</p>
            <Select
                options={baselineOptions}
                value={{value: selectChange, label: selectChange}}
                onChange={handleBaselineOption}
            />
        </div>
    );
};

export default Sidebar;
