import PropTypes from "prop-types";
import Loading from "../loading/loading";
import "./style.scss";

export default function Snippet({ snippet }) {
  console.log(snippet);
  if (!snippet) {
    return <Loading />;
  }
  return (
    <div className="snippetMain">
      <div className="title">
        <h1>{snippet.title} </h1>
        <h3>{snippet.user.id}</h3>
      </div>
      <div className="snippetBody">{snippet.snippet}</div>
    </div>
  );
}

Snippet.propTypes = {
  snippet: PropTypes.shape({
    title: PropTypes.string,
    snippet: PropTypes.string,
    userId: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
};
