// Mock Tests Loader - Combines all mock test arrays
const MOCK_TESTS = [
    ...MOCK_TESTS_1,
    ...MOCK_TESTS_2,
    ...MOCK_TESTS_3,
    ...MOCK_TESTS_4,
    ...MOCK_TESTS_5
];

// Assign unique test IDs
MOCK_TESTS.forEach((test, i) => {
    test.id = i;
    test.questions.forEach((q, j) => {
        q.id = `t${i}_q${j}`;
    });
});

console.log(`Loaded ${MOCK_TESTS.length} mock tests with ${MOCK_TESTS.reduce((s,t)=>s+t.questions.length,0)} total MCQs.`);
