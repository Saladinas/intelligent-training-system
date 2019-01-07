// Same structure as 'Differences model' class in class diagram
export default [
    {
        type: "cardio",
        lowerThreshold: 0,
        higherThreshold: 40,
        advice: "continue",
    },
    {
        type: "cardio",
        lowerThreshold: 40,
        higherThreshold: null,
        advice: "take a break",
    },
    {
        type: "strength",
        lowerThreshold: 0,
        higherThreshold: 60,
        advice: "continue",
    },
    {
        type: "strength",
        lowerThreshold: 60,
        higherThreshold: null,
        advice: "take a break",
    },
]