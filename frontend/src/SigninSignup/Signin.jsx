import { useState } from "react";
import { useNavigate } from "react-router";
import Axios from "../config/Axios";
import "./Signin.css";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await Axios.post("/user/login", {
                email,
                password,
            });
            localStorage.setItem("token", JSON.stringify(res.data.accessToken));
            navigate("/");
        } catch (err) {
            setError(err.response.data);
            setLoading(false);
        }
    };

    return (
        <div className="signin">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Sign In"}
                </button>
                {error && <span className="error">{error}</span>}
                <button onClick={() => navigate("/signup")}>Sign Up</button>
            </form>
        </div>
    );
}

export default Signin;