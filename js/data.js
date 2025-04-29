// Initialize demo data if no users exist
if (localStorage.length === 0) {
    const demoStudents = {
        "jsmith": {
            netid: "jsmith",
            courses: ["CSE 142", "MATH 124", "PHYS 121"],
            schedule: {
                Monday: [10, 11, 15],
                Wednesday: [10, 11],
                Friday: [13, 14]
            }
        },
        "mjohnson": {
            netid: "mjohnson",
            courses: ["CSE 143", "MATH 125", "CHEM 152"],
            schedule: {
                Tuesday: [9, 10],
                Thursday: [14, 15],
                Friday: [10, 11]
            }
        },
        "dlee": {
            netid: "dlee",
            courses: ["CSE 154", "INFO 200", "MATH 126"],
            schedule: {
                Monday: [14, 15],
                Wednesday: [14, 15],
                Friday: [9, 10]
            }
        },
        "twilliams": {
            netid: "twilliams",
            courses: ["CSE 142", "PHYS 121", "ENGL 131"],
            schedule: {
                Tuesday: [13, 14],
                Thursday: [13, 14],
                Friday: [15, 16]
            }
        }
    };

    // Store demo data
    Object.keys(demoStudents).forEach(netid => {
        localStorage.setItem(netid, JSON.stringify(demoStudents[netid]));
    });

    console.log("Demo students initialized");
}