import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CallIcon from '@mui/icons-material/Call';
import { Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { getAuth, signOut } from 'firebase/auth';
import db from './firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

function Sidebar() {
	const user = useSelector(selectUser);
	const auth = getAuth();
	const [channels, setChannels] = useState([]);
	const colRef = collection(db, 'channels');

	useEffect(() => {
		onSnapshot(colRef, snapshot => {
			setChannels(
				snapshot.docs.map(doc => ({
					id: doc.id,
					channel: doc.data()
				}))
			);
		});
	}, []);

	const handleAddChannel = () => {
		const channelName = prompt('Enter a new channel name');

		if (channelName) {
			addDoc(colRef, {
				channelName: channelName
			});
		}
	};

	return (
		<div className="sidebar">
			<div className="sidebar__top">
				<h3>Clever Programmer</h3>
				<ExpandMoreIcon />
			</div>

			<div className="sidebar__channels">
				<div className="sidebar__channelsHeader">
					<div className="sidebar__header">
						<ExpandMoreIcon />
						<h4>Text Channels</h4>
					</div>
					<AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
				</div>
				<div className="sidebar_channelsList">
					{channels.map(({ id, channel }) => (
						<SidebarChannel
							key={id}
							id={id}
							channelName={channel.channelName}
						/>
					))}
				</div>
			</div>

			<div className="sidebar__voice">
				<SignalCellularAltIcon
					className="sidebar__voiceIcon"
					fontSize="large"
				/>
				<div className="sidebar__voiceInfo">
					<h3>Voice Connected</h3>
					<p>Stream</p>
				</div>
				<div className="sidebar__voiceIcons">
					<InfoOutlinedIcon />
					<CallIcon />
				</div>
			</div>

			<div className="sidebar__profile">
				<Avatar src={user.photo} onClick={() => signOut(auth)} />
				<div className="sidebar__profileInfo">
					<h3>{user.displayName}</h3>
					<p>#{user.uid.substring(0, 5)}</p>
				</div>

				<div className="sidebar__profileIcons">
					<MicIcon />
					<HeadsetIcon />
					<SettingsIcon />
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
