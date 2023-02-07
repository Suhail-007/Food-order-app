import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import ModalContext from '../../context/modal-context.js';
import styles from './Modal.module.css';

const Backdrop = props => {
  const  ctx = useContext(ModalContext);
  return <div onClick={ctx.toggleModal} id='backdrop' className={styles.backdrop}>{props.children}</div>
}

const ModalOverlay = props => {
  return (
    <Backdrop>
      <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
      </div>
    </Backdrop>
  )
}

const portalElem = document.getElementById('overlay');

const Modal = props => {
  return (
    <>
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElem)}
    </>
  )
}

export default Modal