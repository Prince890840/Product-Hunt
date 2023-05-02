import React, { useState } from "react";

// query
import { USER_PROFILE } from "../../queries/user";

// apollo-client
import { useQuery } from "@apollo/client";
import ProductThumbnail from "../../components/ProductThumbnail/ProductThumbnail";

// styles
import "../../styles/pages/_userprofile.scss";

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
  const userProfile = user?.viewer?.user;

  return (
    <>
      <div className="profile-overlay" />
      <div className="user__profile-section">
        <div className="user-image">
          <img src={userProfile?.profileImage} alt="user-img" />
        </div>
        <div className="user-bio-section">
          <h2>{userProfile?.name}</h2>
          <p className="tagline">{userProfile?.headline}</p>
          <div className="following-details">
            <p>#{userProfile?.id}</p>
            <p>0 followers</p>
            <p>0 following</p>
          </div>
        </div>
        <div className="edit-profile-section">
          <button className="edit_profile_btn">Edit Profile</button>
        </div>
      </div>
      <p className="title">{`${userProfile?.votedPosts.totalCount} Upvotes`}</p>
      {userProfile?.votedPosts?.edges?.map((product, index) => (
        <div className="product__zone" key={index}>
          <div className="product__image">
            {product?.node?.thumbnail && (
              <ProductThumbnail thumbnailUrl={product?.node?.thumbnail?.url} />
            )}
          </div>
          <div className="product__content">
            <h4>
              {product?.node?.name}
              <a
                href={product.node.website}
                className="website__link"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 13 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    stroke="#4B587C"
                    strokeWidth="1.5"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <path d="M9.6 4H4.2a2.4 2.4 0 0 0-2.4 2.4V10"></path>
                    <path d="M6.6 7l3-3-3-3M12 10v3H0"></path>
                  </g>
                </svg>
              </a>
            </h4>
            <p>{product?.node?.tagline}</p>
            <div className="tag__section">
              {product?.node?.topics?.edges?.map((topic, index) => (
                <p key={index}>{topic.node.name}</p>
              ))}
            </div>
          </div>
          <div className="product__vote">
            <div className="vote__box">
              <button>
                <div className="animated__arrow-image"></div>
                {product?.node?.votesCount ? product?.node?.votesCount : "-"}
              </button>
            </div>
          </div>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </>
  );
};

export default Profile;
