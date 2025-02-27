const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";
const RANGE = "Sheet1!A:I";

// Tambah Transaksi
app.post("/tambahTransaksi", async (req, res) => {
    const { tanggal, waktu, jenis, keterangan, jumlah, rekening } = req.body;

    try {
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
            valueInputOption: "RAW",
            resource: {
                values: [[tanggal, waktu, jenis, keterangan, jumlah, rekening]]
            }
        });
        res.json({ message: "Transaksi berhasil disimpan!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ambil Saldo
app.get("/getSaldo", async (req, res) => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: "Sheet1!G2:I2"
        });

        res.json({ saldo: response.data.values[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server berjalan di port 3000"));
