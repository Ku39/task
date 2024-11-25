import ApiHelper from "./helpers/Api.helper.js"
import SheetHelper from "./helpers/Sheet.helper.js"
;(async () => {
    try {
        await SheetHelper.auth()
        await ApiHelper.auth(process.env.USERNAME)

        const result = new Set()

        const users = await ApiHelper.getClients()
        const userIds = users.map((user) => user.id)
        const userStatuses = await ApiHelper.getClientsStatus(userIds)

        const map = userStatuses.reduce((acc, obj) => {
            acc[obj.id] = obj
            return acc
        }, {})

        users.forEach((user) => {
            result.add({ ...user, ...map[user.id] })
        })

        await SheetHelper.addData(result)

        console.log("data written successfully")
    } catch (err) {
        console.error(err.message || err)
    }
})()
