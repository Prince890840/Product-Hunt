import { useEffect, useState, useRef } from "react";

// react-router-dom
import { useLocation, useNavigate } from "react-router-dom";

// apollo-client
import { useQuery } from "@apollo/client";

// query
import { GET_ALL_COLLECTIONS } from "../../../queries/Collection";

// styles
import "../../../styles/pages/_collection.scss";

const Collection = () => {
  const [allConections, setAllCollections] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();

  let pathname = location.pathname;
  pathname = pathname.replace("/", "");
  pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);

  const broadCasting = `Home → ${pathname}`;

  const { loading, fetchMore } = useQuery(GET_ALL_COLLECTIONS, {
    variables: {
      first: 3,
    },
    onCompleted: (data) => {
      if (!allConections.length) {
        const { edges } = data?.collections;
        setAllCollections(edges);
      }
    },
    fetchPolicy: "cache-and-network",
  });

  const intersectionObserverRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && !loading) {
        try {
          if (allConections.length > 0) {
            const lastPost = allConections[allConections?.length - 1];
            const { data } = await fetchMore({
              variables: {
                after: lastPost?.cursor,
              },
            });
            const { edges } = data?.collections;
            setAllCollections((prevPosts) => [...prevPosts, ...edges]);
          } else {
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }, options);

    if (intersectionObserverRef.current) {
      observer.observe(intersectionObserverRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, fetchMore, allConections]);

  const fetchCollectionItem = (collectionId) => {
    navigate(`/collections/${collectionId}`);
  };

  return (
    <div className="collection-container">
      <div className="collection-header-section">
        <div className="path-section">
          <p>{broadCasting}</p>
        </div>
        <div className="collection-content">
          <h1>Collections</h1>
          <p>
            Community-curated collections for the best tools, inspiration,
            starter packs, and more…
          </p>
          <div className="search__collections__section">
            <form>
              <input
                title="Search"
                type="search"
                autoComplete="off"
                placeholder="Search.."
                className="collection__box"
              ></input>
            </form>
          </div>
        </div>
      </div>
      <div className="collection-main-section">
        <div className="collection-cards">
          {allConections.map((collection, index) => (
            <div
              key={index}
              className="card"
              onClick={() => fetchCollectionItem(collection?.node?.id)}
            >
              <h2>{collection?.node?.name}</h2>
              <p className="paragraph">Curated by Product Hunt</p>
              <p className="paragraph description">
                {collection?.node?.description}
              </p>
              <ul>
                {collection?.node?.posts?.edges?.map((post) => (
                  <li key={post?.node?.id} className="collection-item">
                    <div className="collection__image">
                      {post?.node?.thumbnail && (
                        <img
                          src={post?.node?.thumbnail?.url}
                          alt="collection"
                        />
                      )}
                    </div>
                    <p className="collection-name">{post?.node?.name}</p>
                  </li>
                ))}
              </ul>
              <p className="total-collections-item">+ 6 more</p>
            </div>
          ))}
          <div ref={intersectionObserverRef}>Loading more collections...</div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
