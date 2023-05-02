import React from "react";

// styles
import "../../../styles/pages/_singlecollection.scss";

const CollectionItem = () => {
  return (
    <div className="collection__item">
      <div className="single__collection-path-section">
        <p>Home → Collections → Brain Music</p>
      </div>
      <h2 className="collection-heading">Brain Music</h2>
      <p className="collection-description">
        A collection of music products that help you focus, meditate, and sleep
        better 🎶
      </p>
      <div className="collection-post-wrapper">
        <div className="post-item-content">
          <h3>Calm</h3>
          <p className="details-sec">
            Calm is a software company based in San Francisco, California. It
            produces meditation products, including guided meditations and Sleep
            Stories.
          </p>
          <button className="learn-more-btn">Learn More</button>
        </div>
        <div className="img-coll-section">
          <img
            src="https://ph-files.imgix.net/fa850061-a8dc-49b4-b524-5f501b0f9ad2.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=80&h=80&fit=crop&dpr=1"
            alt="single-collection-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionItem;
