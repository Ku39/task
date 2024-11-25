import axios from "axios"
import apiEndpoints from "../res/apiEndpoints.js"

class Api {
    #authToken
    #loginToken
    async auth(userName) {
        try {
            if (!this.authHeaders) await this.#registration(userName)
            await this.#login(userName)
        } catch (err) {
            throw new Error(err.response.data.message || err.response.data || err.message || err)
        }
    }

    async getClients() {
        try {
            if (!this.#authToken || !this.#loginToken) throw new Error("authorization required")
            const body = {
                method: "GET",
                url: apiEndpoints.GET_CLIENTS,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.#loginToken,
                },
            }
            const response = await axios.request(body)
            if (response.status == 200) {
                return response.data
            }
        } catch (err) {
            throw new Error(err.response.data.message || err.response.data || err.message || err)
        }
    }

    async getClientsStatus(userIds) {
        try {
            if (!this.#authToken || !this.#loginToken) throw new Error("authorization required")

            const body = {
                method: "POST",
                url: apiEndpoints.POST_CLIENTS,
                data: {
                    userIds,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.#loginToken,
                },
            }
            const response = await axios.request(body)
            if (response.status == 201) {
                return response.data
            }
        } catch (err) {
            throw new Error(err.response.data.message || err.response.data || err.message || err)
        }
    }
    async #registration(userName) {
        const body = {
            method: "POST",
            url: apiEndpoints.REGISTRATION,
            data: {
                username: userName,
            },
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await axios.request(body)
        if (response.status === 201) {
            this.#authToken = response.data.token
        }
    }

    async #login(userName) {
        const body = {
            method: "POST",
            url: apiEndpoints.LOGIN,
            data: {
                username: userName,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: this.#authToken,
            },
        }
        const response = await axios.request(body)
        if (response.status === 201) {
            this.#loginToken = response.data.token
        }
    }
}

export default new Api()
