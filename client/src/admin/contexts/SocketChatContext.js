import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import io from "socket.io-client";
import axios from "axios";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		if (user.auth) {
			const socket = io("http://localhost:8080", {
				query: {
					userId: user.user.id_acc,
				},
			});
			setSocket(socket);
			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});
			socket.on('getMessage',(message)=>{
				console.log(message)
			})

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [user]);

	const getSocketId = (id)=>{
		let socketId
		axios.get('/api/message/socketid/'+id)
		.then((result) => {
			socketId = result.data
		}).catch((err) => {
			socketId = null
		});
	}
	

	return <SocketContext.Provider value={{ socket, onlineUsers, getSocketId }}>{children}</SocketContext.Provider>;
};