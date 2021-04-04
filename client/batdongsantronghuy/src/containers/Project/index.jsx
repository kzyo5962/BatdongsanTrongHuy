import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostList from './components/PostList';
import styled from 'styled-components';
import postAPI from '../../api/postAPI';

ProjectContainer.propTypes = {};
const ProjectWrapper = styled.div`
  padding-top: 100px;
`;

function ProjectContainer(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const postList = await postAPI.getAll();
      setPosts(postList);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <ProjectWrapper>
      <PostList posts={posts} loading={loading} />
    </ProjectWrapper>
  );
}

export default ProjectContainer;