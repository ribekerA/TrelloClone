import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getBoards } from '../../actions/board';
import CreateBoard from '../subcomponents/CreateBoard';
import CircularProgress from '@material-ui/core/CircularProgress';

const Dashboard = ({ auth: { user, isAuthenticated }, boards, getBoards }) => {
  useEffect(() => {
    getBoards();
  }, [getBoards]);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <section className='dashboard'>
      <h1>Welcome {user && user.name}</h1>
      <h2>Your Boards</h2>
      {boards.length === 0 && <CircularProgress className='loading' />}
      <div className='boards'>
        {boards.map((board) => (
          <Link key={board._id} to={`/board/${board._id}`} className='board-card'>
            {board.title}
          </Link>
        ))}
        <CreateBoard />
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  boards: PropTypes.array,
  getBoards: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  boards: state.board.boards,
});

export default connect(mapStateToProps, { getBoards })(Dashboard);
