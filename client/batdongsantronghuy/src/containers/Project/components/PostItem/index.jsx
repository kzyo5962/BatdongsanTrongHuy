import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap';
import './style.scss';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { nFormatter } from '../../../../ults/nFormatter';
import { useDispatch } from 'react-redux';
import {
  addToFavoritePosts,
  removeFromFavoritePosts,
} from '../../../FavoritePosts/favoritePostsSlice';
import { addDefaultSrc } from '../../../../ults/addDefaultSrc';
import Tooltip from '@material-ui/core/Tooltip';

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
};

function PostItem({ post, clicked }) {
  const dispatch = useDispatch();
  const favoriteList = JSON.parse(localStorage.getItem('favoriteList'));

  const handleAddToFavoriteList = (post) => {
    if (!post) return;
    const favoriteIDs = favoriteList?.map((item) => item.id);

    if (favoriteIDs?.includes(post.id)) {
      const action = removeFromFavoritePosts(post.id);
      dispatch(action);
    } else {
      const action = addToFavoritePosts(post);
      dispatch(action);
    }
  };
  return (
    <Col className="post col-lg-4">
      <Card>
        <div className="d-flex justify-content-space-between">
          <div className="post__tag post__tag--category">
            {post.category.name}
          </div>
          <div className="post__tag post__tag--city">
            {post?.address?.city.cityName}
          </div>
        </div>
        <Link to={`/bai-dang/${post.id}`}>
          <Card.Img
            src={post?.images[0]?.url}
            onError={addDefaultSrc}
            alt={post.title}
          />
        </Link>
        <Card.Body>
          <Link to={`/bai-dang/${post.id}`}>
            <Card.Title>{post.title}</Card.Title>
          </Link>
          <p className="post__address">
            <i className="fa fa-map-marker mr-2 color-blue"></i>
            {post.address.street},&nbsp;
            {post.address.district.districtName}
            ,&nbsp;{post.address.city.cityName}
          </p>
          <Card.Text
            dangerouslySetInnerHTML={{ __html: post.description }}
          ></Card.Text>
          <div className="post__price">
            <h5>
              Giá:&nbsp;
              {nFormatter(post?.price)}
            </h5>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => handleAddToFavoriteList(post)}
            >
              {clicked ? (
                <Tooltip title="Bấm để bỏ lưu tin" arrow>
                  <FavoriteIcon />
                </Tooltip>
              ) : (
                <Tooltip title="Bấm để lưu tin" arrow>
                  <FavoriteBorderIcon />
                </Tooltip>
              )}
            </div>
          </div>
        </Card.Body>
        <div className="post__footer">
          <ul>
            <li>
              <i className="fa fa-arrows mr-2 color-blue"></i>
              {post.direction}
            </li>
            <li>
              <i className="fa fa-bed mr-2 color-blue"></i>
              {post.bedroom}
            </li>
            <li>
              <i className="fa fa-home mr-2 color-blue"></i>
              {post.numberofFloor} tầng
            </li>
            <li></li>
          </ul>
        </div>
      </Card>
    </Col>
  );
}

export default PostItem;
