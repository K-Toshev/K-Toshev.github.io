const demoStudents = {
    "jsmith": {
        netid: "jsmith",
        email: "jsmith@uw.edu",
        courses: ["CSE 142", "MATH 124", "PHYS 121"],
        schedule: {
            Monday: [10, 11, 15],
            Wednesday: [10, 11],
            Friday: [13, 14]
        }
    },
    "mjohnson": {
        netid: "mjohnson",
        email: "mjohnson@uw.edu",
        courses: ["CSE 143", "MATH 125", "CHEM 152"],
        schedule: {
            Tuesday: [9, 10],
            Thursday: [14, 15],
            Friday: [10, 11]
        }
    },
    "dlee": {
        netid: "dlee",
        email: "dlee@uw.edu",
        courses: ["CSE 154", "INFO 200", "MATH 126"],
        schedule: {
            Monday: [14, 15],
            Wednesday: [14, 15],
            Friday: [9, 10]
        }
    },
    "twilliams": {
        netid: "twilliams",
        email: "twilliams@uw.edu",
        courses: ["CSE 142", "PHYS 121", "ENGL 131"],
        schedule: {
            Tuesday: [13, 14],
            Thursday: [13, 14],
            Friday: [15, 16]
        }
    }
};

Object.keys(demoStudents).forEach(netid => {
    localStorage.setItem(netid, JSON.stringify(demoStudents[netid]));
});

console.log("Demo students initialized");