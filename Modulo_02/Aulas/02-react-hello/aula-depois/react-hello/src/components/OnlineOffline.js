import React from "react";

export default function OnlineOffline({ isOnLine = true }) {
	const className = isOnLine ? "bg-green-200" : "bg-red-200";
	return <span className={`${className} p-1`}>{isOnLine ? "Online" : "Offline"}</span>;
}
