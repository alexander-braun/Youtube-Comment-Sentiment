import React from 'react';
import { useDispatch } from 'react-redux';

import { toggleNoCommentsModal } from '../actions/toggleNoCommentsModal';

const NoCommentsModal: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="no-comments-modal">
      <div
        className="no-comments-modal__close-button"
        onClick={() => dispatch(toggleNoCommentsModal())}
      >
        CLOSE X
      </div>
      <div className="no-comments-modal__text">
        The video has no comments or comments are deactivated, sry :(
      </div>
    </div>
  );
};

export default NoCommentsModal;
