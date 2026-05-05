import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send(`Hello World!, Server running on http://localhost:${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
