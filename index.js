const express = require("express"); // CommonJS Modules
const shortid = require("shortid");

const server = express();

server.use(express.json());

// console.log(shortid.generate()); // Logging to make sure shortId install works; it does.

let users = [
    {
        // id: shortid.generate(),
        id: 1,
        name: "Billy Joe",
        bio: "Lives in a farm."
    },
    {
        // id: shortid.generate(),
        id: 2,
        name: "Mario",
        bio: "Lives to tell the story."
    },
    {
        // id: shortid.generate(),
        id: 3,
        name: "Luigi",
        bio: "Dies in chapter 4."
    },
]

server.get("/", (req, res) => {
    res.json("Day 1 API working!");
});

server.post("/api/users", (req, res) => {
    const userInformation = req.body;
    // console.log(userInformation)
    userInformation.id = shortid.generate();

    if(userInformation.name === null || userInformation.bio === null || userInformation.name === "" || userInformation.bio === "") {
        res.status(400).json({ Error: "Please provide name and bio for the user." });
    }
    else if(!userInformation) {
        res.status(500).json({Error: "There was an error trying to get there data."});
    }
    else {
        users.push(userInformation)
        res.status(201).json(users);
    }
});

server.get("/api/users", (req, res) => {
    // Return  array of all users

    if(!users) { // Not sure about this one
        res.status(500).json({ Error: "The users information could not be retrieved."});
    }
    else {
        // console.log("This is from log", users);
        res.status(201).json(users);
    }
})

server.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const selectUser = users.find(user => user.id == id);

    if(selectUser) {
        res.status(201).json(selectUser)
    }
    else if (!selectUser) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    }
})

server.delete("/api/users/:id", (req, res) => {
    // Find the user in the array and remove it.
    const id = req.params.id;

    const usersFind = users.find(user => user.id == id);
     
    if(usersFind) {
    users = users.filter(user => user.id != id);
    res.status(200).json(users);
    }
    else if(!usersFind) {
    res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    else {
    res.status(500).json({ errorMessage: "The user could not be removed" });
    }
})

server.patch("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const usersFind = users.find(user => user.id == id);
    const newInfo = req.body;
    // console.log(users)

    if(newInfo.name !== null || newInfo.bio !== null || newInfo.name !== "" || newInfo.bio !== "") {
        users = users.map(item => {
            if(item.id == id) {
                item = newInfo;
                console.log("THIS IS X", item);
                return item
            } else {
                return item;
            }
        })
        res.status(201).json(users);
    }
    else if(!usersFind) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    else {
        res.status(500).json({ errorMessage: "The user information could not be modified." });
    }
})

server.listen(8000, () => console.log("\n ==API is up== \n"));
