import React, { Fragment } from "react";

//  styles
import "../../styles/hunt/_trendingtopics.scss";

// components
import ProductSectionLayout from "../ProductSection/ProductSectionLayout";

// apollo/client
import { useQuery } from "@apollo/client";

// query
import { FETCH_TOP_TOPICS } from "../../queries/FetchTopics";

const TrendingTopics = () => {
  const { loading, data } = useQuery(FETCH_TOP_TOPICS);

  return (
    <Fragment>
      <div className="trending__topics__filter">
        <div className="current__activity">
          <div className="today__activity">
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0562 1.69059L10.3188 0.196842C10.1969 -0.0625332 9.81562 -0.0719082 9.68125 0.196842L8.94375 1.69059L7.30937 1.92497C7.01875 1.96872 6.89375 2.32809 7.10938 2.54372L8.29688 3.69997L8.01562 5.32809C7.97188 5.61872 8.27187 5.84372 8.54062 5.70934L10.0063 4.93434L11.4625 5.69684C11.7312 5.83122 12.0344 5.60622 11.9875 5.31559L11.7063 3.68747L12.8938 2.54372C13.1062 2.33122 12.9844 1.97184 12.6938 1.92497L11.0594 1.69059H11.0562ZM8 7.99997C7.44688 7.99997 7 8.44684 7 8.99997V15C7 15.5531 7.44688 16 8 16H12C12.5531 16 13 15.5531 13 15V8.99997C13 8.44684 12.5531 7.99997 12 7.99997H8ZM1 9.99997C0.446875 9.99997 0 10.4468 0 11V15C0 15.5531 0.446875 16 1 16H5C5.55312 16 6 15.5531 6 15V11C6 10.4468 5.55312 9.99997 5 9.99997H1ZM14 13V15C14 15.5531 14.4469 16 15 16H19C19.5531 16 20 15.5531 20 15V13C20 12.4468 19.5531 12 19 12H15C14.4469 12 14 12.4468 14 13Z"
                fill="#4B587C"
              ></path>
            </svg>
            <span>Today</span>
          </div>
          <div className="today__activity spacing">
            <svg
              width="16"
              height="13"
              viewBox="0 0 16 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12.75H9.9625C9.81752 12.7418 9.67796 12.6921 9.56048 12.6068C9.443 12.5214 9.35257 12.4041 9.3 12.2687L5.9375 3.44373L4.18125 7.31248C4.12145 7.44294 4.02548 7.5535 3.90473 7.63105C3.78398 7.7086 3.64351 7.74987 3.5 7.74998H1.5C1.30109 7.74998 1.11032 7.67096 0.96967 7.53031C0.829018 7.38966 0.75 7.19889 0.75 6.99998C0.75 6.80107 0.829018 6.6103 0.96967 6.46965C1.11032 6.329 1.30109 6.24998 1.5 6.24998H3.01875L5.31875 1.18748C5.38037 1.05349 5.48013 0.940641 5.60555 0.863048C5.73097 0.785456 5.87648 0.746562 6.02389 0.751231C6.17129 0.7559 6.31405 0.803924 6.43431 0.889299C6.55456 0.974673 6.64698 1.09361 6.7 1.23123L10.0938 10.1375L11.8313 6.66248C11.8942 6.53905 11.9899 6.4353 12.1078 6.36256C12.2258 6.28981 12.3614 6.25087 12.5 6.24998H14.5C14.6989 6.24998 14.8897 6.329 15.0303 6.46965C15.171 6.6103 15.25 6.80107 15.25 6.99998C15.25 7.19889 15.171 7.38966 15.0303 7.53031C14.8897 7.67096 14.6989 7.74998 14.5 7.74998H12.9625L10.6687 12.3375C10.6058 12.4609 10.5101 12.5647 10.3922 12.6374C10.2742 12.7101 10.1386 12.7491 10 12.75Z"
                fill="#4B587C"
              ></path>
            </svg>
            <span>Activity</span>
          </div>
        </div>
        <div className="trending__topics">
          <div className="label">Trending topics:</div>
          {loading && <p>Loading...</p>}
          {data?.topics?.edges?.length > 0 &&
            data?.topics?.edges?.map((topic, index) => (
              <div key={index} className="topic">
                {topic?.node?.name}
              </div>
            ))}
        </div>
      </div>

      {/* ***************************** Product Section Layout ******************************** */}

      <ProductSectionLayout />

      {/* ************************************************************************************* */}
    </Fragment>
  );
};

export default TrendingTopics;
