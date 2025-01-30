import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import HospitalIcon from "../assets/logo1.png";
import LogoutIcon from "../assets/download.png";

const cookies = new Cookies();
const SideBar = () => (
  <div
    className="channel-list__sidebar"
    style={{
      display: "none",
      position: "fixed",
      top: 0,
      left: 0,
      width: "89%",
      height: "100%",
      backgroundColor: "#411E46",
      zIndex: 1000,
    }}
  >
    {/* <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} alt="Hospital" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner">
        <img src={LogoutIcon} alt="Logout" width="30" />
      </div>
    </div> */}
  </div>
);

// const CompanyHeader = () => (
//   <div className="channel-list__header">
//     <p className="channel-list__header__text">SOFT EMPIRE</p>
//   </div>
// );

const CompanyHeader = ({ setToggleContainer, logout }) => (
  <div
    className="channel-list__header"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      backgroundColor: "#411E46",
      zIndex: 1000,
    }}
  >
    {/* Left Section: Hospital Icon */}
    <div
      className="channel-list__sidebar"
      style={{ display: "flex", alignItems: "center", gap: "15px" }}
    >
      <div
        className="channel-list__sidebar__icon1"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="icon1__inner">
          <img src={HospitalIcon} alt="Hospital" width="40" />
        </div>
      </div>
    </div>

    {/* Right Section: Channel Search & Logout */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <ChannelSearch setToggleContainer={setToggleContainer} />

      <div
        className="channel-list__sidebar__icon2"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={logout}
      >
        <div className="icon1__inner">
          <img src={LogoutIcon} alt="Logout" width="30" />
        </div>
      </div>
    </div>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      {/* <SideBar /> */}
      <div>
        {" "}
        <CompanyHeader logout={logout} />
      </div>

      <div className="channel-list__list__wrapper" style={{ padding: "30px" }}>
        {/* <ChannelSearch setToggleContainer={setToggleContainer} /> */}
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>

      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? "0%" : "-89%",
          backgroundColor: "#411E46",
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() =>
            setToggleContainer((prevToggleContainer) => !prevToggleContainer)
          }
        ></div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
