
import React from 'react';
import { DesignFactorOption } from '../types';

interface PercentageGroupProps {
    options: DesignFactorOption[];
    values: { [key: string]: number };
    onChange: (newValues: { [key: string]: number }) => void;
    baselines?: { [key: string]: number };
}

const PercentageGroup: React.FC<PercentageGroupProps> = ({ options, values, onChange, baselines }) => {
    
    const handleValueChange = (id: string, newValue: number) => {
        // Clamp the new value between 0 and 100
        newValue = Math.max(0, Math.min(100, newValue));
        
        const oldValue = values[id];
        const delta = newValue - oldValue;
        if(Math.abs(delta) < 1 && newValue !== 0 && newValue !== 100) return; // Avoid tiny updates from slider drag

        const otherOptions = options.filter(opt => opt.id !== id);
        const newValues = { ...values, [id]: newValue };

        let totalToDistribute = -delta;
        
        // Distribute the delta among other sliders proportionally
        const otherSum = otherOptions.reduce((sum, opt) => sum + values[opt.id], 0);

        if (otherSum > 0) {
             for (const opt of otherOptions) {
                const proportion = values[opt.id] / otherSum;
                const change = totalToDistribute * proportion;
                newValues[opt.id] += change;
            }
        } else if (otherOptions.length > 0) {
            // If others are zero, distribute equally
            const changePerOption = totalToDistribute / otherOptions.length;
            for (const opt of otherOptions) {
                newValues[opt.id] += changePerOption;
            }
        }
       
        // Final pass to ensure it all sums to 100 due to rounding
        const finalSum = Object.values(newValues).reduce((sum, val) => sum + val, 0);
        const roundingError = 100 - finalSum;
        const keyToAdjust = Object.keys(newValues).find(k => k !== id && newValues[k] + roundingError >= 0 && newValues[k] + roundingError <= 100) || id;
        if(keyToAdjust) newValues[keyToAdjust] += roundingError;
        
        // Final clamp and round
        Object.keys(newValues).forEach(key => {
            newValues[key] = Math.round(Math.max(0, Math.min(100, newValues[key])));
        });
        
        // Another pass to fix sum due to rounding
        const finalSumAfterRound = Object.values(newValues).reduce((sum, val) => sum + val, 0);
        if (finalSumAfterRound !== 100) {
            const finalError = 100 - finalSumAfterRound;
            const keyToAdjustLast = Object.keys(newValues).find(k => newValues[k] + finalError <= 100 && newValues[k] + finalError >= 0) || Object.keys(newValues)[0];
            if(keyToAdjustLast) newValues[keyToAdjustLast] += finalError;
        }


        onChange(newValues);
    };
    
    const handleNumberInputChange = (id: string, valueStr: string) => {
        const parsedValue = parseInt(valueStr, 10);
        // Treat empty or invalid input as 0, to prevent NaN and allow clearing the field
        handleValueChange(id, isNaN(parsedValue) ? 0 : parsedValue);
    };


    return (
        <div className="space-y-4">
            {options.map(option => (
                <div key={option.id} className="grid grid-cols-12 gap-x-4 items-center">
                    <div className="col-span-12 sm:col-span-9">
                        <label htmlFor={option.id} className="block text-sm font-medium text-gray-700">{option.name}</label>
                        <div className="flex items-center space-x-4 mt-1">
                            <input
                                id={option.id}
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={values[option.id] || 0}
                                onChange={(e) => handleValueChange(option.id, parseInt(e.target.value, 10))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={Math.round(values[option.id] || 0)}
                                onChange={(e) => handleNumberInputChange(option.id, e.target.value)}
                                className="w-20 p-2 text-center border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                            />
                            <span className="font-semibold text-gray-600">%</span>
                        </div>
                    </div>
                     <div className="col-span-12 sm:col-span-3 text-center sm:border-l sm:pl-4 mt-2 sm:mt-0">
                        {baselines && baselines[option.id] !== undefined && (
                            <>
                                <span className="text-xs text-gray-500 uppercase">Baseline</span>
                                <span className="block font-bold text-lg text-primary">{baselines[option.id]}%</span>
                            </>
                        )}
                    </div>
                </div>
            ))}
            <div className="text-right text-sm font-bold text-gray-600 pr-16">
               Total: {Object.values(values).reduce((acc, v) => acc + Math.round(v), 0)}%
            </div>
        </div>
    );
};

export default PercentageGroup;