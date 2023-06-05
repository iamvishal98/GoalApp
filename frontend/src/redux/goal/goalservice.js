import axios from "axios";

const API_URL = "/api/goals/";

// create new goal

const createGoal = async (goalData) => {
  const response = await axios.post(API_URL, goalData);
  return response.data;
};

// Get user goals
const getGoals = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const deleteGoal = async (goalid) => {
  const response = await axios.delete(API_URL + goalid);
  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
