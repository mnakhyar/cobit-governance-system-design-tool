import { UserInputs, ScoreResult } from '../../types';
import { GOVERNANCE_OBJECTIVES, DESIGN_FACTORS, OBJECTIVE_BASELINES } from '../../constants/cobitData';
import { DF5_MAPPING } from '../../constants/mappings/df5Mapping';


/**
 * Calculates scores for Design Factor 5.
 * @param inputs - The full UserInputs object.
 * @param factorId - The ID of the factor to calculate for (e.g., 'df5').
 * @returns An array of ScoreResult for the specified factor.
 */
export const calculateDf5Scores = (inputs: UserInputs, factorId: string): ScoreResult[] => {
    const factor = DESIGN_FACTORS.find(f => f.id === factorId);
    if (!factor || !factor.options) return [];

    const factorInputs = inputs[factor.id];
    if (!factorInputs) return [];

    return GOVERNANCE_OBJECTIVES.map(obj => {
        const objectiveWeights = DF5_MAPPING[obj.id];
        let rawScore = 0;

        if (objectiveWeights) {
            // Calculate the raw score based on the user's percentage inputs and the new weights
            rawScore = factor.options!.reduce((acc, option) => {
                const inputValue = (factorInputs[option.id] as number || 0) / 100;
                // The option name 'High' or 'Normal' matches the key in the DF5_MAPPING weight object.
                const weightKey = option.name as keyof typeof objectiveWeights;
                const weight = objectiveWeights[weightKey] || 0;
                return acc + (inputValue * weight);
            }, 0);
        }
        
        const finalScore = Math.round(rawScore * 100) / 100;

        const dfKey = factorId as keyof typeof OBJECTIVE_BASELINES[string];
        const baselineScore = OBJECTIVE_BASELINES[obj.id]?.[dfKey] || 0;
        
        let relativeImportance = 0; // Default to 0 as per Step 4

        // Implement the new 4-step algorithm for Relative Importance
        if (baselineScore > 0) { // Step 4: Handle division by zero
            // Step 1: Calculate Percentage Ratio
            const percentageRatio = (finalScore * 100) / baselineScore;
    
            // Step 2: Round to nearest 5
            const roundedToNearest5 = Math.round(percentageRatio / 5) * 5;
    
            // Step 3: Convert to Relative Score
            relativeImportance = roundedToNearest5 - 100;
        }
        
        return {
            objectiveId: obj.id,
            objectiveName: obj.name,
            domain: obj.domain,
            rawScore: rawScore,
            normalizedScore: 0, 
            finalScore: finalScore,
            baselineScore: baselineScore,
            relativeImportance: relativeImportance,
            capabilityLevel: 0,
        };
    }).sort((a, b) => b.finalScore - a.finalScore);
};