const {findUserById, getUserData, saveUserData} = require('../models');


exports.allAccess = (req, res) => {
    res.status(200).send("Welcome to habit app. Please sign in or register to make your first habits");
};

exports.userHabits = (req, res) => {
    const existedUsers = getUserData();
    const userIdx = existedUsers.findIndex(u => u.id === req.userId);
    res.status(200).json(existedUsers[userIdx].habits);
};

exports.userAddHabit = (req, res) => {
    const existedUsers = getUserData();
    const userIdx = existedUsers.findIndex(u => u.id === req.userId);
    console.log(req.body.name);
    const id = existedUsers[userIdx].habits.length ? Math.max(...existedUsers[userIdx].habits.map(h => h.id)) + 1 : 10000;
    const habit = {activity: [], ...req.body, id};

    existedUsers[userIdx].habits.push(habit);

    saveUserData(existedUsers);

    res.status(201).json(habit);
};

exports.userDoneHabit = (req, res) => {
    const existedUsers = getUserData();
    const userIdx = existedUsers.findIndex(u => u.id === req.userId);

    const id = req.body.id;
    if (!id) {
        return res.status(400).send({error: true, msg: 'Bad request, id is missing'})
    }

    const habit = existedUsers[userIdx].habits.find(h => h.id === id);
    habit.activity.push(Date.now());
    saveUserData(existedUsers);

    res.status(200).json(habit);
};

exports.userUpdateHabit = (req, res) => {
    const existedUsers = getUserData();
    const userIdx = existedUsers.findIndex(u => u.id === req.userId);

    const habitUpd = req.body;
    const habitIdx = existedUsers[userIdx].habits.findIndex(h => h.id === habitUpd.id);
    if (habitIdx === -1) {
        return res.status(404).send({error: true, msg: 'Habit not found'})
    }

    existedUsers[userIdx].habits[habitIdx] = habitUpd;

    saveUserData(existedUsers);

    res.status(200).json(habitUpd);
};

exports.userDeleteHabit = (req, res) => {
    const existedUsers = getUserData();
    const userIdx = existedUsers.findIndex(u => u.id === req.userId);

    const habitId = req.query.id;
    if (!habitId) {
        return res.status(400).send({error: true, msg: 'Bad request, {id} parameter absent'})
    }

    const idx = existedUsers[userIdx].habits.findIndex(h => h.id === Number.parseInt(habitId));
    if (idx === -1) {
        return res.status(404).send({error: true, msg: 'Habit not found'})
    }

    const habits = existedUsers[userIdx].habits;

    existedUsers[userIdx].habits = [...habits.slice(0, idx), ...habits.slice(idx + 1)];

    saveUserData(existedUsers);

    res.status(200).json({success: true});
};


exports.userCategories = (req, res) => {
    const user = findUserById(req.userId);
    res.status(200).json(user.categories);
};

exports.userAddCategory = (req, res) => {
    const existedUsers = getUserData();
    const userIdx = existedUsers.findIndex(u => u.id === req.userId);

    const id = existedUsers[userIdx].categories.length ? Math.max(...existedUsers[userIdx].categories.map(c => c.id)) + 1 : 1000;
    const category = {...req.body, id};

    existedUsers[userIdx].categories.push(category);

    saveUserData(existedUsers);

    res.status(200).json(category);
};