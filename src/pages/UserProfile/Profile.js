import React, { useState } from "react";

// query
import { USER_PROFILE } from "../../queries/user";

// apollo-client
import { useQuery } from "@apollo/client";

// styles
import "../../styles/hunt/_userprofile.scss";

const Profile = () => {
  const [user, setUser] = useState({});
  const { loading } = useQuery(USER_PROFILE, {
    variables: {
      first: 2,
    },
    onCompleted: (data) => {
      setUser(data);
    },
    fetchPolicy: "cache-and-network",
  });

  console.log(user);

  return (
    <>
      <div className="profile-overlay" />
      <div className="user__profile-section">
        <div className="user-image">
          <img src={user?.viewer?.user?.profileImage} alt="user-img" />
        </div>
        <div className="user-bio-section">
          <h2>Prince Panchani</h2>
          <p className="tagline">I am a software developer</p>
          <div className="following-details">
            <p>#5423550</p>
            <p>0 followers</p>
            <p>0 following</p>
          </div>
        </div>
        <div className="edit-profile-section">
          <button className="edit_profile_btn">Edit Profile</button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
    </>
  );
};

export default Profile;
