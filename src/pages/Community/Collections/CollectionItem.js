import React from "react";

// react-router-dom
import { useLocation, useParams } from "react-router-dom";

// styles
import "../../../styles/pages/_singlecollection.scss";

// apollo-client
import { useQuery } from "@apollo/client";

// query
import { FETCH_SINGLE_COLLECTION } from "../../../queries/FetchCollectionItem";

const CollectionItem = () => {
  const { collectionId } = useParams();

  const { data } = useQuery(FETCH_SINGLE_COLLECTION, {
    variables: { collectionId: collectionId, first: 20 },
  });

  const location = useLocation();
  const pathName = location.pathname.split("/");

  const broadCasting = `Home → ${
    pathName[1].slice(0, 1).toUpperCase() + pathName[1].slice(1)
  } → ${data?.collection?.name}`;

  return (
    <div className="collection__item">
      <div className="single__collection-path-section">
        <p>{broadCasting}</p>
      </div>
      <h2 className="collection-heading">{data?.collection?.name}</h2>
      <p className="collection-description">{data?.collection?.description}</p>
      {data?.collection?.posts?.edges?.map((post) => (
        <>
          <div key={post?.node?.id} className="collection-post-wrapper">
            <div className="post-item-content">
              <h3>{post?.node?.name}</h3>
              <p className="details-sec">{post?.node?.description}</p>
              <button className="learn-more-btn">Learn More</button>
            </div>
            <div className="img-coll-section">
              <img
                src={post?.node?.thumbnail?.url}
                alt="single-collection-icon"
              />
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default CollectionItem;
