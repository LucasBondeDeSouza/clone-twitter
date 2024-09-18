import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faComment, faEllipsisH, faHeart, faRetweet, faUpload } from "@fortawesome/free-solid-svg-icons";

export default ({ tweet }) => {

  const [showMore, setShowMore] = useState(false);
  const [comments, setComments] = useState(0);
  const [likes, setLikes] = useState(0);
  const [retweet, setRetweets] = useState(0);

  function handleAction(action) { // Adicionar o parâmetro 'action'
    switch (action) {
      case "like":
        setLikes((likes) => likes + 1);
        break;
      case "retweet":
        setRetweets((retweet) => retweet + 1);
        break;
      case "comment":
        setComments((comments) => comments + 1);
        break;
      default:
        break;
    }
  }

  const maxChars = 280;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="border-b border-gray-800 p-4 hover:bg-gray-800 transition duration-200">
      <div className="flex space-x-3">
        <img src={tweet.avatar} alt="user avatar" className="rounded-full w-12 h-12" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold">{tweet.name}</span>
              <span className="text-gray-500 ml-2">@{tweet.username}</span>
              <span className="text-gray-500 ml-2">{tweet.time}</span>
            </div>

            <FontAwesomeIcon icon={faEllipsisH} className="text-gray-500" />
          </div>

          <div className="w-64 xl:w-96">
            <p className="mt-2 break-words">
              {showMore || tweet.content.length <= maxChars ? tweet.content : `${tweet.content.slice(0, maxChars)}...`}
            </p>

            {tweet.content.length > maxChars && (
              <button
                onClick={toggleShowMore}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                {showMore ? "Mostrar menos" : "Mostrar mais"}
              </button>
            )}
          </div>

          {tweet.image && <img src={tweet.image} className="mt-3 rounded-2xl max-w-full h-auto" alt="user image content" />}

          <div className="flex justify-between mt-4 text-gray-500">
            <div className="flex items-center cursor-pointer hover:text-blue-400">
              <FontAwesomeIcon icon={faComment} onClick={() => handleAction("comment")} />
              <span className="ml-2">{comments}</span>
            </div>

            <div className="flex items-center cursor-pointer hover:text-green-400">
              <FontAwesomeIcon icon={faRetweet} onClick={() => handleAction("retweet")} />
              <span className="ml-2">{retweet}</span>
            </div>

            <div className="flex items-center cursor-pointer hover:text-red-400">
              <FontAwesomeIcon icon={faHeart} onClick={() => handleAction("like")} />
              <span className="ml-2">{likes}</span>
            </div>

            <div className="flex items-center cursor-pointer hover:text-blue-400">
              <FontAwesomeIcon icon={faChartBar} />
              <span className="ml-2">0</span>
            </div>

            <div className="flex items-center cursor-pointer hover:text-blue-400">
              <FontAwesomeIcon icon={faUpload} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};