import React, { useState } from "react";
import { useNavigate } from "react-router";
import Axios from "../config/Axios";

const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await Axios.post("/user/register", {
                username,
                email,
                password,
            });
            if(res.status === 200) navigate("/signin");
            else alert("User data is not valid");
        } catch (err) {
            setError(err.response.data);
            setLoading(false);
        }
    };

    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                    {loading ? "Loading..." : "Sign Up"}
                </button>
                {error && <span className="error">{error}</span>}
            </form>
        </div>
    );
}

export default Signup;