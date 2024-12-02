"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalGovernments = exports.getStates = void 0;
const states_1 = require("../constants/states");
// Get all states
const getStates = async (req, res) => {
    try {
        return res.status(200).json(states_1.statesData);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching states', error });
    }
};
exports.getStates = getStates;
// Get local governments by state ID
const getLocalGovernments = async (req, res) => {
    const { stateId } = req.params;
    try {
        const state = states_1.statesData.find((s) => s.id === +stateId);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        return res.status(200).json(state.localGovernmentAreas);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching local governments', error });
    }
};
exports.getLocalGovernments = getLocalGovernments;
