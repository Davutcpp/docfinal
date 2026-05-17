import { useEffect, useState } from "react";
import { getMyTeam } from "../services/team";
import { removeToken } from "../utils/token";
import { Link } from "react-router-dom";
function Dashboard({ onLogout }) {
    const [team, setTeam] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const loadMyTeam = async () => {
            try {
                const data = await getMyTeam();
                setTeam(data);
            } catch (error) {
                setMessage(error.response?.data?.message || "Error");
            }
        };

        loadMyTeam();
    }, []);

    const handleLogout = () => {
        removeToken();
        onLogout();
    };

    return (
        <div className="dashboard">
            <div className="topbar">
                <h2>Dashboard</h2>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {message && (
                <div className="message">
                    {message}
                </div>
            )}

            {team && (
                <>
                    <div className="team-card">
                        <img
                            src={team.avatarUrl || "/default-team.png"}
                            alt="team avatar"
                            className="team-avatar"
                        />

                        <h1>{team.name}</h1>

                        <div className="team-info">
                            <p>
                                Captain: {team.captainUsername}
                            </p>

                            <p>
                                Wins: {team.wins}
                            </p>

                            <p>
                                Losses: {team.losses}
                            </p>

                            <p>
                                Rating: {team.rating}
                            </p>

                            <p>
                                Average level: {team.averageLevel}
                            </p>
                        </div>
                    </div>

                    <h3 className="members-title">
                        Members
                    </h3>

                    <Link to="/team-details" className="details-button">
                        Team details
                    </Link>

                    <div className="members">
                        {team.members.map((member) => (
                            <div
                                className="member-card"
                                key={member.userId}
                            >
                                <img
                                    src={
                                        member.avatarUrl ||
                                        "/default-avatar.png"
                                    }
                                    alt="member avatar"
                                    className="member-avatar"
                                />

                                <h4>
                                    {member.username}
                                </h4>

                                <p>
                                    Level: {member.level}
                                </p>

                                <p>
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>

                </>
            )}

            <style>{`
            
           
                .dashboard {
                    padding: 30px;
                    background: #f5f5f5;
                    min-height: 100vh;
                    font-family: Arial;
                }
                
               .details-button {
                    display: inline-block;
                    margin-bottom: 20px;
                    padding: 10px 16px;
                    background: black;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
               }

                .topbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                }

                .topbar button {
                    padding: 10px 16px;
                    border: none;
                    background: black;
                    color: white;
                    cursor: pointer;
                    border-radius: 8px;
                }

                .team-card {
                    background: white;
                    padding: 25px;
                    border-radius: 16px;
                    margin-bottom: 30px;
                }

                .team-avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 15px;
                }

                .team-card h1 {
                    margin-bottom: 20px;
                }

                .team-info {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .members-title {
                    margin-bottom: 20px;
                }

                .members {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                }

                .member-card {
                    background: white;
                    padding: 20px;
                    border-radius: 14px;
                    width: 180px;
                    text-align: center;
                }

                .member-avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 10px;
                }

                .message {
                    background: white;
                    padding: 20px;
                    border-radius: 12px;
                }
            `}</style>
        </div>
    );
}

export default Dashboard;