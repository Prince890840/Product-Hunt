import React, { Fragment } from "react";

//  styles
import "../../styles/hunt/_trendingtopics.scss";

// components
import ProductSectionLayout from "../ProductSection/ProductSectionLayout";

// apollo/client
import { useQuery } from "@apollo/client";

// query
import { FETCH_TOP_TOPICS } from "../../queries/FetchTopics";

// others
import Graph from "../../components/SVG/Graph";
import Chart from "../../components/SVG/Chart";

const TrendingTopics = () => {
  const { loading, data } = useQuery(FETCH_TOP_TOPICS);

  return (
    <Fragment>
      <div className="trending__topics__filter">
        <div className="current__activity">
          <div className="today__activity">
            <Graph />
            <span>Today</span>
          </div>
          <div className="today__activity spacing">
            <Chart />
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
