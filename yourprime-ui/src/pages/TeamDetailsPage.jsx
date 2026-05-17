import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    getMyTeam,
    kickUser,
    makeCaptain,
    getTeamRequests,
    acceptRequest,
    rejectRequest,
    leaveTeam,
    uploadTeamAvatar,
    updateTeamName
} from "../services/team";
import { getCurrentUsername } from "../utils/token";

function TeamDetailsPage() {
    const [team, setTeam] = useState(null);
    const [requests, setRequests] = useState([]);
    const [showRequests, setShowRequests] = useState(false);
    const [message, setMessage] = useState("");

    const currentUsername = getCurrentUsername();
    const navigate = useNavigate();

    const loadTeam = async () => {
        try {
            const data = await getMyTeam();
            setTeam(data);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error");
        }
    };

    const loadRequests = async () => {
        try {
            const data = await getTeamRequests();
            setRequests(data);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await loadTeam();
            await loadRequests();
        };

        fetchData();
    }, []);

    const handleUploadAvatar = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        try {
            const updatedTeam = await uploadTeamAvatar(file);
            setTeam(updatedTeam);
            setMessage("Team avatar updated");
        } catch (error) {
            setMessage(error.response?.data?.message || "Error");
        }
    };

    const handleUpdateTeamName = async () => {
        const newName = prompt("Enter new team name:");

        if (!newName) return;

        try {
            const result = await updateTeamName(newName);
            setMessage(result.message);
            await loadTeam();
        } catch (error) {
            setMessage(error.response?.data?.message || "Error");
        }
    };

    const handleKick = async (userId) => {
        try {
            const result = await kickUser(userId);
            setMessage(result.message);
            await loadTeam();
            await loadRequests();
        } catch (error) {
            setMessage(error.response?.data?.message || "Error");
        }
    };

    const handleTransfer = async (userId) => {
        try {
            const result = await makeCaptain(userId);
            setMessage(result.message);
            await loadTeam();
            await loadRequests();
        } catch (error) {
            setMessage(error.response?.data?.message || "Error");
        }
    };

    const handleAccept = async (userId) => {
        try {
            const result = await acceptRequest(userId);
            setMessage(result.message);
            await loadTeam();
            await loadRequests();
        } catch (error) {
            setMessage(error.response?.data?.message || "Error");
        }
    };

    const handleReject = async (userId) => {
        try {
            const result = await rejectRequest(userId);
            setMessage(result.message);
            await loadTeam();
            await loadRequests();
        } catch (error) {
            setMessage(error.response?.data?.message || "Error");
        }
    };

    const handleLeaveTeam = async () => {
        try {
            const result = await leaveTeam();
            setMessage(result.message);
            navigate("/");
        } catch (error) {
            setMessage(error.response?.data?.message || "Error");
        }
    };

    if (!team) {
        return (
            <div className="page">
                <p>{message || "Loading..."}</p>
            </div>
        );
    }

    const isCaptain = team.captainUsername === currentUsername;
    const hasRequests = requests.length > 0;

    return (
        <div className="page">
            <button className="leave-button" onClick={handleLeaveTeam}>
                Leave
            </button>

            <Link to="/" className="back-button">
                Back
            </Link>

            {message && <p className="message">{message}</p>}

            <div className="team-box">
                <div className="avatar-box">
                    <img
                        src={team.avatarUrl || "/default-team.png"}
                        alt="team avatar"
                        className="team-avatar"
                    />

                    {isCaptain && (
                        <div className="team-actions">
                            <label className="upload-button">
                                Upload avatar
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUploadAvatar}
                                    hidden
                                />
                            </label>

                            <button
                                className="rename-button"
                                onClick={handleUpdateTeamName}
                            >
                                Change name
                            </button>
                        </div>
                    )}
                </div>

                <h1>{team.name}</h1>

                <p>Captain: {team.captainUsername}</p>
                <p>Wins: {team.wins}</p>
                <p>Losses: {team.losses}</p>
                <p>Open: {team.isOpen ? "Yes" : "No"}</p>
                <p>Rating: {team.rating}</p>
                <p>Average level: {team.averageLevel}</p>

                <button
                    className="requests-button"
                    onClick={() => setShowRequests(!showRequests)}
                >
                    Requests
                    {hasRequests && <span className="red-dot"></span>}
                </button>
            </div>

            {showRequests && (
                <div className="requests-box">
                    <h2>Team requests</h2>

                    {requests.length === 0 ? (
                        <p>No requests</p>
                    ) : (
                        <div className="requests-list">
                            {requests.map((request) => (
                                <div className="request-card" key={request.userId}>
                                    <h3>{request.username}</h3>

                                    <p>Age: {request.age}</p>
                                    <p>Level: {request.level}</p>
                                    <p>Goals: {request.goals}</p>
                                    <p>Assists: {request.assists}</p>
                                    <p>Team: {request.teamName}</p>
                                    <p>Role: {request.role}</p>
                                    <p>Status: {request.status}</p>
                                    <p>
                                        Created:{" "}
                                        {new Date(request.createdAt).toLocaleString()}
                                    </p>

                                    {isCaptain && (
                                        <div className="request-actions">
                                            <button
                                                className="accept-button"
                                                onClick={() => handleAccept(request.userId)}
                                            >
                                                Accept
                                            </button>

                                            <button
                                                className="reject-button"
                                                onClick={() => handleReject(request.userId)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <h2>Members</h2>

            <div className="members-list">
                {team.members.map((member) => (
                    <div className="member-box" key={member.userId}>
                        <img
                            src={member.avatarUrl || "/default-avatar.png"}
                            alt="member avatar"
                            className="member-avatar"
                        />

                        <h3>{member.username}</h3>

                        <p>Age: {member.age}</p>
                        <p>Level: {member.level}</p>
                        <p>Goals: {member.goals}</p>
                        <p>Assists: {member.assists}</p>
                        <p>Role: {member.role}</p>

                        {isCaptain && member.role !== "Captain" && (
                            <div className="actions">
                                <button
                                    className="kick-button"
                                    onClick={() => handleKick(member.userId)}
                                >
                                    Kick
                                </button>

                                <button
                                    className="transfer-button"
                                    onClick={() => handleTransfer(member.userId)}
                                >
                                    Transfer
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <style>{`
                .page {
                    padding: 30px;
                    font-family: Arial;
                    background: #f5f5f5;
                    min-height: 100vh;
                }

                .leave-button {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    border: none;
                    background: #dc2626;
                    color: white;
                    padding: 10px 16px;
                    border-radius: 10px;
                    cursor: pointer;
                }

                .back-button {
                    display: inline-block;
                    margin-bottom: 20px;
                    color: black;
                    text-decoration: none;
                }

                .message {
                    background: white;
                    padding: 12px;
                    border-radius: 8px;
                    margin-bottom: 15px;
                }

                .team-box {
                    background: white;
                    padding: 25px;
                    border-radius: 16px;
                    margin-bottom: 30px;
                }

                .avatar-box {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 20px;
                }

                .team-avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .team-actions {
                    display: flex;
                    gap: 10px;
                }

                .upload-button,
                .rename-button {
                    border: none;
                    background: #2563eb;
                    color: white;
                    padding: 10px 14px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                }

                .rename-button {
                    background: #111827;
                }

                .requests-button {
                    position: relative;
                    margin-top: 15px;
                    padding: 10px 16px;
                    border: none;
                    border-radius: 8px;
                    background: black;
                    color: white;
                    cursor: pointer;
                }

                .red-dot {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    width: 12px;
                    height: 12px;
                    background: red;
                    border-radius: 50%;
                }

                .requests-box {
                    background: white;
                    padding: 20px;
                    border-radius: 16px;
                    margin-bottom: 30px;
                }

                .requests-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                }

                .request-card {
                    width: 220px;
                    padding: 15px;
                    border-radius: 12px;
                    background: #f5f5f5;
                }

                .request-actions,
                .actions {
                    display: flex;
                    gap: 10px;
                    margin-top: 15px;
                }

                .request-actions button,
                .actions button {
                    border: none;
                    padding: 8px 12px;
                    border-radius: 8px;
                    color: white;
                    cursor: pointer;
                }

                .accept-button {
                    background: #16a34a;
                }

                .reject-button,
                .kick-button {
                    background: #dc2626;
                }

                .transfer-button {
                    background: #2563eb;
                }

                .members-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                }

                .member-box {
                    background: white;
                    padding: 20px;
                    border-radius: 14px;
                    width: 220px;
                }

                .member-avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    object-fit: cover;
                }
            `}</style>
        </div>
    );
}

export default TeamDetailsPage;