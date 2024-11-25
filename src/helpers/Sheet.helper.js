import { google } from "googleapis"
import dotenv from "dotenv"

dotenv.config()

class Sheet {
    sheets
    spreadsheetId
    async auth() {
        const auth = new google.auth.GoogleAuth({
            keyFile: "src/res/cred.json",
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        })
        this.sheets = google.sheets({ version: "v4", auth })
        this.spreadsheetId = process.env.SPREADSHEET_ID
    }

    async addData(data) {
        const values = [...data].map((item) => [
            item.id,
            item.firstName,
            item.lastName,
            item.gender,
            item.address,
            item.city,
            item.phone,
            item.email,
            item.status,
        ])

        await this.sheets.spreadsheets.values.append({
            spreadsheetId: this.spreadsheetId,
            range: process.env.SHEETNAME,
            valueInputOption: "RAW",
            requestBody: {
                values: [
                    [
                        "id",
                        "firstName",
                        "lastName",
                        "gender",
                        "address",
                        "city",
                        "phone",
                        "email",
                        "status",
                    ],
                    ...values,
                ],
            },
        })
    }
}

export default new Sheet()
