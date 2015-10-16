export function UserState() {
    var userStatePrototype = {
        users: [],
		count: 30,
		checked: false
    }
    return Object.create(userStatePrototype, {});
};