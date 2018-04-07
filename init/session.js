module.exports = (app) => {
    app.sessionStore = {
        async get(key) {
            const session = await app.model.Session.findOne({ key });
            if (!session) return null
            return JSON.parse(session.value);
        },
        async set(key, value, maxAge) {
            if (!maxAge) maxAge = 5 * 60 * 60 * 1000;
            value = JSON.stringify(value);
            await app.model.Session.update({ key }, { $set: { value } }, {
                upsert: true
            });
        },
        async destroy(key) {
            await app.model.Session.remove({ key })
        }
    }
}