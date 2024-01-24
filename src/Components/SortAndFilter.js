import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

const SortAndFilter = ({ filter, setFilter, setSortOrder }) => {
    return (
        <>
            <div>
                <RadioGroup
                    aria-labelledby="radio-buttons-group-label"
                    defaultValue="all"
                    name="radio-buttons-group"
                    row={true}
                    className="center-radio-group"
                >
                    <FormControlLabel
                        value="all"
                        control={<Radio />}
                        label="All"
                        onChange={() => setFilter('all')}
                    />
                    <FormControlLabel
                        value="completed"
                        control={<Radio />}
                        label="Completed"
                        onChange={() => setFilter('completed')}
                    />
                    <FormControlLabel
                        value="pending"
                        control={<Radio />}
                        label="Pending"
                        onChange={() => setFilter('pending')}
                    />
                </RadioGroup>
            </div>
            {filter === 'all' && (
                <RadioGroup
                    aria-labelledby="radio-buttons-group-label"
                    defaultValue="pending"
                    name="radio-buttons-group"
                    row={true}
                    className="center-radio-group"
                >
                    <FormControlLabel
                        value="pending"
                        control={<Radio />}
                        label="Sort by Pending"
                        onChange={() => setSortOrder('pending')}
                    />
                    <FormControlLabel
                        value="completed"
                        control={<Radio />}
                        label="Sort by Completed"
                        onChange={() => setSortOrder('completed')}
                    />
                </RadioGroup>
            )}
        </>
    );
};

export default SortAndFilter;