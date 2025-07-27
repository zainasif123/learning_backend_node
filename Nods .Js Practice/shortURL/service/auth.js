const sessionIdtoUserMap = new Map();

function setUser(id, user) {
  sessionIdtoUserMap.set(id, user);
}

function getUser(id) {
  sessionIdtoUserMap.get(id);
}

module.exports = { setUser, getUser };
